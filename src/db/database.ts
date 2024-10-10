require("dotenv").config();
import { Pool, PoolClient, QueryResult } from "pg";

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const executeQuery = async (
    text: string,
    params?: (number | string)[]
): Promise<QueryResult> => {
    try {
        const response = await pool.query(text, params);

        return response;
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error executing query", error.message);
        } else {
            console.error("An unknown error occurred");
        }
        throw error;
    }
};

export { executeQuery, pool, PoolClient };
