import { Hono } from "hono";
import * as fuelLogController from "../controllers/fuel-log.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import {
  createFuelLogSchema,
  fuelLogParamsSchema,
  updateFuelLogSchema,
} from "../validators/fuel-log.validator.js";

const fuelLogRouter = new Hono();

fuelLogRouter.get("/", fuelLogController.getAllFuelLogs);
fuelLogRouter.get(
  "/:id",
  validate({ params: fuelLogParamsSchema }),
  fuelLogController.getFuelLogById
);
fuelLogRouter.post("/", validate({ body: createFuelLogSchema }), fuelLogController.createFuelLog);
fuelLogRouter.put(
  "/:id",
  validate({ params: fuelLogParamsSchema, body: updateFuelLogSchema }),
  fuelLogController.updateFuelLog
);
fuelLogRouter.delete(
  "/:id",
  validate({ params: fuelLogParamsSchema }),
  fuelLogController.deleteFuelLog
);

export default fuelLogRouter;
