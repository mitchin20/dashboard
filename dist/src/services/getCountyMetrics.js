"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCountyMetric = void 0;
require("dotenv").config();
const axios_1 = __importDefault(require("axios"));
const redis_1 = require("../config/redis");
const localCache_1 = require("../config/localCache");
const ttl = 300;
const getCountyMetric = async (countyFips) => {
    const API_URL = `${process.env.COUNTY_METRIC_API_URL?.replace("{fips}", countyFips.toString())}?apiKey=${process.env.COVID_API_KEY}`;
    try {
        // Check for local cache data first
        const localCacheData = (0, localCache_1.getCache)(`county-covid-data-${countyFips}`);
        if (localCacheData) {
            return {
                data: localCacheData,
            };
        }
        // If no local cache data, then check for redis cache
        const cachedData = await redis_1.redisClient.get(`county-covid-data-${countyFips}`);
        if (cachedData) {
            const parsedData = JSON.parse(cachedData);
            // If data in local cache expired, re-cache data from redis to local cache
            if (!(0, localCache_1.hasCacheKey)(`county-covid-data-${countyFips}`)) {
                (0, localCache_1.setCache)(`county-covid-data-${countyFips}`, parsedData, ttl);
            }
            return {
                data: parsedData,
            };
        }
        const response = await axios_1.default.get(API_URL);
        if (!response.data) {
            return {
                data: null,
                length: 0,
            };
        }
        (0, localCache_1.setCache)(`county-covid-data-${countyFips}`, response.data, ttl);
        await redis_1.redisClient.set(`county-covid-data-${countyFips}`, JSON.stringify(response.data), { ex: 600 });
        return {
            data: response.data,
        };
    }
    catch (error) {
        console.error("Fetch Count covid information error: ", error);
        throw error;
    }
};
exports.getCountyMetric = getCountyMetric;
