import { eq, and, like, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  InsertUser,
  users,
  adminCredentials,
  categories,
  brands,
  products,
  services,
  quoteRequests,
  contactSubmissions,
  supportInquiries,
  emailConfig,
  siteSettings,
} from "../drizzle/schema";
import { ENV } from "./_core/env";

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

// ============ USER MANAGEMENT ============

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = "admin";
      updateSet.role = "admin";
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db
    .select()
    .from(users)
    .where(eq(users.openId, openId))
    .limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// ============ ADMIN CREDENTIALS ============

export async function getAdminByUsername(username: string) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db
    .select()
    .from(adminCredentials)
    .where(eq(adminCredentials.username, username))
    .limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function createAdminCredential(
  username: string,
  passwordHash: string,
  email: string
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.insert(adminCredentials).values({
    username,
    passwordHash,
    email,
  });
}

export async function updateAdminPassword(adminId: number, passwordHash: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db
    .update(adminCredentials)
    .set({ passwordHash, updatedAt: new Date() })
    .where(eq(adminCredentials.id, adminId));
}

export async function updateAdminLastLogin(adminId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db
    .update(adminCredentials)
    .set({ lastLogin: new Date() })
    .where(eq(adminCredentials.id, adminId));
}

// ============ CATEGORIES ============

export async function getAllCategories() {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(categories).where(eq(categories.isActive, true));
}

export async function getCategoryById(id: number) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db
    .select()
    .from(categories)
    .where(eq(categories.id, id))
    .limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function createCategory(name: string, slug: string, description?: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(categories).values({
    name,
    slug,
    description,
  });

  return result;
}

export async function updateCategory(
  id: number,
  name: string,
  slug: string,
  description?: string
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db
    .update(categories)
    .set({ name, slug, description, updatedAt: new Date() })
    .where(eq(categories.id, id));
}

export async function deleteCategory(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db
    .update(categories)
    .set({ isActive: false, updatedAt: new Date() })
    .where(eq(categories.id, id));
}

// ============ BRANDS ============

export async function getAllBrands() {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(brands).where(eq(brands.isActive, true));
}

export async function getBrandById(id: number) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db
    .select()
    .from(brands)
    .where(eq(brands.id, id))
    .limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function createBrand(
  name: string,
  slug: string,
  logo?: string,
  description?: string
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(brands).values({
    name,
    slug,
    logo,
    description,
  });

  return result;
}

export async function updateBrand(
  id: number,
  name: string,
  slug: string,
  logo?: string,
  description?: string
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db
    .update(brands)
    .set({ name, slug, logo, description, updatedAt: new Date() })
    .where(eq(brands.id, id));
}

export async function deleteBrand(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db
    .update(brands)
    .set({ isActive: false, updatedAt: new Date() })
    .where(eq(brands.id, id));
}

// ============ PRODUCTS ============

export async function getAllProducts(limit?: number) {
  const db = await getDb();
  if (!db) return [];

  let query = db
    .select()
    .from(products)
    .where(eq(products.isActive, true))
    .orderBy(desc(products.createdAt)) as any;

  if (limit) {
    query = query.limit(limit);
  }

  return await query;
}

export async function getProductById(id: number) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db
    .select()
    .from(products)
    .where(and(eq(products.id, id), eq(products.isActive, true)))
    .limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function getProductBySlug(slug: string) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db
    .select()
    .from(products)
    .where(and(eq(products.slug, slug), eq(products.isActive, true)))
    .limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function getFeaturedProducts(limit: number = 6) {
  const db = await getDb();
  if (!db) return [];

  return await db
    .select()
    .from(products)
    .where(and(eq(products.isActive, true), eq(products.isFeatured, true)))
    .orderBy(desc(products.createdAt))
    .limit(limit);
}

export async function createProduct(
  name: string,
  slug: string,
  categoryId: number,
  brandId: number,
  description?: string,
  specifications?: string,
  price?: string,
  image?: string
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(products).values({
    name,
    slug,
    categoryId,
    brandId,
    description,
    specifications,
    price: price ? parseFloat(price).toString() : undefined,
    image,
  });

  return result;
}

export async function updateProduct(
  id: number,
  name: string,
  slug: string,
  categoryId: number,
  brandId: number,
  description?: string,
  specifications?: string,
  price?: string,
  image?: string,
  isFeatured?: boolean
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db
    .update(products)
    .set({
      name,
      slug,
      categoryId,
      brandId,
      description,
      specifications,
      price: price ? parseFloat(price).toString() : undefined,
      image,
      isFeatured,
      updatedAt: new Date(),
    })
    .where(eq(products.id, id));
}

export async function deleteProduct(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db
    .update(products)
    .set({ isActive: false, updatedAt: new Date() })
    .where(eq(products.id, id));
}

// ============ SERVICES ============

export async function getAllServices(limit?: number) {
  const db = await getDb();
  if (!db) return [];

  let query = db
    .select()
    .from(services)
    .where(eq(services.isActive, true))
    .orderBy(desc(services.createdAt)) as any;

  if (limit) {
    query = query.limit(limit);
  }

  return await query;
}

export async function getServiceById(id: number) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db
    .select()
    .from(services)
    .where(and(eq(services.id, id), eq(services.isActive, true)))
    .limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function getServiceBySlug(slug: string) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db
    .select()
    .from(services)
    .where(and(eq(services.slug, slug), eq(services.isActive, true)))
    .limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function getFeaturedServices(limit: number = 4) {
  const db = await getDb();
  if (!db) return [];

  return await db
    .select()
    .from(services)
    .where(and(eq(services.isActive, true), eq(services.isFeatured, true)))
    .orderBy(desc(services.createdAt))
    .limit(limit);
}

