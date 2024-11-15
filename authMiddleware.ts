require("dotenv").config();
import { jwtVerify } from "jose";
import { NextFunction, Request, Response } from "express";
import { JWTExpired } from "jose/errors";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);
const permissionRoleList = ["BASIC", "ADMIN", "ADVANCE"];

interface CustomRequest extends Request {
    user?: any;
}

interface JwtPayloadProps {
    id: string;
    role: string;
}

export const authMiddleware = async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
        return res.status(403).json({
            success: false,
            message: "Token not provided",
        });
    }

    const tokenParts = authHeader.split(" ");
    if (tokenParts[0] !== "Bearer" || !tokenParts[1]) {
        return res.status(403).json({
            success: false,
            message: "Invalid token format",
        });
    }

    const token = tokenParts[1];

    try {
        const { payload } = (await jwtVerify(token, secret)) as {
            payload: JwtPayloadProps;
        };
        if (!payload.role || !permissionRoleList.includes(payload.role)) {
            return res.status(403).json({
                success: false,
                message: "Invalid token",
            });
        }

        req.user = payload;

        next();
    } catch (error) {
        if (error instanceof JWTExpired) {
            console.log("Unauthorized:", error.message);
            return res.status(401).json({
                success: false,
                message: error.message,
            });
        } else {
            return res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    }
};
