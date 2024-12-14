require("dotenv").config();
import { executeQuery } from "../db/database";

type Service = {
    id: number;
    category: string;
    name: string;
    price: number;
};

export const getServices = async () => {
    try {
        const query = `
            SELECT *
            FROM "service";
        `;

        const result = await executeQuery(query);

        const services: Service[] = result.rows;

        return services;
    } catch (error) {
        if (error instanceof Error) console.error(error.message);
        throw error;
    }
};
