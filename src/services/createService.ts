require("dotenv").config();
import { executeQuery } from "../db/database";

export const createService = async (data: any) => {
    try {
        const values = [data.category, data.name, data.price, data.categoryId];
        const query = `
            INSERT INTO "service" ("category", "name", "price", "categoryId")
            VALUES ($1, $2, $3, $4)
            RETURNING *;
        `;

        const result = await executeQuery(query, values);

        return result.rows[0];
    } catch (error) {
        console.error("Error creating service:", error);
        throw error;
    }
};
