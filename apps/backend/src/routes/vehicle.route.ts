import { Hono } from "hono";
import * as vehicleController from "../controllers/vehicle.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import {
  createVehicleSchema,
  updateVehicleSchema,
  vehicleParamsSchema,
} from "../validators/vehicle.validator.js";

const vehicleRouter = new Hono();

vehicleRouter.get("/", authMiddleware, vehicleController.getAllVehicles);
vehicleRouter.get(
  "/:id",
  authMiddleware,
  validate({ params: vehicleParamsSchema }),
  vehicleController.getVehicleById
);
vehicleRouter.post(
  "/",
  authMiddleware,
  validate({ body: createVehicleSchema }),
  vehicleController.createVehicle
);
vehicleRouter.put(
  "/:id",
  authMiddleware,
  validate({ params: vehicleParamsSchema, body: updateVehicleSchema }),
  vehicleController.updateVehicle
);
vehicleRouter.delete(
  "/:id",
  authMiddleware,
  validate({ params: vehicleParamsSchema }),
  vehicleController.deleteVehicle
);

export default vehicleRouter;
