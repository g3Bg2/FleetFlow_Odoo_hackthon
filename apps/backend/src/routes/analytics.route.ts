import { Hono } from "hono";
import * as analyticsController from "../controllers/analytics.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const analyticsRouter = new Hono();

analyticsRouter.get("/fleet", authMiddleware, analyticsController.getFleetAnalytics);
analyticsRouter.get("/vehicle/:vehicleId", authMiddleware, analyticsController.getVehicleAnalytics);
analyticsRouter.get("/export/trips", authMiddleware, analyticsController.exportTripsCSV);

export default analyticsRouter;
