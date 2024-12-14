import { Request, Response } from "express";
import { getServices } from "../services/getServices";

export const getServicesController = async (req: Request, res: Response) => {
    try {
        const services = await getServices();

        res.status(200).json({
            success: true,
            data: services,
            error: null,
            message: "Successfully fetch all services",
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
