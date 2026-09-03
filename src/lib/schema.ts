import { z } from "zod";

const phoneSchema = z
  .string()
  .trim()
  .regex(/^[0-9+()\-.\s]{7,20}$/, "Enter a valid phone number");

const optionalEmail = z.union([z.string().trim().email().max(160), z.literal("")]).default("");

export const leadSchema = z.object({
  // Name + phone are the only required lead-contact fields.
  firstName: z.string().trim().min(1).max(80),
  phone: phoneSchema,
  lastName: z.string().trim().max(80).optional().default(""),
  businessName: z.string().trim().max(120).optional().default(""),
  email: optionalEmail,
  state: z.string().trim().max(56).optional().default(""),
  balanceRange: z.enum(["under_25k", "25k_50k", "50k_100k", "100k_250k", "250k_plus"]).or(z.literal("")).default(""),
  numberOfMcas: z.enum(["1", "2", "3", "4_plus"]).or(z.literal("")).default(""),
  paymentFrequency: z.enum(["daily", "weekly", "other"]).or(z.literal("")).default(""),
  monthlyRevenue: z.enum(["under_10k", "10k_25k", "25k_50k", "50k_100k", "over_100k"]).or(z.literal("")).default(""),
  consentToContact: z.literal(true, {
    message: "You must consent to be contacted to submit this form",
  }),
  source: z.enum(["form", "chatbot", "quick_modal"]).default("form"),
  intakeContext: z.string().trim().max(300).optional().default(""),
  landingPage: z.string().trim().max(500).optional().default(""),
  companyWebsite: z.string().max(200).optional().default(""),
});

export type Lead = z.infer<typeof leadSchema>;

export const quickLeadSchema = z.object({
  firstName: z.string().trim().min(1).max(80),
  phone: phoneSchema,
  businessName: z.string().trim().max(120).optional().default(""),
  consentToContact: z.literal(true, {
    message: "You must consent to be contacted to submit this form",
  }),
  source: z.literal("quick_modal").default("quick_modal"),
  landingPage: z.string().trim().max(500).optional().default(""),
  companyWebsite: z.string().max(200).optional().default(""),
});

export type QuickLead = z.infer<typeof quickLeadSchema>;
