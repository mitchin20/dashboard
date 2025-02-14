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
exports.updateEmployee = void 0;
const database_1 = require("../db/database");
const getEmployee_1 = require("./getEmployee");
const updateEmployee = (employeeId, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check if the employee exists
        const existingResult = yield (0, getEmployee_1.getEmployee)(employeeId);
        if (!existingResult) {
            return null;
        }
        const fullName = `${data.firstName} ${data.lastName}`;
        const values = [
            data.firstName,
            data.lastName,
            fullName,
            data.color,
            data.email,
            data.phone,
            data.employeeType,
            employeeId,
        ];
        const query = `
            UPDATE "Employee"
            SET "firstName" = $1, "lastName" = $2, "fullName" = $3, "color" = $4, "email" = $5, "phone" = $6, "employeeType" = $7
            WHERE "id" = $8
            RETURNING *;
        `;
        const result = yield (0, database_1.executeQuery)(query, values);
        return result.rows[0];
    }
    catch (error) {
        console.error("Error updating employee:", error);
        throw error;
    }
});
exports.updateEmployee = updateEmployee;
