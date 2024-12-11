import { executeQuery } from "../db/database";

type Employee = {
    firstName: string;
    lastName: string;
    color: string;
    email: string;
    phone: string;
};

export const updateEmployee = async (employeeId: number, data: Employee) => {
    try {
        // Check if the employee exists
        const checkValues = [employeeId];
        const checkQuery = `
            SELECT * FROM "Employee" WHERE "id" = $1;
        `;

        const existingResult = await executeQuery(checkQuery, checkValues);

        if (!existingResult || existingResult.rows.length === 0) {
            return null;
        }

        const fullName = `${data.firstName} ${data.lastName}`;

        const values = [
            data.firstName,
            data.lastName,
            fullName,
            data.color,
            data.email,
            data.phone,
            employeeId,
        ];

        const query = `
            UPDATE "Employee"
            SET "firstName" = $1, "lastName" = $2, "fullName" = $3, "color" = $4, "email" = $5, "phone" = $6
            WHERE "id" = $7
            RETURNING *;
        `;

        const result = await executeQuery(query, values);

        return result.rows[0];
    } catch (error) {
        console.error("Error updating employee:", error);
        throw error;
    }
};
