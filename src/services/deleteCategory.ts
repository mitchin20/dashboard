import { executeQuery } from "../db/database";
import { getCategory } from "./getCategory";

export const deleteCategory = async (categoryId: number) => {
    try {
        const existingCategory = await getCategory(categoryId);
        if (!existingCategory) {
            return null;
        }

        const values = [categoryId];
        const query = `
            DELETE FROM "category"
            WHERE "id" = $1
            RETURNING *;
        `;

        const result = await executeQuery(query, values);

        return result.rows[0];
    } catch (error) {
        console.error("Error deleting category:", error);
        throw error;
    }
};
