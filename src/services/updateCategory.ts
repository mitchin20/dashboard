import { executeQuery } from "../db/database";
import { getCategory } from "./getCategory";

type Category = {
    name: string;
};

export const updateCategory = async (categoryId: number, data: Category) => {
    try {
        const values = [data.name, categoryId];

        const query = `
            UPDATE "category"
            SET "name" = $1
            WHERE "id" = $2
            RETURNING *;
        `;

        const result = await executeQuery(query, values);

        return result.rows[0];
    } catch (error) {
        console.error("Error updating category:", error);
        throw error;
    }
};
