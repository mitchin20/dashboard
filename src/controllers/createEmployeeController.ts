import { Request, Response } from "express";
import * as yup from "yup";
import { createEmployee } from "../services/createEmployee";

const employeeSchema = yup.object().shape({
    firstName: yup.string().min(2).required(),
    lastName: yup.string().min(2).required(),
    color: yup.string().required(),
    email: yup.string().email().required(),
    phone: yup.string().required(),
    employeeType: yup.string().required(),
});

export const createEmployeeController = async (req: Request, res: Response) => {
    try {
        const data = req.body;

        if (!data) {
            res.status(400).json({
                success: false,
                data: null,
                error: "Bad Request",
                message: "No data provided",
            });
            return;
        }

        if (
            !data.firstName ||
            !data.lastName ||
            !data.color ||
            !data.email ||
            !data.phone ||
            !data.employeeType
        ) {
            res.status(400).json({
                success: false,
                data: null,
                error: "Bad Request",
                message: "Missing required fields",
            });
            return;
        }

        await employeeSchema.validate(data, { abortEarly: false });

        const employee = await createEmployee(data);
        res.status(200).json({
            success: true,
            data: employee,
            error: null,
            message: "Employee created successfully",
        });
    } catch (error) {
        console.error("Error creating employee:", error);
        res.status(500).json({
            success: false,
            data: null,
            error: "Internal Server Error",
            message: "Failed to create employee",
        });
    }
};
