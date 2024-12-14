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
exports.deleteServiceController = void 0;
const deleteService_1 = require("../services/deleteService");
const deleteServiceController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({
                success: false,
                data: null,
                error: "Bad Request",
                message: "No service ID provided",
            });
            return;
        }
        const deletedService = yield (0, deleteService_1.deleteService)(Number(id));
        if (!deletedService) {
            res.status(404).json({
                success: false,
                data: null,
                error: "Not Found",
                message: "Service not found",
            });
            return;
        }
        res.status(200).json({
            success: true,
            data: deletedService,
            error: null,
            message: "Service deleted successfully",
        });
    }
    catch (error) {
        console.error("Error deleting service:", error);
        res.status(500).json({
            success: false,
            data: null,
            error: "Internal Server Error",
            message: "Failed to delete service",
        });
    }
});
exports.deleteServiceController = deleteServiceController;
