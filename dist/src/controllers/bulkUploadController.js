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
exports.bulkUploadController = void 0;
const bulkUploadController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
});
exports.bulkUploadController = bulkUploadController;
