import { Request, Response } from "express";
import { getStateMetricsTimeseries } from "../services/getStateMetricsTimeseries";

export const getStateMetricsTimeseriesController = async (
    req: Request,
    res: Response
) => {
    try {
        const { state } = req.params;
        if (!state) {
            res.status(400).json({
                success: false,
                data: null,
                error: "State parameter is required",
                message: "Bad Request",
            });
        }

        const result = await getStateMetricsTimeseries(state.toUpperCase());
        res.status(200).json({
            success: true,
            data: result.data,
            length: result.length,
            error: null,
            message: "State Metrics Timeseries Data",
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
