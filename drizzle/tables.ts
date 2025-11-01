import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  clerk_id: text("clerk_id").unique().notNull(),
  email: text("email").unique().notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$default(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().$default(() => new Date()),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
