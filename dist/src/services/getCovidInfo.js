"use strict";
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
const getCovidInfo = async () => {
    try {
        const response = await axios_1.default.get(`${process.env.COVID_API_URL}?apiKey=${process.env.COVID_API_KEY}`);
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
};
exports.getCovidInfo = getCovidInfo;
