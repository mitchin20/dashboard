import { executeQuery } from "../db/database";
import { getEmployee } from "./getEmployee";

export const deleteEmployee = async (id: number) => {
    try {
        const employee = await getEmployee(id);
        if (!employee) {
            return null;
        }

        const values = [id];
        const query = `
            DELETE FROM "Employee"
            WHERE "id" = $1
            RETURNING *;
        `;

        const result = await executeQuery(query, values);

        return result.rows[0];
    } catch (error) {
        console.error("Error deleting employee:", error);
        throw error;
    }
};
