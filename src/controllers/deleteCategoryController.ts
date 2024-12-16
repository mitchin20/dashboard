import { Request, Response } from "express";
import { deleteCategory } from "../services/deleteCategory";

export const deleteCategoryController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!id) {
            res.status(400).json({
                success: false,
                data: null,
                error: "Bad Request",
                message: "No data provided",
            });
            return;
        }

        const deletedCategory = await deleteCategory(Number(id));

        res.status(200).json({
            success: true,
            data: deletedCategory,
            error: null,
            message: "Successfully deleted category",
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
