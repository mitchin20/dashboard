import { Request, Response } from "express";
import { getEmployees } from "../services/getEmployees";

export const getEmployeesController = async (req: Request, res: Response) => {
    try {
        const employees = await getEmployees();

        if (employees.length > 0) {
            res.status(200).json({
                success: true,
                data: employees,
                error: null,
                message: "Successfully fetch all employees",
            });
        } else {
            res.status(404).json({
                success: false,
                data: employees,
                error: null,
                message: "No employees found",
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            data: null,
            message: "Internal Server Error",
            error: error,
        });
    }
};
