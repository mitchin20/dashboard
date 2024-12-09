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
exports.pool = exports.executeQuery = void 0;
require("dotenv").config();
const pg_1 = require("pg");
const pool = new pg_1.Pool({
    connectionString: process.env.DATABASE_URL,
});
exports.pool = pool;
const executeQuery = (text, params) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield pool.query(text, params);
        return response;
    }
    catch (error) {
        if (error instanceof Error) {
            console.error("Error executing query", error.message);
        }
        else {
            console.error("An unknown error occurred");
        }
        throw error;
    }
});
exports.executeQuery = executeQuery;
