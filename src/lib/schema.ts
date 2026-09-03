import { z } from "zod";

// Server-side validation for every lead, regardless of entry point.
// The website intentionally avoids collecting highly sensitive information
// such as SSNs, bank credentials, or card details in the public intake.
export const leadSchema = z.object({
  firstName: z.string().trim().min(1).max(80),
  lastName: z.string().trim().min(1).max(80),
  businessName: z.string().trim().min(2).max(120),
  phone: z
    .string()
    .trim()
    .regex(/^[0-9+()\-.\s]{7,20}$/, "Enter a valid phone number"),
  email: z.string().trim().email().max(160),
  state: z.string().trim().min(2).max(56),
  balanceRange: z.enum(["under_25k", "25k_50k", "50k_100k", "100k_250k", "250k_plus"]),
  numberOfMcas: z.enum(["1", "2", "3", "4_plus"]),
  paymentFrequency: z.enum(["daily", "weekly", "other"]),
  monthlyRevenue: z.enum(["under_10k", "10k_25k", "25k_50k", "50k_100k", "over_100k"]),
  consentToContact: z.literal(true, {
    message: "You must consent to be contacted to submit this form",
  }),
  source: z.enum(["form", "chatbot", "quick_modal"]).default("form"),
  intakeContext: z.string().trim().max(300).optional().default(""),
  landingPage: z.string().trim().max(500).optional().default(""),
  // Honeypot: real users never fill this in. The route silently swallows
  // submissions where this field is non-empty so bots get no feedback.
  companyWebsite: z.string().max(200).optional().default(""),
});

export type Lead = z.infer<typeof leadSchema>;

export const quickLeadSchema = z.object({
  firstName: z.string().trim().min(1).max(80),
  phone: z
    .string()
    .trim()
    .regex(/^[0-9+()\-.\s]{7,20}$/, "Enter a valid phone number"),
  businessName: z.string().trim().min(2).max(120),
  consentToContact: z.literal(true, {
    message: "You must consent to be contacted to submit this form",
  }),
  source: z.literal("quick_modal").default("quick_modal"),
  landingPage: z.string().trim().max(500).optional().default(""),
  companyWebsite: z.string().max(200).optional().default(""),
});

export type QuickLead = z.infer<typeof quickLeadSchema>;
