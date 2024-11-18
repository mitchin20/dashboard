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
require("dotenv").config();
const rateLimit_1 = __importDefault(require("./lib/rateLimit"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const database_1 = require("./db/database");
const routes_1 = __importDefault(require("./routes"));
// import { authMiddleware } from "./authMiddleware";
// private routes
// public routes
console.log("Using PORT: ", process.env.PORT);
const app = (0, express_1.default)();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080;
if (PORT === 80) {
    console.error("Error: Attempt to bind to port 80 detected, terminating server.");
    process.exit(1);
}
const allowedOrigins = [
    "http://localhost:3000",
    "http://ec2-34-229-201-159.compute-1.amazonaws.com/",
    "https://dashboard-client-sigma-ecru.vercel.app/",
    "https://dashboard-client-mbnb2prdu-giangs-projects-52c6f04e.vercel.app/",
];
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
app.use(rateLimit_1.default);
app.use((0, morgan_1.default)(":method :url :status :res[content-length] - :response-time ms"));
app.use((0, cors_1.default)({
    origin: allowedOrigins,
    // origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.get("/health", (req, res) => {
    res.status(200).send("Application is healthy!");
});
// public routes
// private routes
app.use("/api", routes_1.default);
// root route
app.use("/", (req, res) => {
    res.status(200).send("Server is running!");
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(404).send("Page is not found");
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});
const server = app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on port ${PORT}`);
});
const shutDownDbConnection = () => {
    server.close(() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield database_1.pool.end();
            console.log("Database connection closed");
            process.exit(0);
        }
        catch (error) {
            if (error instanceof Error) {
                console.error("Error closing database connection", error.stack);
            }
            process.exit(0);
        }
    }));
};
const shutDownListener = () => {
    process.on("SIGTERM", shutDownDbConnection);
    process.on("SIGINT", shutDownDbConnection);
    process.on("uncaughtException", (err) => {
        console.error(err.message);
        shutDownDbConnection();
    });
    process.on("unhandledRejection", (reason, promise) => {
        console.error("Unhandled Rejection at:", promise, "reason:", reason);
        shutDownDbConnection();
    });
};
shutDownListener();
exports.default = app;
