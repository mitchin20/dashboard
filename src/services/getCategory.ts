require("dotenv").config();
import { executeQuery } from "../db/database";

export const getCategory = async (id: number) => {
    try {
        const values = [id];
        const query = `
            SELECT *
            FROM "category"
            WHERE id = $1;
        `;

        const result = await executeQuery(query, values);

        const category = result.rows[0];

        return category;
    } catch (error) {
        if (error instanceof Error) console.error(error.message);
        throw error;
    }
};
