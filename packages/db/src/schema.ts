import { bigint, foreignKey, index, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

export const users = pgTable(
  "User",
  {
    id: bigint("id", { mode: "number" }).primaryKey().generatedByDefaultAsIdentity(),
    name: varchar("name", { length: 255 }).notNull().unique(),
    createdAt: timestamp("createdAt", { mode: "date" }).defaultNow().notNull(),
    updatedAt: timestamp("updatedAt", { mode: "date" }).defaultNow().notNull(),
  },
  (table) => ({
    nameIdx: index("User_name_idx").on(table.name),
  })
);

export const todos = pgTable(
  "Todo",
  {
    id: bigint("id", { mode: "number" }).primaryKey().generatedByDefaultAsIdentity(),
    task: varchar("task", { length: 255 }).notNull(),
    dueDate: timestamp("dueDate", { mode: "date" }).notNull(),
    userId: bigint("userId", { mode: "number" }).notNull(),
    createdAt: timestamp("createdAt", { mode: "date" }).defaultNow().notNull(),
    updatedAt: timestamp("updatedAt", { mode: "date" }).defaultNow().notNull(),
  },
  (table) => ({
    userIdIdx: index("Todo_userId_idx").on(table.userId),
    userIdFk: foreignKey({
      columns: [table.userId],
      foreignColumns: [users.id],
      name: "Todo_userId_fkey",
    }),
  })
);

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Todo = typeof todos.$inferSelect;
export type NewTodo = typeof todos.$inferInsert;
