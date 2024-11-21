require("dotenv").config();
import axios from "axios";
import { redisClient } from "../config/redis";
import { getCache, setCache, hasCacheKey } from "../config/localCache";

const ttl = 300;

export const getCountyMetric = async (countyFips: string) => {
    const API_URL = `${process.env.COUNTY_METRIC_API_URL?.replace(
        "{fips}",
        countyFips.toString()
    )}?apiKey=${process.env.COVID_API_KEY}`;

    try {
        // Check for local cache data first
        const localCacheData = getCache(`county-covid-data-${countyFips}`);
        if (localCacheData) {
            return {
                data: localCacheData,
            };
        }

        // If no local cache data, then check for redis cache
        const cachedData: string | null = await redisClient.get(
            `county-covid-data-${countyFips}`
        );
        if (cachedData) {
            const parsedData = JSON.parse(cachedData);
            // If data in local cache expired, re-cache data from redis to local cache
            if (!hasCacheKey(`county-covid-data-${countyFips}`)) {
                setCache(`county-covid-data-${countyFips}`, parsedData, ttl);
            }

            return {
                data: parsedData,
            };
        }

        const response = await axios.get(API_URL);

        if (!response.data) {
            return {
                data: null,
                length: 0,
            };
        }

        setCache(`county-covid-data-${countyFips}`, response.data, ttl);

        await redisClient.set(
            `county-covid-data-${countyFips}`,
            JSON.stringify(response.data),
            { ex: 600 }
        );

        return {
            data: response.data,
        };
    } catch (error) {
        console.error("Fetch Count covid information error: ", error);
        throw error;
    }
};
