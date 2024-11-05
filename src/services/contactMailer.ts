require("dotenv").config();
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
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

export const sendEmail = async (
    name: string,
    email: string,
    message: string
) => {
    const mailOptions = {
        from: process.env.EMAIL,
        to: process.env.TO_EMAIL,
        replyTo: process.env.EMAIL,
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
            } else {
                return "Email sent: " + info.response;
            }
        });
    } catch (error) {
        console.log("Error sending email: ", error);
        throw error;
    }
};
