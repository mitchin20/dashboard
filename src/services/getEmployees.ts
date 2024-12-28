require("dotenv").config();
import { executeQuery } from "../db/database";

type Employees = {
    id: number;
    firstName: string;
    lastName: string;
    fullName: string;
    color: string;
    phone: string;
    email: string;
    employeeType: string;
};

export const getEmployees = async () => {
    try {
        const query = `
            SELECT *
            FROM "Employee";
        `;

        const result = await executeQuery(query);

        const employees: Employees[] = result.rows;

        return employees;
    } catch (error) {
        if (error instanceof Error) console.error(error.message);
        throw error;
    }
};
