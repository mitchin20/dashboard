"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.createEmployeeController = void 0;
const yup = __importStar(require("yup"));
const createEmployee_1 = require("../services/createEmployee");
const employeeSchema = yup.object().shape({
    firstName: yup.string().min(2).required(),
    lastName: yup.string().min(2).required(),
    color: yup.string().required(),
    email: yup.string().email().required(),
    phone: yup.string().required(),
    employeeType: yup.string().required(),
});
const createEmployeeController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        if (!data.firstName ||
            !data.lastName ||
            !data.color ||
            !data.email ||
            !data.phone ||
            !data.employeeType) {
            res.status(400).json({
                success: false,
                data: null,
                error: "Bad Request",
                message: "Missing required fields",
            });
            return;
        }
        yield employeeSchema.validate(data, { abortEarly: false });
        const employee = yield (0, createEmployee_1.createEmployee)(data);
        res.status(200).json({
            success: true,
            data: employee,
            error: null,
            message: "Employee created successfully",
        });
    }
    catch (error) {
        console.error("Error creating employee:", error);
        res.status(500).json({
            success: false,
            data: null,
            error: "Internal Server Error",
            message: "Failed to create employee",
        });
    }
});
exports.createEmployeeController = createEmployeeController;
