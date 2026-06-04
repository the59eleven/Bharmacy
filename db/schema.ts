import {
  pgTable,
  serial,
  varchar,
  integer,
  decimal,
  timestamp,
  text,
} from "drizzle-orm/pg-core";

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  sku: varchar("sku", { length: 20 }).notNull().unique(),
  name: varchar("name", { length: 100 }).notNull(),
  casNumber: varchar("cas_number", { length: 30 }),
  type: varchar("type", { length: 50 }).notNull(),
  supplier: varchar("supplier", { length: 10 }).notNull(),
  stock: integer("stock").notNull().default(0),
  unitCost: decimal("unit_cost", { precision: 10, scale: 2 }).notNull(),
  markup: integer("markup").notNull().default(0),
  ourPrice: decimal("our_price", { precision: 10, scale: 2 }).notNull(),
  status: varchar("status", { length: 20 }).notNull().default("Out of Stock"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  orderId: varchar("order_id", { length: 20 }).notNull().unique(),
  customer: varchar("customer", { length: 100 }).notNull(),
  productCount: integer("product_count").notNull().default(0),
  total: decimal("total", { precision: 10, scale: 2 }).notNull(),
  status: varchar("status", { length: 20 }).notNull().default("Pending"),
  date: varchar("date", { length: 20 }).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const orderItems = pgTable("order_items", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id").notNull(),
  productName: varchar("product_name", { length: 100 }).notNull(),
});

export const suppliers = pgTable("suppliers", {
  id: serial("id").primaryKey(),
  supplierId: varchar("supplier_id", { length: 10 }).notNull().unique(),
  name: varchar("name", { length: 100 }).notNull(),
  code: varchar("code", { length: 10 }).notNull(),
  reliability: integer("reliability").notNull().default(0),
  grade: varchar("grade", { length: 5 }).notNull(),
  productCount: integer("product_count").notNull().default(0),
  totalVolume: integer("total_volume").notNull().default(0),
  avgMargin: integer("avg_margin").notNull().default(0),
  status: varchar("status", { length: 20 }).notNull().default("Active"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;
export type Order = typeof orders.$inferSelect;
export type NewOrder = typeof orders.$inferInsert;
export type OrderItem = typeof orderItems.$inferSelect;
export type Supplier = typeof suppliers.$inferSelect;
export type NewSupplier = typeof suppliers.$inferInsert;
