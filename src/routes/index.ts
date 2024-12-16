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
import { deleteEmployeeController } from "../controllers/deleteEmployeeController";
import { getServicesController } from "../controllers/getServicesController";
import { updateServiceController } from "../controllers/updateServiceController";
import { createServiceController } from "../controllers/createServiceController";
import { deleteServiceController } from "../controllers/deleteServiceController";
import { createCategoryController } from "../controllers/createCategoryController";
import { updateCategoryController } from "../controllers/updateCategoryController";
import { getCategoriesController } from "../controllers/getCategoriesController";
import { deleteCategoryController } from "../controllers/deleteCategoryController";

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
router.delete("/delete-employee/:id", deleteEmployeeController);

// service routes
router.get("/services", getServicesController);
router.put("/update-service/:id", updateServiceController);
router.post("/create-service", createServiceController);
router.delete("/delete-service/:id", deleteServiceController);

// category routes
router.get("/categories", getCategoriesController);
router.put("/update-category/:id", updateCategoryController);
router.post("/create-category", createCategoryController);
router.delete("/delete-category/:id", deleteCategoryController);

export default router;
