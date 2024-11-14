import express from "express";
import { bulkUploadController } from "../controllers/bulkUploadController";
import { getCovidInfoDataController } from "../controllers/getCovidInfoController";
import { getStateMetricsTimeseriesController } from "../controllers/getStateMetricsTimeseriesController";
import { downloadResumeController } from "../controllers/downloadResumeController";
import { contactEmailController } from "../controllers/contactEmailController";
import { getNpmPackagesController } from "../controllers/getNpmPackagesController";
import { getMonthlyStateMetricsTimeseriesController } from "../controllers/getMonthlyStateMetricsTimeseriesController";

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

router.post("/bulk-upload", bulkUploadController);
router.post("/contact-email", contactEmailController);
router.post("/get-npm-packages", getNpmPackagesController);

export default router;
