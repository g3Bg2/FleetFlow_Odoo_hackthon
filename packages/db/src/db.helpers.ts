import { timestamp } from "drizzle-orm/pg-core";

export const timestamps = {
  createdAt: timestamp("createdAt", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updatedAt", { mode: "date" }).defaultNow().notNull(),
};
