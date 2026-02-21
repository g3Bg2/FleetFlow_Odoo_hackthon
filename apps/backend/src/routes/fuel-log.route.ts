import { Hono } from "hono";
import * as fuelLogController from "../controllers/fuel-log.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import {
  createFuelLogSchema,
  fuelLogParamsSchema,
  updateFuelLogSchema,
} from "../validators/fuel-log.validator.js";

const fuelLogRouter = new Hono();

fuelLogRouter.get("/", authMiddleware, fuelLogController.getAllFuelLogs);
fuelLogRouter.get(
  "/:id",
  authMiddleware,
  validate({ params: fuelLogParamsSchema }),
  fuelLogController.getFuelLogById
);
fuelLogRouter.post(
  "/",
  authMiddleware,
  validate({ body: createFuelLogSchema }),
  fuelLogController.createFuelLog
);
fuelLogRouter.put(
  "/:id",
  authMiddleware,
  validate({ params: fuelLogParamsSchema, body: updateFuelLogSchema }),
  fuelLogController.updateFuelLog
);
fuelLogRouter.delete(
  "/:id",
  authMiddleware,
  validate({ params: fuelLogParamsSchema }),
  fuelLogController.deleteFuelLog
);

export default fuelLogRouter;
