import { Request, Response } from "express";
import { getCategories } from "../services/getCategories";

export const getCategoriesController = async (req: Request, res: Response) => {
    try {
        const categories = await getCategories();

        res.status(200).json({
            success: true,
            data: categories,
            error: null,
            message: "Successfully fetched categories",
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
