import { date, decimal, index, integer, pgEnum, pgTable, varchar } from "drizzle-orm/pg-core";
import { timestamps } from "./db.helpers";

export const driverStatusEnum = pgEnum("driver_status", [
  "on_duty",
  "off_duty",
  "suspended",
  "on_trip",
]);

export const drivers = pgTable(
  "drivers",
  {
    id: integer().primaryKey().generatedByDefaultAsIdentity(),
    fullName: varchar({ length: 100 }).notNull(),
    licenseCategory: varchar({ length: 50 }).notNull(),
    licenseExpiry: date({ mode: "date" }).notNull(),
    safetyScore: decimal({ precision: 3, scale: 2 }).notNull(),
    status: driverStatusEnum().notNull().default("off_duty"),
    ...timestamps,
  },
  (table) => [index("driver_status_idx").on(table.status)]
);

export type Driver = typeof drivers.$inferSelect;
export type NewDriver = typeof drivers.$inferInsert;
