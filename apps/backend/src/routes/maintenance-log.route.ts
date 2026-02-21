import { Hono } from "hono";
import * as maintenanceLogController from "../controllers/maintenance-log.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import {
  createMaintenanceLogSchema,
  maintenanceLogParamsSchema,
  updateMaintenanceLogSchema,
} from "../validators/maintenance-log.validator.js";

const maintenanceLogRouter = new Hono();

maintenanceLogRouter.get("/", authMiddleware, maintenanceLogController.getAllMaintenanceLogs);
maintenanceLogRouter.get(
  "/:id",
  authMiddleware,
  validate({ params: maintenanceLogParamsSchema }),
  maintenanceLogController.getMaintenanceLogById
);
maintenanceLogRouter.post(
  "/",
  authMiddleware,
  validate({ body: createMaintenanceLogSchema }),
  maintenanceLogController.createMaintenanceLog
);
maintenanceLogRouter.put(
  "/:id",
  authMiddleware,
  validate({
    params: maintenanceLogParamsSchema,
    body: updateMaintenanceLogSchema,
  }),
  maintenanceLogController.updateMaintenanceLog
);
maintenanceLogRouter.delete(
  "/:id",
  authMiddleware,
  validate({ params: maintenanceLogParamsSchema }),
  maintenanceLogController.deleteMaintenanceLog
);

export default maintenanceLogRouter;
