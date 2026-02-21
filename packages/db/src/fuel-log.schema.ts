import { date, decimal, foreignKey, index, integer, pgTable } from "drizzle-orm/pg-core";
import { timestamps } from "./db.helpers";
import { trips } from "./trip.schema";
import { vehicles } from "./vehicle.schema";

export const fuelLogs = pgTable(
  "fuelLogs",
  {
    id: integer().primaryKey().generatedByDefaultAsIdentity(),
    vehicleId: integer().notNull(),
    tripId: integer(),
    liters: decimal({ precision: 10, scale: 2 }).notNull(),
    cost: decimal({ precision: 15, scale: 2 }).notNull(),
    logDate: date({ mode: "date" }).notNull(),
    ...timestamps,
  },
  (table) => [
    index("fuelLog_vehicle_id_idx").on(table.vehicleId),
    index("fuelLog_trip_id_idx").on(table.tripId),
    index("fuelLog_log_date_idx").on(table.logDate),
    foreignKey({
      columns: [table.vehicleId],
      foreignColumns: [vehicles.id],
      name: "fuelLog_vehicle_id_fkey",
    }),
    foreignKey({
      columns: [table.tripId],
      foreignColumns: [trips.id],
      name: "fuelLog_trip_id_fkey",
    }),
  ]
);

export type FuelLog = typeof fuelLogs.$inferSelect;
export type NewFuelLog = typeof fuelLogs.$inferInsert;
