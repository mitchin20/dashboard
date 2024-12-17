import { Request, Response } from "express";
import * as yup from "yup";
import { createService } from "../services/createService";

const serviceSchema = yup.object().shape({
    category: yup.string().required(),
    name: yup.string().required(),
    price: yup.number().required(),
    categoryId: yup.number().required(),
});

export const createServiceController = async (req: Request, res: Response) => {
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

        if (!data.category || !data.name || !data.price) {
            res.status(400).json({
                success: false,
                data: null,
                error: "Bad Request",
                message: "Missing required fields",
            });
            return;
        }

        await serviceSchema.validate(data, { abortEarly: false });

        const newService = await createService(data);

        res.status(200).json({
            success: true,
            data: newService,
            error: null,
            message: "Successfully created service",
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
