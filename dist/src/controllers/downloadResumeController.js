"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadResumeController = void 0;
const s3Bucket_1 = require("../services/s3Bucket");
const downloadResumeController = async (req, res) => {
    try {
        const url = await (0, s3Bucket_1.getResume)();
        res.status(200).json({
            success: true,
            url,
            error: null,
            message: "Resume Download Link",
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            url: null,
            error,
            message: "Internal Server Error",
        });
    }
};
exports.downloadResumeController = downloadResumeController;
