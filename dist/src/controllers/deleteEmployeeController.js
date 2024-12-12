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
exports.deleteEmployeeController = void 0;
const deleteEmployee_1 = require("../services/deleteEmployee");
const deleteEmployeeController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedEmployee = yield (0, deleteEmployee_1.deleteEmployee)(Number(id));
        if (!deletedEmployee) {
            res.status(404).json({
                success: false,
                data: null,
                error: "Employee cannot be found",
                message: "Employee not found",
            });
            return;
        }
        res.status(200).json({
            success: true,
            data: deletedEmployee,
            error: null,
            message: "Employee deleted successfully",
        });
    }
    catch (error) {
        console.error("Error deleting employee:", error);
        res.status(500).json({
            success: false,
            data: null,
            error: "Internal Server Error",
            message: "Unable to delete employee",
        });
    }
});
exports.deleteEmployeeController = deleteEmployeeController;
