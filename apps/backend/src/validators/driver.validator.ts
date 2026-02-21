import { z } from "zod";

export const driverStatusSchema = z.enum(["on_duty", "off_duty", "suspended", "on_trip"]);

export const createDriverSchema = z.object({
  full_name: z.string().min(1).max(100),
  license_category: z.string().min(1).max(50),
  license_expiry: z.string().transform((val) => new Date(val)),
  safety_score: z.string().regex(/^\d+(\.\d{1,2})?$/),
  status: driverStatusSchema.optional(),
});

export const updateDriverSchema = createDriverSchema.partial();

export const driverParamsSchema = z.object({
  id: z.string().regex(/^\d+$/).transform(Number),
});

export type CreateDriverInput = z.infer<typeof createDriverSchema>;
export type UpdateDriverInput = z.infer<typeof updateDriverSchema>;
export type DriverParams = z.infer<typeof driverParamsSchema>;
