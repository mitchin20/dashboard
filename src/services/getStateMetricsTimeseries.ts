require("dotenv").config();
import axios from "axios";
import { redisClient } from "../config/redis";
import { getCache, setCache, hasCacheKey } from "../config/localCache";

export const getStateMetricsTimeseries = async (state: string) => {
    try {
        console.log(
            "has local key? ",
            hasCacheKey(`stateActualsTimeseries${state}`)
        );
        // Check for local cache data first
        const localCacheData = getCache(`stateActualsTimeseries${state}`);
        if (localCacheData) {
            return {
                data: localCacheData,
                length: localCacheData.length,
            };
        }

        // If no local cache data, then check for redis cache
        const cachedData: string | null = await redisClient.get(
            `stateActualsTimeseries${state}`
        );
        if (cachedData) {
            // If data in local cache expired, re-cache data from redis to local cache
            if (!hasCacheKey(`stateActualsTimeseries${state}`)) {
                setCache(`stateActualsTimeseries${state}`, cachedData, 300);
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

        setCache(`stateActualsTimeseries${state}`, cleanData, 300);

        await redisClient.set(
            `stateActualsTimeseries${state}`,
            JSON.stringify(cleanData),
            { ex: 600 }
        );

        return {
            data: cleanData,
            length: cleanData.length,
        };
    } catch (error) {
        console.log("Fetch COVID data error: ", error);
        throw error;
    }
};
