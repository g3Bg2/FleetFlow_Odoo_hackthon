import { Hono } from "hono";
import * as maintenanceLogController from "../controllers/maintenance-log.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import {
  createMaintenanceLogSchema,
  maintenanceLogParamsSchema,
  updateMaintenanceLogSchema,
} from "../validators/maintenance-log.validator.js";

const maintenanceLogRouter = new Hono();

maintenanceLogRouter.get("/", maintenanceLogController.getAllMaintenanceLogs);
maintenanceLogRouter.get(
  "/:id",
  validate({ params: maintenanceLogParamsSchema }),
  maintenanceLogController.getMaintenanceLogById
);
maintenanceLogRouter.post(
  "/",
  validate({ body: createMaintenanceLogSchema }),
  maintenanceLogController.createMaintenanceLog
);
maintenanceLogRouter.put(
  "/:id",
  validate({
    params: maintenanceLogParamsSchema,
    body: updateMaintenanceLogSchema,
  }),
  maintenanceLogController.updateMaintenanceLog
);
maintenanceLogRouter.delete(
  "/:id",
  validate({ params: maintenanceLogParamsSchema }),
  maintenanceLogController.deleteMaintenanceLog
);

export default maintenanceLogRouter;
