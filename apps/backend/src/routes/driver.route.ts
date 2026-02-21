import { Hono } from "hono";
import * as driverController from "../controllers/driver.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import {
  createDriverSchema,
  driverParamsSchema,
  updateDriverSchema,
} from "../validators/driver.validator.js";

const driverRouter = new Hono();

driverRouter.get("/", authMiddleware, driverController.getAllDrivers);
driverRouter.get(
  "/:id",
  authMiddleware,
  validate({ params: driverParamsSchema }),
  driverController.getDriverById
);
driverRouter.post(
  "/",
  authMiddleware,
  validate({ body: createDriverSchema }),
  driverController.createDriver
);
driverRouter.put(
  "/:id",
  authMiddleware,
  validate({ params: driverParamsSchema, body: updateDriverSchema }),
  driverController.updateDriver
);
driverRouter.delete(
  "/:id",
  authMiddleware,
  validate({ params: driverParamsSchema }),
  driverController.deleteDriver
);

export default driverRouter;
