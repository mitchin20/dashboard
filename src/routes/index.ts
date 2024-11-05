import express from "express";
import { bulkUploadController } from "../controllers/bulkUploadController";
import { getCovidInfoDataController } from "../controllers/getCovidInfoController";
import { getStateMetricsTimeseriesController } from "../controllers/getStateMetricsTimeseriesController";
import { downloadResumeController } from "../controllers/downloadResumeController";
import { contactEmailController } from "../controllers/contactEmailController";

const router = express.Router();

router.get("/all-us-states-covid-data", getCovidInfoDataController);
router.get(
    "/state-metrics-timeseries/:state",
    getStateMetricsTimeseriesController
);
router.get("/download-resume", downloadResumeController);

router.post("/bulk-upload", bulkUploadController);
router.post("/contact-email", contactEmailController);

export default router;
