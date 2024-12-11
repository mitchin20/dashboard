"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bulkUploadController_1 = require("../controllers/bulkUploadController");
const getCovidInfoController_1 = require("../controllers/getCovidInfoController");
const getStateMetricsTimeseriesController_1 = require("../controllers/getStateMetricsTimeseriesController");
const downloadResumeController_1 = require("../controllers/downloadResumeController");
const contactEmailController_1 = require("../controllers/contactEmailController");
const getNpmPackagesController_1 = require("../controllers/getNpmPackagesController");
const getMonthlyStateMetricsTimeseriesController_1 = require("../controllers/getMonthlyStateMetricsTimeseriesController");
const getCountyMetricController_1 = require("../controllers/getCountyMetricController");
const getEmployeesController_1 = require("../controllers/getEmployeesController");
const createEmployeeController_1 = require("../controllers/createEmployeeController");
const updateEmployeeController_1 = require("../controllers/updateEmployeeController");
const router = express_1.default.Router();
router.get("/all-us-states-covid-data", getCovidInfoController_1.getCovidInfoDataController);
router.get("/state-metrics-timeseries/:state", getStateMetricsTimeseriesController_1.getStateMetricsTimeseriesController);
router.get("/monthly-state-metrics-timeseries/:state", getMonthlyStateMetricsTimeseriesController_1.getMonthlyStateMetricsTimeseriesController);
router.get("/download-resume", downloadResumeController_1.downloadResumeController);
router.get("/county-metric/:fips", getCountyMetricController_1.getCountyMetricController);
router.post("/bulk-upload", bulkUploadController_1.bulkUploadController);
router.post("/contact-email", contactEmailController_1.contactEmailController);
router.post("/get-npm-packages", getNpmPackagesController_1.getNpmPackagesController);
// employee routes
router.get("/employees", getEmployeesController_1.getEmployeesController);
router.put("/update-employee/:id", updateEmployeeController_1.updateEmployeeController);
router.post("/create-employee", createEmployeeController_1.createEmployeeController);
exports.default = router;
