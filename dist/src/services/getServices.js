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
exports.getServices = void 0;
require("dotenv").config();
const database_1 = require("../db/database");
const getServices = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = `
            SELECT *
            FROM "service";
        `;
        const result = yield (0, database_1.executeQuery)(query);
        const services = result.rows;
        return services;
    }
    catch (error) {
        if (error instanceof Error)
            console.error(error.message);
        throw error;
    }
});
exports.getServices = getServices;
