import { date, decimal, foreignKey, index, integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { timestamps } from "./db.helpers";
import { vehicles } from "./vehicle.schema";

export const maintenanceLogs = pgTable(
  "maintenanceLog",
  {
    id: integer().primaryKey().generatedByDefaultAsIdentity(),
    vehicleId: integer().notNull(),
    serviceType: varchar({ length: 255 }).notNull(),
    cost: decimal({ precision: 15, scale: 2 }).notNull(),
    serviceDate: date({ mode: "date" }).notNull(),
    ...timestamps,
  },
  (table) => [
    index("maintenanceLog_vehicle_id_idx").on(table.vehicleId),
    index("maintenanceLog_service_date_idx").on(table.serviceDate),
    foreignKey({
      columns: [table.vehicleId],
      foreignColumns: [vehicles.id],
      name: "maintenanceLog_vehicle_id_fkey",
    }),
  ]
);

export type MaintenanceLog = typeof maintenanceLogs.$inferSelect;
export type NewMaintenanceLog = typeof maintenanceLogs.$inferInsert;
