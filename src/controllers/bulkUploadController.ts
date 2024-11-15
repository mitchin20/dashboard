import { Request, Response } from "express";

interface NpmDataProps {
    name: string;
    weeklyDownload: number;
    version: string;
    license: string;
    totalFiles: number;
    unpackedSize: string;
    issues: number;
    pullRequests: number;
    lastPublish: string;
}

export const bulkUploadController = async (req: Request, res: Response) => {
    try {
        // TODO: here
        res.status(200).json({
            success: true,
            data: null,
            error: null,
            message: "Records created successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            data: null,
            error: "Server Internal Error",
            message: "Failed to create records",
        });
    }
};
