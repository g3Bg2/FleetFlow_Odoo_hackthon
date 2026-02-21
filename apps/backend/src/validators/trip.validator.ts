import { z } from "zod";

export const tripStatusSchema = z.enum(["draft", "dispatched", "completed", "cancelled"]);

export const createTripSchema = z.object({
  vehicle_id: z.number().int().positive(),
  driver_id: z.number().int().positive(),
  cargo_weight: z.string().regex(/^\d+(\.\d{1,2})?$/),
  start_odometer: z.number().int().nonnegative(),
  end_odometer: z.number().int().nonnegative().optional(),
  status: tripStatusSchema.optional(),
  revenue: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/)
    .optional(),
});

export const updateTripSchema = createTripSchema.partial();

export const tripParamsSchema = z.object({
  id: z.string().regex(/^\d+$/).transform(Number),
});

export type CreateTripInput = z.infer<typeof createTripSchema>;
export type UpdateTripInput = z.infer<typeof updateTripSchema>;
export type TripParams = z.infer<typeof tripParamsSchema>;
