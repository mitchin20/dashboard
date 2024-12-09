"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactEmailController = void 0;
const contactMailer_1 = require("../services/contactMailer");
const contactEmailController = async (req, res) => {
    const { fullName, email, message } = req.body;
    try {
        await (0, contactMailer_1.sendEmail)(fullName, email, message);
        res.status(200).json({
            success: true,
            error: null,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : error,
        });
    }
};
exports.contactEmailController = contactEmailController;
