import { bigint, index, pgTable, varchar } from "drizzle-orm/pg-core";
import { timestamps } from "./db.helpers";

export const users = pgTable(
  "users",
  {
    id: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity(),
    name: varchar({ length: 255 }).notNull().unique(),
    ...timestamps,
  },
  (table) => [index("user_name_idx").on(table.name)]
);

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
