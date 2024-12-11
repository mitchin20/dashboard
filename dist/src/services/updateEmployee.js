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
const updateEmployee = (employeeId, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check if the employee exists
        const checkValues = [employeeId];
        const checkQuery = `
            SELECT * FROM "Employee" WHERE "employeeId" = $1;
        `;
        const existingResult = yield (0, database_1.executeQuery)(checkQuery, checkValues);
        if (!existingResult || existingResult.rows.length === 0) {
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
            employeeId,
        ];
        const query = `
            UPDATE "Employee"
            SET "firstName" = $1, "lastName" = $2, "fullName" = $3, "color" = $4, "email" = $5, "phone" = $6
            WHERE "employeeId" = $7
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
