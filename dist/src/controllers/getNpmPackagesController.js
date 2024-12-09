"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNpmPackagesController = void 0;
const getNpmPackages_1 = require("../services/getNpmPackages");
const getNpmPackagesController = async (req, res) => {
    try {
        const result = await (0, getNpmPackages_1.getNpmPackages)();
        res.status(200).json({
            success: true,
            data: result,
            error: null,
            message: "Successfully fetched NPM packages",
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
};
exports.getNpmPackagesController = getNpmPackagesController;
