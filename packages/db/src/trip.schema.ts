import { decimal, foreignKey, index, integer, pgEnum, pgTable } from "drizzle-orm/pg-core";
import { timestamps } from "./db.helpers";
import { drivers } from "./driver.schema";
import { vehicles } from "./vehicle.schema";

export const tripStatusEnum = pgEnum("trip_status", [
  "draft",
  "dispatched",
  "completed",
  "cancelled",
]);

export const trips = pgTable(
  "trips",
  {
    id: integer().primaryKey().generatedByDefaultAsIdentity(),
    vehicleId: integer().notNull(),
    driverId: integer().notNull(),
    cargoWeight: decimal({ precision: 10, scale: 2 }).notNull(),
    startOdometer: integer().notNull(),
    endOdometer: integer(),
    status: tripStatusEnum().notNull().default("draft"),
    revenue: decimal({ precision: 15, scale: 2 }),
    ...timestamps,
  },
  (table) => [
    index("trip_vehicle_id_idx").on(table.vehicleId),
    index("trip_driver_id_idx").on(table.driverId),
    index("trip_status_idx").on(table.status),
    foreignKey({
      columns: [table.vehicleId],
      foreignColumns: [vehicles.id],
      name: "trip_vehicle_id_fkey",
    }),
    foreignKey({
      columns: [table.driverId],
      foreignColumns: [drivers.id],
      name: "trip_driver_id_fkey",
    }),
  ]
);

export type Trip = typeof trips.$inferSelect;
export type NewTrip = typeof trips.$inferInsert;
