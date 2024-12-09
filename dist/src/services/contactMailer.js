"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
require("dotenv").config();
const nodemailer_1 = __importDefault(require("nodemailer"));
const transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.APP_PASSWORD,
    },
    tls: {
        rejectUnauthorized: false,
    },
});
const sendEmail = async (name, email, message) => {
    const mailOptions = {
        from: `Portfolio Contact <${process.env.DOMAIN_NAME}>`,
        to: process.env.TO_EMAIL,
        replyTo: email,
        subject: `${name} is reaching through Personal Portfolio`,
        text: message,
        html: `
                <p>${message}</p>
                <p>${name}</p>
                <p>${email}</p>
                <p>${name} is reaching out through Portfolio contact form.</p>
            `,
    };
    try {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                return error.message;
            }
            else {
                return "Email sent: " + info.response;
            }
        });
    }
    catch (error) {
        console.log("Error sending email: ", error);
        throw error;
    }
};
exports.sendEmail = sendEmail;
