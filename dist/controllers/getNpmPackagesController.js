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
exports.getNpmPackagesController = void 0;
const getNpmPackages_1 = require("../services/getNpmPackages");
const getNpmPackagesController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, getNpmPackages_1.getNpmPackages)();
        res.status(200).json({
            success: true,
            data: result,
            error: null,
            message: "Successfully fetched NPM packages",
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            data: null,
            error: error instanceof Error ? error.message : error,
            message: "Internal Server Error",
        });
    }
});
exports.getNpmPackagesController = getNpmPackagesController;
