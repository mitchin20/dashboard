import { Request, Response } from "express";
import { deleteService } from "../services/deleteService";

export const deleteServiceController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!id) {
            res.status(400).json({
                success: false,
                data: null,
                error: "Bad Request",
                message: "No service ID provided",
            });
            return;
        }

        const deletedService = await deleteService(Number(id));

        if (!deletedService) {
            res.status(404).json({
                success: false,
                data: null,
                error: "Not Found",
                message: "Service not found",
            });
            return;
        }

        res.status(200).json({
            success: true,
            data: deletedService,
            error: null,
            message: "Service deleted successfully",
        });
    } catch (error) {
        console.error("Error deleting service:", error);
        res.status(500).json({
            success: false,
            data: null,
            error: "Internal Server Error",
            message: "Failed to delete service",
        });
    }
};
