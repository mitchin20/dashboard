"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCovidInfoDataController = void 0;
const getCovidInfo_1 = require("../services/getCovidInfo");
const getCovidInfoDataController = async (req, res) => {
    try {
        const covidInfoData = await (0, getCovidInfo_1.getCovidInfo)();
        res.status(200).json({
            success: true,
            data: covidInfoData,
            error: null,
            message: "Covid Info Data",
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            data: null,
            error,
            message: "Internal Server Error",
        });
    }
};
exports.getCovidInfoDataController = getCovidInfoDataController;
