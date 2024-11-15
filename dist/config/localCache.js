"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasCacheKey = exports.getCache = exports.setCache = void 0;
const node_cache_1 = __importDefault(require("node-cache"));
const localCache = new node_cache_1.default({
    stdTTL: 300,
    checkperiod: 120,
    maxKeys: 1000,
});
const setCache = (key, value, ttl) => {
    if (ttl !== undefined) {
        return localCache.set(key, value, ttl);
    }
    return localCache.set(key, value);
};
exports.setCache = setCache;
const getCache = (key) => {
    return localCache.get(key);
};
exports.getCache = getCache;
const hasCacheKey = (key) => {
    return localCache.has(key);
};
exports.hasCacheKey = hasCacheKey;
