require("dotenv").config();
import { executeQuery } from "../db/database";

export const createService = async (data: any) => {
    try {
        const values = [data.category, data.name, data.price];
        const query = `
            INSERT INTO "service" ("category", "name", "price")
            VALUES ($1, $2, $3)
            RETURNING *;
        `;

        const result = await executeQuery(query, values);

        return result.rows[0];
    } catch (error) {
        console.error("Error creating service:", error);
        throw error;
    }
};
