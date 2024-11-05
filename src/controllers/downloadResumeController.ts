import { Request, Response } from "express";
import { getResume } from "../services/s3Bucket";

export const downloadResumeController = async (req: Request, res: Response) => {
    try {
        const url = await getResume();

        res.status(200).json({
            success: true,
            url,
            error: null,
            message: "Resume Download Link",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            url: null,
            error,
            message: "Internal Server Error",
        });
    }
};
