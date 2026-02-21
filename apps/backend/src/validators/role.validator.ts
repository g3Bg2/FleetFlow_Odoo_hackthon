import { z } from "zod";

export const createRoleSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().max(255).optional(),
});

export const updateRoleSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  description: z.string().max(255).optional(),
});

export const roleParamsSchema = z.object({
  id: z.string().regex(/^\d+$/).transform(Number),
});

export type CreateRoleInput = z.infer<typeof createRoleSchema>;
export type UpdateRoleInput = z.infer<typeof updateRoleSchema>;
export type RoleParams = z.infer<typeof roleParamsSchema>;
