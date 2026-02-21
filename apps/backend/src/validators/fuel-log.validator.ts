import { z } from "zod";

export const createFuelLogSchema = z.object({
  vehicle_id: z.number().int().positive(),
  trip_id: z.number().int().positive().optional(),
  liters: z.string().regex(/^\d+(\.\d{1,2})?$/),
  cost: z.string().regex(/^\d+(\.\d{1,2})?$/),
  log_date: z.string().transform((val) => new Date(val)),
});

export const updateFuelLogSchema = createFuelLogSchema.partial();

export const fuelLogParamsSchema = z.object({
  id: z.string().regex(/^\d+$/).transform(Number),
});

export type CreateFuelLogInput = z.infer<typeof createFuelLogSchema>;
export type UpdateFuelLogInput = z.infer<typeof updateFuelLogSchema>;
export type FuelLogParams = z.infer<typeof fuelLogParamsSchema>;
