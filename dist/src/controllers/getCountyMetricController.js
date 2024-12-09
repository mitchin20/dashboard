"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCountyMetricController = void 0;
const getCountyMetrics_1 = require("../services/getCountyMetrics");
const getCountyMetricController = async (req, res) => {
    try {
        const { fips } = req.params;
        if (!fips) {
            res.status(400).json({
                success: false,
                data: null,
                error: "Missing fips parameter",
                message: "Missing fips parameter",
            });
            return;
        }
        const data = await (0, getCountyMetrics_1.getCountyMetric)(req.params.fips);
        if (!data) {
            res.status(404).json({
                success: false,
                data: null,
                error: "County not found",
                message: "County not found",
            });
            return;
        }
        res.status(200).json({
            success: true,
            data,
            error: null,
            message: "County covid data",
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            data: null,
            error: "Server Internal Error",
            message: "Failed to fetch County covid data",
        });
    }
};
exports.getCountyMetricController = getCountyMetricController;
