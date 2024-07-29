import { z } from "zod";

export const updateSchema = z
  .object({
    password: z.string().min(8).max(255),
    confirmPassword: z.string().min(8).max(255),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // This specifies where the error should appear
  });

export type UpdateSchema = z.infer<typeof updateSchema>;
