import { z } from "zod";

export const profileSchema = z.object({
  headline: z.string().max(120).optional(),
  bio: z.string().max(1000).optional(),
  city: z.string().max(100).optional(),
  state: z.string().max(50).optional(),
  linkedinUrl: z.string().url().optional().or(z.literal("")),
  pitchVideoUrl: z.string().url().optional().or(z.literal("")),
  availability: z.enum(["PART_TIME", "HALF_TIME", "FULL_TIME"]),
  investmentRange: z.enum(["NONE", "UP_TO_10K", "UP_TO_50K", "ABOVE_50K"]),
});

export const seekingSchema = z.object({
  skills: z.array(
    z.enum(["TECHNOLOGY", "MARKETING", "PRODUCT", "SALES", "OPERATIONS", "FINANCE", "LEGAL", "DESIGN", "OTHER"])
  ),
  availability: z.array(z.enum(["PART_TIME", "HALF_TIME", "FULL_TIME"])),
  investmentRange: z.array(z.enum(["NONE", "UP_TO_10K", "UP_TO_50K", "ABOVE_50K"])),
  businessTypes: z.array(
    z.enum(["SAAS", "MARKETPLACE", "AI", "ECOMMERCE", "AGENCY", "SERVICES", "OTHER"])
  ),
});

export const proposalSchema = z.object({
  partnershipId: z.string(),
  toUserId: z.string(),
  equity: z.number().min(1).max(99),
  role: z.string().min(2).max(50),
  investmentType: z.array(z.enum(["capital", "time", "knowledge"])),
  message: z.string().max(2000).optional(),
});

export const reviewSchema = z.object({
  targetId: z.string(),
  score: z.number().int().min(1).max(5),
  comment: z.string().max(1000).optional(),
  context: z.string().max(100).optional(),
});
