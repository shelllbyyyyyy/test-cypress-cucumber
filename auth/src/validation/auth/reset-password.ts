import { z } from "zod";

export const resetSchema = z.object({
  email: z.string().email(),
});

export type ResetSchema = z.infer<typeof resetSchema>;
