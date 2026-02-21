import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(1).max(100),
  password: z.string().min(1),
});

export const registerSchema = z.object({
  username: z.string().min(1).max(100),
  password: z.string().min(8).max(255),
  full_name: z.string().min(1).max(255),
  email: z.string().email().max(255),
  phone: z.string().max(20).optional(),
  role_id: z.number().int().positive().optional(),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
