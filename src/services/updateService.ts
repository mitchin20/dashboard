require("dotenv").config();
import { executeQuery } from "../db/database";
import { getService } from "./getService";

type Service = {
    category: string;
    name: string;
    price: number;
};

export const updateService = async (serviceId: number, data: Service) => {
    try {
        const existingService = await getService(serviceId);

        if (!existingService || existingService.rows.length === 0) {
            return null;
        }

        const values = [data.category, data.name, data.price, serviceId];

        const query = `
            UPDATE "service"
            SET "category" = $1, "name" = $2, "price" = $3
            WHERE "id" = $4
            RETURNING *;
        `;

        const result = await executeQuery(query, values);

        return result.rows[0];
    } catch (error) {
        console.error("Error updating service:", error);
        throw error;
    }
};
