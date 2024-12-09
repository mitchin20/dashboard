"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = exports.executeQuery = void 0;
require("dotenv").config();
const pg_1 = require("pg");
const pool = new pg_1.Pool({
    connectionString: process.env.DATABASE_URL,
});
exports.pool = pool;
const executeQuery = async (text, params) => {
    try {
        const response = await pool.query(text, params);
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
};
exports.executeQuery = executeQuery;
