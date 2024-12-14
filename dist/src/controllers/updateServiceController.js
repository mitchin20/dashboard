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
exports.updateServiceController = void 0;
const updateService_1 = require("../services/updateService");
const updateServiceController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const serviceId = parseInt(req.params.id);
        const data = req.body;
        const updatedService = yield (0, updateService_1.updateService)(serviceId, data);
        if (!updatedService) {
            res.status(404).json({
                success: false,
                data: null,
                message: "Service not found",
                error: null,
            });
            return;
        }
        res.status(200).json({
            success: true,
            data: updatedService,
            error: null,
            message: "Successfully updated service",
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            data: null,
            message: "Internal Server Error",
            error: error,
        });
    }
});
exports.updateServiceController = updateServiceController;
