import { integer as int, pgTable, text, timestamp, varchar, boolean, decimal } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: int("id").primaryKey().generatedAlwaysAsIdentity(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: text("role").default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export const adminCredentials = pgTable("admin_credentials", {
  id: int("id").primaryKey().generatedAlwaysAsIdentity(),
  username: varchar("username", { length: 100 }).notNull().unique(),
  passwordHash: varchar("passwordHash", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  isActive: boolean("isActive").default(true).notNull(),
  lastLogin: timestamp("lastLogin"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export const categories = pgTable("categories", {
  id: int("id").primaryKey().generatedAlwaysAsIdentity(),
  name: varchar("name", { length: 100 }).notNull(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  description: text("description"),
  isActive: boolean("isActive").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export const brands = pgTable("brands", {
  id: int("id").primaryKey().generatedAlwaysAsIdentity(),
  name: varchar("name", { length: 100 }).notNull(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  logo: varchar("logo", { length: 500 }),
  description: text("description"),
  isActive: boolean("isActive").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export const products = pgTable("products", {
  id: int("id").primaryKey().generatedAlwaysAsIdentity(),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  description: text("description"),
  specifications: text("specifications"),
  categoryId: int("categoryId").notNull(),
  brandId: int("brandId").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }),
  image: varchar("image", { length: 500 }),
  isActive: boolean("isActive").default(true).notNull(),
  isFeatured: boolean("isFeatured").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export const services = pgTable("services", {
  id: int("id").primaryKey().generatedAlwaysAsIdentity(),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  description: text("description"),
  icon: varchar("icon", { length: 500 }),
  image: varchar("image", { length: 500 }),
  features: text("features"),
  isActive: boolean("isActive").default(true).notNull(),
  isFeatured: boolean("isFeatured").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export const quoteRequests = pgTable("quote_requests", {
  id: int("id").primaryKey().generatedAlwaysAsIdentity(),
  productId: int("productId"),
  customerName: varchar("customerName", { length: 255 }).notNull(),
  customerEmail: varchar("customerEmail", { length: 320 }).notNull(),
  customerPhone: varchar("customerPhone", { length: 20 }).notNull(),
  companyName: varchar("companyName", { length: 255 }),
  quantity: int("quantity"),
  message: text("message"),
  status: text("status").default("pending").notNull(),
  isRead: boolean("isRead").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export const contactSubmissions = pgTable("contact_submissions", {
  id: int("id").primaryKey().generatedAlwaysAsIdentity(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 20 }),
  subject: varchar("subject", { length: 255 }).notNull(),
  message: text("message").notNull(),
  status: text("status").default("new").notNull(),
  isRead: boolean("isRead").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export const supportInquiries = pgTable("support_inquiries", {
  id: int("id").primaryKey().generatedAlwaysAsIdentity(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 20 }),
  subject: varchar("subject", { length: 255 }).notNull(),
  message: text("message").notNull(),
  priority: text("priority").default("medium").notNull(),
  status: text("status").default("open").notNull(),
  isRead: boolean("isRead").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export const siteSettings = pgTable("site_settings", {
  id: int("id").primaryKey().generatedAlwaysAsIdentity(),
  siteName: varchar("siteName", { length: 255 }).default("TechBucket").notNull(),
  siteDescription: text("siteDescription"),
  siteKeywords: text("siteKeywords"),
  siteUrl: varchar("siteUrl", { length: 500 }),
  logo: varchar("logo", { length: 500 }),
  favicon: varchar("favicon", { length: 500 }),
  phone: varchar("phone", { length: 20 }),
  email: varchar("email", { length: 320 }),
  address: text("address"),
  socialLinks: text("socialLinks"),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export const emailConfig = pgTable("email_config", {
  id: int("id").primaryKey().generatedAlwaysAsIdentity(),
  host: varchar("host", { length: 255 }).notNull(),
  port: int("port").notNull(),
  user: varchar("user", { length: 255 }).notNull(),
  pass: varchar("pass", { length: 255 }).notNull(),
  from: varchar("from", { length: 255 }).notNull(),
  secure: boolean("secure").default(true).notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type AdminCredential = typeof adminCredentials.$inferSelect;
export type Category = typeof categories.$inferSelect;
export type Brand = typeof brands.$inferSelect;
export type Product = typeof products.$inferSelect;
export type Service = typeof services.$inferSelect;
export type QuoteRequest = typeof quoteRequests.$inferSelect;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type SupportInquiry = typeof supportInquiries.$inferSelect;
export type SiteSetting = typeof siteSettings.$inferSelect;
export type EmailConfig = typeof emailConfig.$inferSelect;
