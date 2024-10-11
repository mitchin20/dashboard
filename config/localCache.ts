import NodeCache from "node-cache";

const localCache = new NodeCache({
    stdTTL: 300,
    checkperiod: 120,
    maxKeys: 1000,
});

const setCache = (key: string, value: any, ttl?: number): boolean => {
    if (ttl !== undefined) {
        return localCache.set(key, value, ttl);
    }
    return localCache.set(key, value);
};

const getCache = (key: string): any => {
    return localCache.get(key);
};

const hasCacheKey = (key: string): boolean => {
    return localCache.has(key);
};

export { setCache, getCache, hasCacheKey };
