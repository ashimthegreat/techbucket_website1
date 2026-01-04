import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import * as bcrypt from "bcryptjs";
import * as db from "./db";
import { TRPCError } from "@trpc/server";
import * as email from "./email";

// ============ ADMIN AUTHENTICATION ============

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // ============ ADMIN PANEL AUTHENTICATION ============
  admin: router({
    login: publicProcedure
      .input(
        z.object({
          username: z.string().min(1),
          password: z.string().min(1),
        })
      )
      .mutation(async ({ input }) => {
        const admin = await db.getAdminByUsername(input.username);

        if (!admin) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "Invalid credentials",
          });
        }

        const passwordMatch = await bcrypt.compare(input.password, admin.passwordHash);

        if (!passwordMatch) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "Invalid credentials",
          });
        }

        if (!admin.isActive) {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "Admin account is inactive",
          });
        }

        await db.updateAdminLastLogin(admin.id);

        return {
          success: true,
          adminId: admin.id,
          username: admin.username,
          email: admin.email,
        };
      }),

    changePassword: publicProcedure
      .input(
        z.object({
          adminId: z.number(),
          currentPassword: z.string(),
          newPassword: z.string().min(6),
        })
      )
      .mutation(async ({ input }) => {
        const admin = await db.getAdminByUsername("");
        if (!admin) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Admin not found",
          });
        }

        const passwordMatch = await bcrypt.compare(input.currentPassword, admin.passwordHash);
        if (!passwordMatch) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "Current password is incorrect",
          });
        }

        const hashedPassword = await bcrypt.hash(input.newPassword, 10);
        await db.updateAdminPassword(input.adminId, hashedPassword);

        return { success: true };
      }),
  }),

  // ============ CATEGORIES ============
  categories: router({
    list: publicProcedure.query(async () => {
      return await db.getAllCategories();
    }),

    get: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return await db.getCategoryById(input.id);
      }),

    create: publicProcedure
      .input(
        z.object({
          name: z.string().min(1),
          slug: z.string().min(1),
          description: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        return await db.createCategory(input.name, input.slug, input.description);
      }),

    update: publicProcedure
      .input(
        z.object({
          id: z.number(),
          name: z.string().min(1),
          slug: z.string().min(1),
          description: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        await db.updateCategory(input.id, input.name, input.slug, input.description);
        return { success: true };
      }),

    delete: publicProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await db.deleteCategory(input.id);
        return { success: true };
      }),
  }),

  // ============ BRANDS ============
  brands: router({
    list: publicProcedure.query(async () => {
      return await db.getAllBrands();
    }),

    get: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return await db.getBrandById(input.id);
      }),

    create: publicProcedure
      .input(
        z.object({
          name: z.string().min(1),
          slug: z.string().min(1),
          logo: z.string().optional(),
          description: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        return await db.createBrand(input.name, input.slug, input.logo, input.description);
      }),

    update: publicProcedure
      .input(
        z.object({
          id: z.number(),
          name: z.string().min(1),
          slug: z.string().min(1),
          logo: z.string().optional(),
          description: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        await db.updateBrand(input.id, input.name, input.slug, input.logo, input.description);
        return { success: true };
      }),

    delete: publicProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await db.deleteBrand(input.id);
        return { success: true };
      }),
  }),

  // ============ PRODUCTS ============
  products: router({
    list: publicProcedure.query(async () => {
      return await db.getAllProducts();
    }),

    featured: publicProcedure.query(async () => {
      return await db.getFeaturedProducts(6);
    }),

    get: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return await db.getProductById(input.id);
      }),

    getBySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => {
        return await db.getProductBySlug(input.slug);
      }),

    create: publicProcedure
      .input(
        z.object({
          name: z.string().min(1),
          slug: z.string().min(1),
          categoryId: z.number(),
          brandId: z.number(),
          description: z.string().optional(),
          specifications: z.string().optional(),
          price: z.string().optional(),
          image: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        return await db.createProduct(
          input.name,
          input.slug,
          input.categoryId,
          input.brandId,
          input.description,
          input.specifications,
          input.price,
          input.image
        );
      }),

    update: publicProcedure
      .input(
        z.object({
          id: z.number(),
          name: z.string().min(1),
          slug: z.string().min(1),
          categoryId: z.number(),
          brandId: z.number(),
          description: z.string().optional(),
          specifications: z.string().optional(),
          price: z.string().optional(),
          image: z.string().optional(),
          isFeatured: z.boolean().optional(),
        })
      )
      .mutation(async ({ input }) => {
        await db.updateProduct(
          input.id,
          input.name,
          input.slug,
          input.categoryId,
          input.brandId,
          input.description,
          input.specifications,
          input.price,
          input.image,
          input.isFeatured
        );
        return { success: true };
      }),

    delete: publicProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await db.deleteProduct(input.id);
        return { success: true };
      }),
  }),

  // ============ SERVICES ============
  services: router({
    list: publicProcedure.query(async () => {
      return await db.getAllServices();
    }),

    featured: publicProcedure.query(async () => {
      return await db.getFeaturedServices(4);
    }),

    get: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return await db.getServiceById(input.id);
      }),

    getBySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => {
        return await db.getServiceBySlug(input.slug);
      }),

    create: publicProcedure
      .input(
        z.object({
          name: z.string().min(1),
          slug: z.string().min(1),
          description: z.string().optional(),
          icon: z.string().optional(),
          image: z.string().optional(),
          features: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        return await db.createService(
          input.name,
          input.slug,
          input.description,
          input.icon,
          input.image,
          input.features
        );
      }),

    update: publicProcedure
      .input(
        z.object({
          id: z.number(),
          name: z.string().min(1),
          slug: z.string().min(1),
          description: z.string().optional(),
          icon: z.string().optional(),
          image: z.string().optional(),
          features: z.string().optional(),
          isFeatured: z.boolean().optional(),
        })
      )
      .mutation(async ({ input }) => {
        await db.updateService(
          input.id,
          input.name,
          input.slug,
          input.description,
          input.icon,
          input.image,
          input.features,
          input.isFeatured
        );
        return { success: true };
      }),

    delete: publicProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await db.deleteService(input.id);
        return { success: true };
      }),
  }),

  // ============ QUOTE REQUESTS ============
  quotes: router({
    list: publicProcedure.query(async () => {
      return await db.getAllQuoteRequests();
    }),

    create: publicProcedure
      .input(
        z.object({
          customerName: z.string().min(1),
          customerEmail: z.string().email(),
          customerPhone: z.string().min(1),
          productId: z.number().optional(),
          companyName: z.string().optional(),
          quantity: z.number().optional(),
          message: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        const quote = await db.createQuoteRequest(
          input.customerName,
          input.customerEmail,
          input.customerPhone,
          input.productId,
          input.companyName,
          input.quantity,
          input.message
        );

        // Send email notification to admin
        try {
          const product = input.productId ? await db.getProductById(input.productId) : null;
          await email.sendQuoteNotification({
            id: quote.id,
            customerName: input.customerName,
            customerEmail: input.customerEmail,
            customerPhone: input.customerPhone,
            productName: product?.name,
            companyName: input.companyName,
            quantity: input.quantity,
            message: input.message,
          });
        } catch (err) {
          console.error("Failed to send quote notification:", err);
        }

        return quote;
      }),

    updateStatus: publicProcedure
      .input(
        z.object({
          id: z.number(),
          status: z.enum(["pending", "reviewed", "responded", "archived"]),
        })
      )
      .mutation(async ({ input }) => {
        await db.updateQuoteRequestStatus(input.id, input.status);
        return { success: true };
      }),

    markAsRead: publicProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await db.markQuoteAsRead(input.id);
        return { success: true };
      }),
  }),

  // ============ CONTACT SUBMISSIONS ============
  contacts: router({
    list: publicProcedure.query(async () => {
      return await db.getAllContactSubmissions();
    }),

    create: publicProcedure
      .input(
        z.object({
          name: z.string().min(1),
          email: z.string().email(),
          phone: z.string().optional(),
          subject: z.string().min(1),
          message: z.string().min(1),
        })
      )
      .mutation(async ({ input }) => {
        return await db.createContactSubmission(
          input.name,
          input.email,
          input.subject,
          input.message,
          input.phone
        );
      }),

    updateStatus: publicProcedure
      .input(
        z.object({
          id: z.number(),
          status: z.enum(["new", "read", "responded", "archived"]),
        })
      )
      .mutation(async ({ input }) => {
        await db.updateContactStatus(input.id, input.status);
        return { success: true };
      }),

    markAsRead: publicProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await db.markContactAsRead(input.id);
        return { success: true };
      }),
  }),

  // ============ SUPPORT INQUIRIES ============
  support: router({
    list: publicProcedure.query(async () => {
      return await db.getAllSupportInquiries();
    }),

    create: publicProcedure
      .input(
        z.object({
          name: z.string().min(1),
          email: z.string().email(),
          phone: z.string().optional(),
          subject: z.string().min(1),
          message: z.string().min(1),
          priority: z.enum(["low", "medium", "high"]).optional(),
        })
      )
      .mutation(async ({ input }) => {
        return await db.createSupportInquiry(
          input.name,
          input.email,
          input.subject,
          input.message,
          input.phone,
          input.priority
        );
      }),

    updateStatus: publicProcedure
      .input(
        z.object({
          id: z.number(),
          status: z.enum(["open", "in_progress", "resolved", "closed"]),
        })
      )
      .mutation(async ({ input }) => {
        await db.updateSupportStatus(input.id, input.status);
        return { success: true };
      }),

    markAsRead: publicProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await db.markSupportAsRead(input.id);
        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
