import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as driverSchema from "./driver.schema";
import * as fuelLogSchema from "./fuel-log.schema";
import * as maintenanceLogSchema from "./maintenance-log.schema";
import * as tripSchema from "./trip.schema";
import * as userSchema from "./user.schema";
import * as vehicleSchema from "./vehicle.schema";

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const schema = {
  ...userSchema,
  ...vehicleSchema,
  ...driverSchema,
  ...tripSchema,
  ...maintenanceLogSchema,
  ...fuelLogSchema,
};

export const db = drizzle(pool, { schema, casing: "snake_case" });
