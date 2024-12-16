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
exports.updateCategoryController = void 0;
const updateCategory_1 = require("../services/updateCategory");
const updateCategoryController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const data = req.body;
        if (!id || !data) {
            res.status(400).json({
                success: false,
                data: null,
                error: "Bad Request",
                message: "No data provided",
            });
            return;
        }
        const updatedCategory = yield (0, updateCategory_1.updateCategory)(Number(id), data);
        res.status(200).json({
            success: true,
            data: updatedCategory,
            error: null,
            message: "Successfully updated category",
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
exports.updateCategoryController = updateCategoryController;
