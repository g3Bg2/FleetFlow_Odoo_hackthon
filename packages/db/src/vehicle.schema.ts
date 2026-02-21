import { decimal, index, integer, pgEnum, pgTable, varchar } from "drizzle-orm/pg-core";
import { timestamps } from "./db.helpers";

export const vehicleStatusEnum = pgEnum("vehicle_status", [
  "available",
  "on_trip",
  "in_shop",
  "retired",
]);

export const vehicles = pgTable(
  "vehicles",
  {
    id: integer().primaryKey().generatedByDefaultAsIdentity(),
    nameModel: varchar({ length: 100 }).notNull(),
    licensePlate: varchar({ length: 20 }).notNull().unique(),
    maxCapacity: decimal({ precision: 10, scale: 2 }).notNull(),
    currentOdometer: integer().notNull(),
    status: vehicleStatusEnum().notNull().default("available"),
    acquisitionCost: decimal({
      precision: 15,
      scale: 2,
    }).notNull(),
    ...timestamps,
  },
  (table) => [
    index("vehicle_license_plate_idx").on(table.licensePlate),
    index("vehicle_status_idx").on(table.status),
  ]
);

export type Vehicle = typeof vehicles.$inferSelect;
export type NewVehicle = typeof vehicles.$inferInsert;
