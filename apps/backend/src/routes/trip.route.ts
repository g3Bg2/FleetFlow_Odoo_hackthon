import { Hono } from "hono";
import * as tripController from "../controllers/trip.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import {
  createTripSchema,
  tripParamsSchema,
  updateTripSchema,
} from "../validators/trip.validator.js";

const tripRouter = new Hono();

tripRouter.get("/", authMiddleware, tripController.getAllTrips);
tripRouter.get(
  "/:id",
  authMiddleware,
  validate({ params: tripParamsSchema }),
  tripController.getTripById
);
tripRouter.post(
  "/",
  authMiddleware,
  validate({ body: createTripSchema }),
  tripController.createTrip
);
tripRouter.put(
  "/:id",
  authMiddleware,
  validate({ params: tripParamsSchema, body: updateTripSchema }),
  tripController.updateTrip
);
tripRouter.delete(
  "/:id",
  authMiddleware,
  validate({ params: tripParamsSchema }),
  tripController.deleteTrip
);

export default tripRouter;