export async function createService(
  name: string,
  slug: string,
  description?: string,
  icon?: string,
  image?: string,
  features?: string
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(services).values({
    name,
    slug,
    description,
    icon,
    image,
    features,
  });

  return result;
}

export async function updateService(
  id: number,
  name: string,
  slug: string,
  description?: string,
  icon?: string,
  image?: string,
  features?: string,
  isFeatured?: boolean
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db
    .update(services)
    .set({
      name,
      slug,
      description,
      icon,
      image,
      features,
      isFeatured,
      updatedAt: new Date(),
    })
    .where(eq(services.id, id));
}

export async function deleteService(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db
    .update(services)
    .set({ isActive: false, updatedAt: new Date() })
    .where(eq(services.id, id));
}

// ============ QUOTE REQUESTS ============

export async function createQuoteRequest(
  customerName: string,
  customerEmail: string,
  customerPhone: string,
  productId?: number,
  companyName?: string,
  quantity?: number,
  message?: string
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.insert(quoteRequests).values({
    customerName,
    customerEmail,
    customerPhone,
    productId,
    companyName,
    quantity,
    message,
  });

  // Return the created quote
  const created = await db.select().from(quoteRequests)
    .where(eq(quoteRequests.customerEmail, customerEmail))
    .orderBy(quoteRequests.createdAt)
    .limit(1);

  return created[0] || { id: 0, customerName, customerEmail, customerPhone };
}

export async function getAllQuoteRequests() {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(quoteRequests).orderBy(desc(quoteRequests.createdAt));
}

export async function updateQuoteRequestStatus(id: number, status: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db
    .update(quoteRequests)
    .set({ status: status as any, updatedAt: new Date() })
    .where(eq(quoteRequests.id, id));
}

export async function markQuoteAsRead(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db
    .update(quoteRequests)
    .set({ isRead: true, updatedAt: new Date() })
    .where(eq(quoteRequests.id, id));
}

// ============ CONTACT SUBMISSIONS ============

export async function createContactSubmission(
  name: string,
  email: string,
  subject: string,
  message: string,
  phone?: string
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(contactSubmissions).values({
    name,
    email,
    phone,
    subject,
    message,
  });

  return result;
}

export async function getAllContactSubmissions() {
  const db = await getDb();
  if (!db) return [];

  return await db
    .select()
    .from(contactSubmissions)
    .orderBy(desc(contactSubmissions.createdAt));
}

export async function updateContactStatus(id: number, status: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db
    .update(contactSubmissions)
    .set({ status: status as any, updatedAt: new Date() })
    .where(eq(contactSubmissions.id, id));
}

export async function markContactAsRead(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db
    .update(contactSubmissions)
    .set({ isRead: true, updatedAt: new Date() })
    .where(eq(contactSubmissions.id, id));
}

// ============ SUPPORT INQUIRIES ============

export async function createSupportInquiry(
  name: string,
  email: string,
  subject: string,
  message: string,
  phone?: string,
  priority?: string
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(supportInquiries).values({
    name,
    email,
    phone,
    subject,
    message,
    priority: priority as any,
  });

  return result;
}

export async function getAllSupportInquiries() {
  const db = await getDb();
  if (!db) return [];

  return await db
    .select()
    .from(supportInquiries)
    .orderBy(desc(supportInquiries.createdAt));
}

export async function updateSupportStatus(id: number, status: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db
    .update(supportInquiries)
    .set({ status: status as any, updatedAt: new Date() })
    .where(eq(supportInquiries.id, id));
}

export async function markSupportAsRead(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db
    .update(supportInquiries)
    .set({ isRead: true, updatedAt: new Date() })
    .where(eq(supportInquiries.id, id));
}

// ============ EMAIL CONFIG ============

export async function getEmailConfig() {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(emailConfig).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function updateEmailConfig(
  adminEmail: string,
  smtpHost?: string,
  smtpPort?: number,
  smtpUser?: string,
  smtpPassword?: string,
  fromEmail?: string,
  fromName?: string
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const existing = await getEmailConfig();

  if (existing) {
    await db
      .update(emailConfig)
      .set({
        adminEmail,
        smtpHost,
        smtpPort,
        smtpUser,
        smtpPassword,
        fromEmail,
        fromName,
        updatedAt: new Date(),
      })
      .where(eq(emailConfig.id, existing.id));
  } else {
    await db.insert(emailConfig).values({
      adminEmail,
      smtpHost,
      smtpPort,
      smtpUser,
      smtpPassword,
      fromEmail,
      fromName,
    });
  }
}

// ============ SITE SETTINGS ============

export async function getSiteSettings() {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(siteSettings).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function updateSiteSettings(
  siteName?: string,
  siteDescription?: string,
  siteKeywords?: string,
  siteUrl?: string,
  logo?: string,
  favicon?: string,
  phone?: string,
  email?: string,
  address?: string,
  socialLinks?: string
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const existing = await getSiteSettings();

  if (existing) {
    await db
      .update(siteSettings)
      .set({
        siteName,
        siteDescription,
        siteKeywords,
        siteUrl,
        logo,
        favicon,
        phone,
        email,
        address,
        socialLinks,
        updatedAt: new Date(),
      })
      .where(eq(siteSettings.id, existing.id));
  } else {
    await db.insert(siteSettings).values({
      siteName,
      siteDescription,
      siteKeywords,
      siteUrl,
      logo,
      favicon,
      phone,
      email,
      address,
      socialLinks,
    });
  }
}
