import { z } from "zod";

export const INQUIRY_TYPES = [
  "Demo Request",
  "General Inquiry",
  "Partnership",
  "Technical Support",
  "Onboarding",
  "Others",
] as const;

export const InquirySchema = z.object({
  fullName: z
    .string()
    .min(2, "Name must be at least 2 characters.")
    .max(100, "Name must be under 100 characters."),

  institution: z
    .string()
    .min(2, "Institution must be at least 2 characters.")
    .max(150, "Institution must be under 150 characters."),

  email: z
    .string()
    .min(1, "Email is required.")
    .email("Please enter a valid email address."),

  // optional — empty string is treated as absent
  phone: z
    .string()
    .regex(/^[+\d\s\-().]{7,20}$/, "Please enter a valid phone number.")
    .optional()
    .or(z.literal("")),

  inquiryType: z.enum(INQUIRY_TYPES),

  message: z
    .string()
    .min(10, "Message must be at least 10 characters.")
    .max(2000, "Message must be under 2000 characters."),
});

export type InquiryPayload = z.infer<typeof InquirySchema>;
export type InquiryFieldErrors = Partial<Record<keyof InquiryPayload, string>>;
