require("dotenv").config();
import { executeQuery } from "../db/database";
import { getService } from "./getService";

type Service = {
    category: string;
    name: string;
    price: number;
    categoryId: number;
};

export const updateService = async (serviceId: number, data: Service) => {
    try {
        const existingService = await getService(serviceId);

        if (!existingService || existingService.rows.length === 0) {
            return null;
        }

        const values = [
            data.category,
            data.categoryId,
            data.name,
            data.price,
            serviceId,
        ];

        const query = `
            UPDATE "service"
            SET "category" = $1, "category_id" = $2, "name" = $3, "price" = $4
            WHERE "id" = $5
            RETURNING *;
        `;

        const result = await executeQuery(query, values);

        return result.rows[0];
    } catch (error) {
        console.error("Error updating service:", error);
        throw error;
    }
};
