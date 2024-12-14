require("dotenv").config();
import { executeQuery } from "../db/database";

export const getService = async (id: number) => {
    try {
        const values = [id];
        const query = `
            SELECT *
            FROM "service"
            WHERE id = $1;
        `;

        const result = await executeQuery(query, values);

        const service = result.rows[0];

        return service;
    } catch (error) {
        if (error instanceof Error) console.error(error.message);
        throw error;
    }
};
