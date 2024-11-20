require("dotenv").config();
import axios from "axios";
import { redisClient } from "../config/redis";
import { getCache, setCache, hasCacheKey } from "../config/localCache";

export const getCountyMetric = async (countyFips: string) => {
    const API_URL = `${process.env.COUNTY_METRIC_API_URL?.replace(
        "{fips}",
        countyFips.toString()
    )}?apiKey=${process.env.COVID_API_KEY}`;

    try {
        const response = await axios.get(API_URL);

        if (!response.data) {
            return {
                data: null,
                length: 0,
            };
        }

        console.log(response.data);

        return {
            data: response.data,
            length: response.data.length,
        };
    } catch (error) {
        console.error("Fetch Count covid information error: ", error);
        throw error;
    }
};
