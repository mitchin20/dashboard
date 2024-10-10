import { executeQuery } from "../db/database";

interface NpmDataProps {
    name: string;
    weeklyDownload: number;
    version: string;
    license: string;
    unpackedSize: string;
    totalFiles: number;
    issues: number;
    pullRequests: number;
    lastPublish: string;
}

export const bulkUpLoad = async (data: NpmDataProps[]) => {
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
                .map(
                    (_, colIndex) =>
                        `$${
                            rowIndex * Object.keys(data[0]).length +
                            colIndex +
                            1
                        }`
                )
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
        const result = await executeQuery(query, values);
        console.log("result >>>>>>>", result.rows);

        return result.rows;
    } catch (error) {
        if (error instanceof Error) console.log(error.message);
        throw error;
    }
};
