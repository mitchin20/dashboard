"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisClient = void 0;
require("dotenv").config();
const redis_1 = require("@upstash/redis");
exports.redisClient = new redis_1.Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
});
