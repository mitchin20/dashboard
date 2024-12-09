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
exports.getCountyMetricController = void 0;
const getCountyMetrics_1 = require("../services/getCountyMetrics");
const getCountyMetricController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const data = yield (0, getCountyMetrics_1.getCountyMetric)(req.params.fips);
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
});
exports.getCountyMetricController = getCountyMetricController;
