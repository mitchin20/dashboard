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
exports.createEmployee = void 0;
const database_1 = require("../db/database");
const createEmployee = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fullName = `${data.firstName} ${data.lastName}`;
        const values = [
            data.firstName,
            data.lastName,
            fullName,
            data.color,
            data.email,
            data.phone,
            data.employeeType,
        ];
        const query = `
            INSERT INTO "Employee" ("firstName", "lastName", "fullName", "color", "email", "phone", "employeeType")
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *;
        `;
        const result = yield (0, database_1.executeQuery)(query, values);
        return result.rows[0];
    }
    catch (error) {
        console.error("Error creating employee:", error);
        throw error;
    }
});
exports.createEmployee = createEmployee;
