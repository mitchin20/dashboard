"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bulkUpLoad = void 0;
const database_1 = require("../db/database");
const bulkUpLoad = async (data) => {
    try {
        if (!data || data.length === 0) {
            throw new Error("No data provided");
        }
        // Extract the keys from object
        const columns = Object.keys(data[0]).join(", ");
        console.log("columns >>>>>>>", columns);
        // Create placeholders
        const placeholders = data.map((_, rowIndex) => {
            return `(${Object.keys(data[0])
                .map((_, colIndex) => `$${rowIndex * Object.keys(data[0]).length +
                colIndex +
                1}`)
                .join(", ")})`;
        });
        console.log("placeholders >>>>>>>", placeholders);
        // Flatten the array of object values into a single array
        const values = data.map((obj) => Object.values(obj)).flat();
        console.log("values >>>>>>>", values);
        // Construct query
        const query = `
            INSERT INTO NpmPackages(${columns})
            VALUES ${placeholders}
            RETURNING *;
        `;
        // Execute query
        const result = await (0, database_1.executeQuery)(query, values);
        console.log("result >>>>>>>", result.rows);
        return result.rows;
    }
    catch (error) {
        if (error instanceof Error)
            console.log(error.message);
        throw error;
    }
};
exports.bulkUpLoad = bulkUpLoad;
