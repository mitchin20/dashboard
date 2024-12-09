"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactEmailController = void 0;
const contactMailer_1 = require("../services/contactMailer");
const contactEmailController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fullName, email, message } = req.body;
    try {
        yield (0, contactMailer_1.sendEmail)(fullName, email, message);
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
});
exports.contactEmailController = contactEmailController;
