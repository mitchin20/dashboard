import { Request, Response } from "express";
import { getNpmPackages } from "../services/getNpmPackages";

export const getNpmPackagesController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const result = await getNpmPackages();

        res.status(200).json({
            success: true,
            data: result,
            error: null,
            message: "Successfully fetched NPM packages",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            data: null,
            error: error instanceof Error ? error.message : error,
            message: "Internal Server Error",
        });
    }
};
