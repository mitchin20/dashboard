import { executeQuery } from "../db/database";

export const getEmployee = async (id: number) => {
    try {
        const values = [id];
        const query = `
            SELECT * FROM "Employee" WHERE "id" = $1;
        `;
        const result = await executeQuery(query, values);
        return result.rows[0];
    } catch (error) {
        console.error("Error fetching employee:", error);
        throw error;
    }
};
