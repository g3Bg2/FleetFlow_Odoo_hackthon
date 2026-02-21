import { z } from "zod";

export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(255, "Password must be at most 255 characters")
  .regex(/[A-Z]/, "Password must contain at least 1 uppercase letter")
  .regex(/[a-z]/, "Password must contain at least 1 lowercase letter")
  .regex(/[0-9]/, "Password must contain at least 1 number")
  .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least 1 special character");

export const createUserSchema = z.object({
  role_id: z.number().int().positive().optional(),
  username: z.string().min(1).max(100),
  password: passwordSchema,
  full_name: z.string().min(1).max(255),
  email: z.string().email().max(255),
  phone: z.string().max(20).optional(),
});

export const updateUserSchema = z.object({
  role_id: z.number().int().positive().optional(),
  username: z.string().min(1).max(100).optional(),
  password: passwordSchema.optional(),
  full_name: z.string().min(1).max(255).optional(),
  email: z.string().email().max(255).optional(),
  phone: z.string().max(20).optional(),
});

export const userParamsSchema = z.object({
  id: z.string().regex(/^\d+$/).transform(Number),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type UserParams = z.infer<typeof userParamsSchema>;
