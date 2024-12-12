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
exports.deleteEmployee = void 0;
const database_1 = require("../db/database");
const getEmployee_1 = require("./getEmployee");
const deleteEmployee = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const employee = yield (0, getEmployee_1.getEmployee)(id);
        if (!employee) {
            return null;
        }
        const values = [id];
        const query = `
            DELETE FROM "Employee"
            WHERE "id" = $1
            RETURNING *;
        `;
        const result = yield (0, database_1.executeQuery)(query, values);
        return result.rows[0];
    }
    catch (error) {
        console.error("Error deleting employee:", error);
        throw error;
    }
});
exports.deleteEmployee = deleteEmployee;
