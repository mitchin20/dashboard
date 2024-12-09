"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
const getResume = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const localCacheData = (0, localCache_1.getCache)("resume");
        if (localCacheData) {
            return localCacheData;
        }
        const command = new client_s3_1.GetObjectCommand({
            Bucket: BUCKET_NAME,
            Key: RESUME_KEY,
        });
        const url = yield (0, s3_request_presigner_1.getSignedUrl)(awsS3_1.s3Client, command, {
            expiresIn: expireTime,
        });
        (0, localCache_1.setCache)("resume", url, expireTime);
        return url;
    }
    catch (error) {
        console.log("Fetch data error: ", error);
        throw error;
    }
});
exports.getResume = getResume;
