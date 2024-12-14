require("dotenv").config();
import { executeQuery } from "../db/database";
import { getService } from "./getService";

export const deleteService = async (serviceId: number) => {
    try {
        // Check if the service exists
        const existingResult = await getService(serviceId);

        if (!existingResult || existingResult.rows.length === 0) {
            return null;
        }

        const values = [serviceId];
        const query = `
            DELETE FROM "service"
            WHERE "id" = $1
            RETURNING *;
        `;

        const result = await executeQuery(query, values);

        return result.rows[0];
    } catch (error) {
        console.error("Error deleting service:", error);
        throw error;
    }
};
