import { Hono } from "hono";
import * as tripController from "../controllers/trip.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import {
  createTripSchema,
  tripParamsSchema,
  updateTripSchema,
} from "../validators/trip.validator.js";

const tripRouter = new Hono();

tripRouter.get("/", tripController.getAllTrips);
tripRouter.get("/:id", validate({ params: tripParamsSchema }), tripController.getTripById);
tripRouter.post("/", validate({ body: createTripSchema }), tripController.createTrip);
tripRouter.put(
  "/:id",
  validate({ params: tripParamsSchema, body: updateTripSchema }),
  tripController.updateTrip
);
tripRouter.delete("/:id", validate({ params: tripParamsSchema }), tripController.deleteTrip);

export default tripRouter;
