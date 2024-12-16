import { Request, Response } from "express";
import { updateCategory } from "../services/updateCategory";

export const updateCategoryController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const data = req.body;

        if (!id || !data) {
            res.status(400).json({
                success: false,
                data: null,
                error: "Bad Request",
                message: "No data provided",
            });
            return;
        }

        const updatedCategory = await updateCategory(Number(id), data);

        res.status(200).json({
            success: true,
            data: updatedCategory,
            error: null,
            message: "Successfully updated category",
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
