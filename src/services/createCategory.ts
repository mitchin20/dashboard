import { executeQuery } from "../db/database";

type Category = {
    name: string;
};

export const createCategory = async (data: Category) => {
    try {
        const values = [data.name];

        const query = `
            INSERT INTO "category" ("name")
            VALUES ($1)
            RETURNING *;
        `;

        const result = await executeQuery(query, values);

        return result.rows[0];
    } catch (error) {
        console.error("Error creating category:", error);
        throw error;
    }
};
