import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { errorHandler, notFoundHandler } from "./middlewares/index.js";
import driverRouter from "./routes/driver.route.js";
import fuelLogRouter from "./routes/fuel-log.route.js";
import maintenanceLogRouter from "./routes/maintenance-log.route.js";
import roleRouter from "./routes/role.route.js";
import tripRouter from "./routes/trip.route.js";
import userRouter from "./routes/user.route.js";
import vehicleRouter from "./routes/vehicle.route.js";

const app = new Hono();

app.get("/", (c) => {
  return c.json({ message: "FleetFlow API", version: "1.0.0" });
});

app.route("/users", userRouter);
app.route("/roles", roleRouter);
app.route("/vehicles", vehicleRouter);
app.route("/drivers", driverRouter);
app.route("/trips", tripRouter);
app.route("/fuel-logs", fuelLogRouter);
app.route("/maintenance-logs", maintenanceLogRouter);

app.notFound(notFoundHandler);
app.onError(errorHandler);

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);
