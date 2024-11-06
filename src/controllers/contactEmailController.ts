import { Request, Response } from "express";
import { sendEmail } from "../services/contactMailer";

export const contactEmailController = async (req: Request, res: Response) => {
    const { fullName, email, message } = req.body;

    try {
        await sendEmail(fullName, email, message);
        res.status(200).json({
            success: true,
            error: null,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : error,
        });
    }
};
