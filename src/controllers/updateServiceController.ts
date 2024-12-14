import { Request, Response } from "express";
import { updateService } from "../services/updateService";

export const updateServiceController = async (req: Request, res: Response) => {
    try {
        const serviceId = parseInt(req.params.id);
        const data = req.body;

        const updatedService = await updateService(serviceId, data);

        if (!updatedService) {
            res.status(404).json({
                success: false,
                data: null,
                message: "Service not found",
                error: null,
            });
            return;
        }

        res.status(200).json({
            success: true,
            data: updatedService,
            error: null,
            message: "Successfully updated service",
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
