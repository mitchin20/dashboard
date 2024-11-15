require("dotenv").config();
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "../aws/awsS3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { getCache, setCache } from "../config/localCache";

const BUCKET_NAME = process.env.BUCKET_NAME;
const RESUME_KEY = process.env.RESUME_KEY;
const expireTime = 48 * 60 * 60;

export const getResume = async () => {
    try {
        const localCacheData = getCache("resume");
        if (localCacheData) {
            return localCacheData;
        }

        const command = new GetObjectCommand({
            Bucket: BUCKET_NAME,
            Key: RESUME_KEY,
        });

        const url = await getSignedUrl(s3Client, command, {
            expiresIn: expireTime,
        });
        setCache("resume", url, expireTime);
        return url;
    } catch (error) {
        console.log("Fetch data error: ", error);
        throw error;
    }
};
