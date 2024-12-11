import express from "express";
import { bulkUploadController } from "../controllers/bulkUploadController";
import { getCovidInfoDataController } from "../controllers/getCovidInfoController";
import { getStateMetricsTimeseriesController } from "../controllers/getStateMetricsTimeseriesController";
import { downloadResumeController } from "../controllers/downloadResumeController";
import { contactEmailController } from "../controllers/contactEmailController";
import { getNpmPackagesController } from "../controllers/getNpmPackagesController";
import { getMonthlyStateMetricsTimeseriesController } from "../controllers/getMonthlyStateMetricsTimeseriesController";
import { getCountyMetricController } from "../controllers/getCountyMetricController";
import { getEmployeesController } from "../controllers/getEmployeesController";
import { createEmployeeController } from "../controllers/createEmployeeController";
import { updateEmployeeController } from "../controllers/updateEmployeeController";

const router = express.Router();

router.get("/all-us-states-covid-data", getCovidInfoDataController);
router.get(
    "/state-metrics-timeseries/:state",
    getStateMetricsTimeseriesController
);
router.get(
    "/monthly-state-metrics-timeseries/:state",
    getMonthlyStateMetricsTimeseriesController
);
router.get("/download-resume", downloadResumeController);
router.get("/county-metric/:fips", getCountyMetricController);

router.post("/bulk-upload", bulkUploadController);
router.post("/contact-email", contactEmailController);
router.post("/get-npm-packages", getNpmPackagesController);

// employee routes
router.get("/employees", getEmployeesController);
router.put("/update-employee/:id", updateEmployeeController);
router.post("/create-employee", createEmployeeController);

export default router;
