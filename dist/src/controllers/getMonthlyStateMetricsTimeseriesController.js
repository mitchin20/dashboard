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
exports.getMonthlyStateMetricsTimeseriesController = void 0;
const getMonthlyStateMetricsTimeseries_1 = require("../services/getMonthlyStateMetricsTimeseries");
const getMonthlyStateMetricsTimeseriesController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const pagination = Boolean(req.query.pagination) || false;
        const result = yield (0, getMonthlyStateMetricsTimeseries_1.getMonthlyStateMetricsTimeseries)(state.toUpperCase());
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
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 100;
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
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            data: null,
            error: error instanceof Error ? error.message : error,
            message: "Internal Server Error",
        });
    }
});
exports.getMonthlyStateMetricsTimeseriesController = getMonthlyStateMetricsTimeseriesController;
