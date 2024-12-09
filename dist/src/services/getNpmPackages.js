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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNpmPackages = void 0;
require("dotenv").config();
const axios_1 = __importDefault(require("axios"));
const NPM_API = "https://api.npms.io/v2/package/mget";
const packageNames = ["react"];
const getNpmPackages = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.post(NPM_API, packageNames, {
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
});
exports.getNpmPackages = getNpmPackages;
