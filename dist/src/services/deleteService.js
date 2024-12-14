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
exports.deleteService = void 0;
require("dotenv").config();
const database_1 = require("../db/database");
const getService_1 = require("./getService");
const deleteService = (serviceId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check if the service exists
        const existingResult = yield (0, getService_1.getService)(serviceId);
        if (!existingResult) {
            return null;
        }
        const values = [serviceId];
        const query = `
            DELETE FROM "service"
            WHERE "id" = $1
            RETURNING *;
        `;
        const result = yield (0, database_1.executeQuery)(query, values);
        return result.rows[0];
    }
    catch (error) {
        console.error("Error deleting service:", error);
        throw error;
    }
});
exports.deleteService = deleteService;
