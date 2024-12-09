"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNpmPackages = void 0;
require("dotenv").config();
const axios_1 = __importDefault(require("axios"));
const NPM_API = "https://api.npms.io/v2/package/mget";
const packageNames = ["react"];
const getNpmPackages = async () => {
    try {
        const response = await axios_1.default.post(NPM_API, packageNames, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log("NPM packages", response.data);
        return response.data;
    }
    catch (error) {
        console.log("Fetch NPM packages error: ", error);
        throw error;
    }
};
exports.getNpmPackages = getNpmPackages;
