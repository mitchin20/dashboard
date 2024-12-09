"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bulkUploadController = void 0;
const bulkUploadController = async (req, res) => {
    try {
        // TODO: here
        res.status(200).json({
            success: true,
            data: null,
            error: null,
            message: "Records created successfully",
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            data: null,
            error: "Server Internal Error",
            message: "Failed to create records",
        });
    }
};
exports.bulkUploadController = bulkUploadController;
