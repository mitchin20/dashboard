import { Request, Response } from "express";
import * as yup from "yup";
import { createCategory } from "../services/createCategory";

const categorySchema = yup.object().shape({
    name: yup.string().min(2).required(),
});

export const createCategoryController = async (req: Request, res: Response) => {
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

        if (!data.name) {
            res.status(400).json({
                success: false,
                data: null,
                error: "Bad Request",
                message: "Missing required fields",
            });
            return;
        }

        await categorySchema.validate(data, { abortEarly: false });

        const newCategory = await createCategory(data);

        res.status(200).json({
            success: true,
            data: newCategory,
            error: null,
            message: "Successfully created category",
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
