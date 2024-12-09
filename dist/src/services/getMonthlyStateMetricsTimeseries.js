"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMonthlyStateMetricsTimeseries = void 0;
require("dotenv").config();
const axios_1 = __importDefault(require("axios"));
const redis_1 = require("../config/redis");
const localCache_1 = require("../config/localCache");
const getMonthlyStateMetricsTimeseries = async (state) => {
    try {
        console.log("has local key? ", (0, localCache_1.hasCacheKey)(`monthlyStateActualsTimeseries${state}`));
        // Check for local cache data first
        const localCacheData = (0, localCache_1.getCache)(`monthlyStateActualsTimeseries${state}`);
        if (localCacheData) {
            return {
                data: localCacheData,
                length: localCacheData.length,
            };
        }
        // If no local cache data, then check for redis cache
        const cachedData = await redis_1.redisClient.get(`monthlyStateActualsTimeseries${state}`);
        if (cachedData) {
            // If data in local cache expired, re-cache data from redis to local cache
            if (!(0, localCache_1.hasCacheKey)(`monthlyStateActualsTimeseries${state}`)) {
                (0, localCache_1.setCache)(`monthlyStateActualsTimeseries${state}`, cachedData, 300);
            }
            return {
                data: cachedData,
                length: cachedData.length,
            };
        }
        // if no local or redis cache then query data from DB or API
        const response = await axios_1.default.get(`${process.env.STATE_HISTORICAL_API_URL}/${state}.timeseries.json?apiKey=${process.env.COVID_API_KEY}`);
        if (!response.data) {
            return {
                data: null,
                length: 0,
            };
        }
        // Clean up data
        const cleanData = response.data.actualsTimeseries.map((item) => {
            return {
                date: item.date,
                cases: item.cases,
                deaths: item.deaths,
                newCases: item.newCases,
                newDeaths: item.newDeaths,
            };
        });
        // Filter start with the first day of the month ex: 2023-01-01
        const cleanDataFiltered = cleanData.filter((item) => {
            return item.date.split("-")[2] === "01";
        });
        (0, localCache_1.setCache)(`monthlyStateActualsTimeseries${state}`, cleanDataFiltered, 300);
        await redis_1.redisClient.set(`monthlyStateActualsTimeseries${state}`, JSON.stringify(cleanDataFiltered), { ex: 600 });
        return {
            data: cleanDataFiltered,
            length: cleanDataFiltered.length,
        };
    }
    catch (error) {
        console.error("Fetch COVID data error: ", error);
        throw error;
    }
};
exports.getMonthlyStateMetricsTimeseries = getMonthlyStateMetricsTimeseries;
