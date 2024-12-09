import { executeQuery } from "../db/database";

type Employee = {
    firstName: string;
    lastName: string;
    color: string;
    email: string;
    phone: string;
};

export const createEmployee = async (data: Employee) => {
    try {
        const fullName = `${data.firstName} ${data.lastName}`;

        const values = [
            data.firstName,
            data.lastName,
            fullName,
            data.color,
            data.email,
            data.phone,
        ];

        const query = `
            INSERT INTO "Employee" ("firstName", "lastName", "fullName", "color", "email", "phone")
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *;
        `;

        const result = await executeQuery(query, values);

        return result.rows[0];
    } catch (error) {
        console.error("Error creating employee:", error);
        throw error;
    }
};