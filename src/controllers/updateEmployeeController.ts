import { Request, Response } from "express";
import * as yup from "yup";
import { updateEmployee } from "../services/updateEmployee";

const employeeSchema = yup.object().shape({
    firstName: yup.string().min(2).required(),
    lastName: yup.string().min(2).required(),
    color: yup.string().required(),
    email: yup.string().email().required(),
    phone: yup.string().required(),
    employeeType: yup.string().required(),
});

export const updateEmployeeController = async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = req.body;

    try {
        if (!id) {
            res.status(400).json({ error: "No id provided" });
            return;
        }

        if (!data) {
            res.status(400).json({ error: "No data provided" });
            return;
        }

        await employeeSchema.validate(data, { abortEarly: false });

        const employee = await updateEmployee(Number(id), data);

        res.status(200).json({
            success: true,
            data: employee,
            error: null,
            message: "Employee updated successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            data: null,
            error: "Internal Server Error",
            message: "Failed to update employee",
        });
    }
};
