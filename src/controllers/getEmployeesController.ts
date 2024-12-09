import { Request, Response } from "express";
import { getEmployees } from "../services/getEmployees";

export const getEmployeesController = async (req: Request, res: Response) => {
    try {
        const employees = await getEmployees();

        res.status(200).json({
            success: true,
            data: employees,
            error: null,
            message: "Successfully fetch all employees",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            data: null,
            message: "Internal Server Error",
            error: error,
        });
    }
};
