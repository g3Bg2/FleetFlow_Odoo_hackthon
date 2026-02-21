import { bigint, index, pgTable, varchar } from "drizzle-orm/pg-core";
import { timestamps } from "./db.helpers";

export const roles = pgTable(
  "roles",
  {
    id: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity(),
    name: varchar({ length: 100 }).notNull().unique(),
    description: varchar({ length: 255 }),
    ...timestamps,
  },
  (table) => [index("role_name_idx").on(table.name)]
);

export type Role = typeof roles.$inferSelect;
export type NewRole = typeof roles.$inferInsert;
