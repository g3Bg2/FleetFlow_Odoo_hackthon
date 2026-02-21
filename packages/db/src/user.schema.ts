import { bigint, index, integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { timestamps } from "./db.helpers";
import { roles } from "./role.schema";

export const users = pgTable(
  "users",
  {
    id: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity(),
    roleId: integer("role_id").references(() => roles.id, {
      onDelete: "set null",
    }),
    username: varchar({ length: 100 }).notNull().unique(),
    passwordHash: varchar("password_hash", { length: 255 }).notNull(),
    fullName: varchar("full_name", { length: 255 }).notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
    phone: varchar({ length: 20 }),
    ...timestamps,
  },
  (table) => [
    index("user_username_idx").on(table.username),
    index("user_email_idx").on(table.email),
    index("user_role_id_idx").on(table.roleId),
  ]
);

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
