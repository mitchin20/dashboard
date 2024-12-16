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
exports.deleteCategory = void 0;
const database_1 = require("../db/database");
const getCategory_1 = require("./getCategory");
const deleteCategory = (categoryId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingCategory = yield (0, getCategory_1.getCategory)(categoryId);
        if (!existingCategory) {
            return null;
        }
        const values = [categoryId];
        const query = `
            DELETE FROM "category"
            WHERE "id" = $1
            RETURNING *;
        `;
        const result = yield (0, database_1.executeQuery)(query, values);
        return result.rows[0];
    }
    catch (error) {
        console.error("Error deleting category:", error);
        throw error;
    }
});
exports.deleteCategory = deleteCategory;
