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
exports.getCovidInfo = void 0;
require("dotenv").config();
const axios_1 = __importDefault(require("axios"));
const actualsColExcludedFields = ["hospitalBeds", "hsaHospitalBeds"];
const dataExcludedFields = [
    "county",
    "hsa",
    "hsaName",
    "lat",
    "annotations",
    "long",
];
const getCovidInfo = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(`${process.env.COVID_API_URL}?apiKey=${process.env.COVID_API_KEY}`);
        for (const obj of response.data) {
            for (const key in obj) {
                if (key === "fips") {
                    obj["id"] = obj[key];
                    delete obj[key];
                }
                if (dataExcludedFields.includes(key)) {
                    delete obj[key];
                }
                if (key === "actuals") {
                    for (const actualsKey in obj[key]) {
                        if (actualsColExcludedFields.includes(actualsKey)) {
                            delete obj[key][actualsKey];
                        }
                    }
                }
            }
        }
        return response.data;
    }
    catch (error) {
        console.log("Fetch COVID data error: ", error);
        throw error;
    }
});
exports.getCovidInfo = getCovidInfo;
