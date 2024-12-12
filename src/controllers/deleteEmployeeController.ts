import { Request, Response } from "express";
import { deleteEmployee } from "../services/deleteEmployee";

export const deleteEmployeeController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const deletedEmployee = await deleteEmployee(Number(id));

        if (!deletedEmployee) {
            res.status(404).json({
                success: false,
                data: null,
                error: "Employee cannot be found",
                message: "Employee not found",
            });
            return;
        }

        res.status(200).json({
            success: true,
            data: deletedEmployee,
            error: null,
            message: "Employee deleted successfully",
        });
    } catch (error) {
        console.error("Error deleting employee:", error);
        res.status(500).json({
            success: false,
            data: null,
            error: "Internal Server Error",
            message: "Unable to delete employee",
        });
    }
};
