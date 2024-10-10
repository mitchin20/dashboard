import express from "express";
import { bulkUploadController } from "../controllers/bulkUploadController";
import { getCovidInfoDataController } from "../controllers/getCovidInfoController";
import { getStateMetricsTimeseriesController } from "../controllers/getStateMetricsTimeseriesController";

const router = express.Router();

router.get("/all-us-states-covid-data", getCovidInfoDataController);
router.get(
    "/state-metrics-timeseries/:state",
    getStateMetricsTimeseriesController
);

router.post("/bulk-upload", bulkUploadController);

export default router;
