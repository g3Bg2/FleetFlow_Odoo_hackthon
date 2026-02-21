import { Hono } from "hono";
import * as dashboardController from "../controllers/dashboard.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const dashboardRouter = new Hono();

dashboardRouter.get("/stats", authMiddleware, dashboardController.getDashboardStats);

export default dashboardRouter;
