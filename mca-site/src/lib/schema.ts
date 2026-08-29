import { z } from "zod";

// Server-side validation for every lead, regardless of whether it came from
// the static form or the chatbot. Never trust client-side validation alone,
// this is what actually stops garbage/malicious payloads from reaching the DB.
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
  source: z.enum(["form", "chatbot"]).default("form"),
  // Honeypot field: real users never fill this in (it's visually hidden).
  // Deliberately NOT constrained to empty here: if it were, a bot-filled
  // value would fail validation with a 400, telling the bot its
  // submission was rejected. Instead we accept any string at the schema
  // level and let the route handler silently swallow non-empty values
  // (see /api/lead) so the bot thinks it succeeded.
  companyWebsite: z.string().max(200).optional().default(""),
});

export type Lead = z.infer<typeof leadSchema>;

export const chatMessageSchema = z.object({
  message: z.string().trim().min(1).max(2000),
  conversationId: z.string().uuid(),
});
