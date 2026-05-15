import { z } from "zod";

export const checkoutSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  address: z.string().min(5, "Shipping address is required"),
  phone: z.string().regex(/^\d{10,11}$/, "Invalid phone number"),
});

export type CheckoutInput = z.infer<typeof checkoutSchema>;
