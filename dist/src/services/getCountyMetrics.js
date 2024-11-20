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
exports.getCountyMetric = void 0;
require("dotenv").config();
const axios_1 = __importDefault(require("axios"));
const getCountyMetric = (countyFips) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const API_URL = `${(_a = process.env.COUNTY_METRIC_API_URL) === null || _a === void 0 ? void 0 : _a.replace("{fips}", countyFips.toString())}?apiKey=${process.env.COVID_API_KEY}`;
    try {
        const response = yield axios_1.default.get(API_URL);
        if (!response.data) {
            return {
                data: null,
                length: 0,
            };
        }
        console.log(response.data);
        return {
            data: response.data,
            length: response.data.length,
        };
    }
    catch (error) {
        console.error("Fetch Count covid information error: ", error);
        throw error;
    }
});
exports.getCountyMetric = getCountyMetric;
