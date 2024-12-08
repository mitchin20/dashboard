require("dotenv").config();
import { executeQuery } from "../db/database";

interface Employees {
    firstName: string;
    lastName: string;
    fullName: string;
    color: string;
    phone: string;
    email: string;
}

export const getEmployees = async () => {
    try {
        const query = `
            SELECT *
            FROM "Employee";
        `;

        const result = await executeQuery(query);

        return result.rows || [];
    } catch (error) {
        if (error instanceof Error) console.error(error.message);
        throw error;
    }
};
