import { Hono } from "hono";
import * as driverController from "../controllers/driver.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import {
  createDriverSchema,
  driverParamsSchema,
  updateDriverSchema,
} from "../validators/driver.validator.js";

const driverRouter = new Hono();

driverRouter.get("/", driverController.getAllDrivers);
driverRouter.get("/:id", validate({ params: driverParamsSchema }), driverController.getDriverById);
driverRouter.post("/", validate({ body: createDriverSchema }), driverController.createDriver);
driverRouter.put(
  "/:id",
  validate({ params: driverParamsSchema, body: updateDriverSchema }),
  driverController.updateDriver
);
driverRouter.delete(
  "/:id",
  validate({ params: driverParamsSchema }),
  driverController.deleteDriver
);

export default driverRouter;
