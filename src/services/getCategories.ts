import { executeQuery } from "../db/database";

type Category = {
    id: number;
    name: string;
};

export const getCategories = async () => {
    try {
        const query = `SELECT * FROM "category"`;
        const result = await executeQuery(query);
        const categories: Category[] = result.rows;

        return categories;
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
    }
};
