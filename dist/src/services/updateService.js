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
exports.updateService = void 0;
require("dotenv").config();
const database_1 = require("../db/database");
const getService_1 = require("./getService");
const updateService = (serviceId, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingService = yield (0, getService_1.getService)(serviceId);
        if (!existingService || existingService.rows.length === 0) {
            return null;
        }
        const values = [
            data.category,
            data.categoryId,
            data.name,
            data.price,
            serviceId,
        ];
        const query = `
            UPDATE "service"
            SET "category" = $1, "category_id" = $2, "name" = $3, "price" = $4
            WHERE "id" = $5
            RETURNING *;
        `;
        const result = yield (0, database_1.executeQuery)(query, values);
        return result.rows[0];
    }
    catch (error) {
        console.error("Error updating service:", error);
        throw error;
    }
});
exports.updateService = updateService;
