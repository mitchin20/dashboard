"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResume = void 0;
require("dotenv").config();
const client_s3_1 = require("@aws-sdk/client-s3");
const awsS3_1 = require("../aws/awsS3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const localCache_1 = require("../config/localCache");
const BUCKET_NAME = process.env.BUCKET_NAME;
const RESUME_KEY = process.env.RESUME_KEY;
const expireTime = 48 * 60 * 60;
const getResume = async () => {
    try {
        const localCacheData = (0, localCache_1.getCache)("resume");
        if (localCacheData) {
            return localCacheData;
        }
        const command = new client_s3_1.GetObjectCommand({
            Bucket: BUCKET_NAME,
            Key: RESUME_KEY,
        });
        const url = await (0, s3_request_presigner_1.getSignedUrl)(awsS3_1.s3Client, command, {
            expiresIn: expireTime,
        });
        (0, localCache_1.setCache)("resume", url, expireTime);
        return url;
    }
    catch (error) {
        console.log("Fetch data error: ", error);
        throw error;
    }
};
exports.getResume = getResume;
