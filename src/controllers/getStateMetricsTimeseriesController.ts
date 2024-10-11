import { Request, Response } from "express";
import { getStateMetricsTimeseries } from "../services/getStateMetricsTimeseries";

export const getStateMetricsTimeseriesController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { state } = req.params;
        if (!state) {
            res.status(400).json({
                success: false,
                data: null,
                error: "State parameter is required",
                message: "Bad Request",
            });
            return;
        }

        const pagination = Boolean(req.query.pagination as string) || false;

        const result = await getStateMetricsTimeseries(state.toUpperCase());

        if (!pagination) {
            res.status(200).json({
                success: true,
                data: result.data,
                length: result.length,
                error: null,
                message: "State Metrics Timeseries Data",
            });
            return;
        }

        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 100;

        if (limit <= 0 || page <= 0) {
            res.status(400).json({
                success: false,
                data: null,
                error: "Invalid page or limit value",
                message: "Bad Request",
            });
            return;
        }

        // Calculate the pagination values
        // start and end index
        const totalRecords = result.length;
        const totalPages = Math.ceil(totalRecords / limit);
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;

        const paginationData = result.data.slice(startIndex, endIndex);

        const paginationInfo = {
            totalRecords,
            totalPages,
            recordsPerPage: paginationData.length,
            currentPage: page,
            hasNextPage: page < totalPages,
            hasPrevPage: page > 1,
        };

        res.status(200).json({
            success: true,
            data: paginationData,
            pagination: paginationInfo,
            error: null,
            message: "Successfully fetched State Metrics Timeseries Data",
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
