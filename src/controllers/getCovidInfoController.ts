import { Request, Response } from "express";
import { getCovidInfo } from "../services/getCovidInfo";

export const getCovidInfoDataController = async (
    req: Request,
    res: Response
) => {
    try {
        const covidInfoData = await getCovidInfo();

        res.status(200).json({
            success: true,
            data: covidInfoData,
            error: null,
            message: "Covid Info Data",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            data: null,
            error,
            message: "Internal Server Error",
        });
    }
};
