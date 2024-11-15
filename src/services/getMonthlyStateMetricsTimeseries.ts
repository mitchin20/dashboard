require("dotenv").config();
import axios from "axios";
import { redisClient } from "../config/redis";
import { getCache, setCache, hasCacheKey } from "../config/localCache";

export const getMonthlyStateMetricsTimeseries = async (state: string) => {
    try {
        console.log(
            "has local key? ",
            hasCacheKey(`monthlyStateActualsTimeseries${state}`)
        );
        // Check for local cache data first
        const localCacheData = getCache(
            `monthlyStateActualsTimeseries${state}`
        );
        if (localCacheData) {
            return {
                data: localCacheData,
                length: localCacheData.length,
            };
        }

        // If no local cache data, then check for redis cache
        const cachedData: string | null = await redisClient.get(
            `monthlyStateActualsTimeseries${state}`
        );
        if (cachedData) {
            // If data in local cache expired, re-cache data from redis to local cache
            if (!hasCacheKey(`monthlyStateActualsTimeseries${state}`)) {
                setCache(
                    `monthlyStateActualsTimeseries${state}`,
                    cachedData,
                    300
                );
            }

            return {
                data: cachedData,
                length: cachedData.length,
            };
        }

        // if no local or redis cache then query data from DB or API
        const response = await axios.get(
            `${process.env.STATE_HISTORICAL_API_URL}/${state}.timeseries.json?apiKey=${process.env.COVID_API_KEY}`
        );

        if (!response.data) {
            return {
                data: null,
                length: 0,
            };
        }

        // Clean up data
        const cleanData = response.data.actualsTimeseries.map((item: any) => {
            return {
                date: item.date,
                cases: item.cases,
                deaths: item.deaths,
                newCases: item.newCases,
                newDeaths: item.newDeaths,
            };
        });

        // Filter start with the first day of the month ex: 2023-01-01
        const cleanDataFiltered = cleanData.filter((item: any) => {
            return item.date.split("-")[2] === "01";
        });

        setCache(
            `monthlyStateActualsTimeseries${state}`,
            cleanDataFiltered,
            300
        );

        await redisClient.set(
            `monthlyStateActualsTimeseries${state}`,
            JSON.stringify(cleanDataFiltered),
            { ex: 600 }
        );

        return {
            data: cleanDataFiltered,
            length: cleanDataFiltered.length,
        };
    } catch (error) {
        console.error("Fetch COVID data error: ", error);
        throw error;
    }
};
