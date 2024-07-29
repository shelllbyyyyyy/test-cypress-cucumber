import { z } from "zod";

export const registerSchema = z
  .object({
    name: z.string().min(4).max(50),
    email: z.string().email(),
    password: z.string().min(6).max(255),
    confirmPassword: z.string().min(6).max(255),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // This specifies where the error should appear
  });

export type RegisterSchema = z.infer<typeof registerSchema>;
