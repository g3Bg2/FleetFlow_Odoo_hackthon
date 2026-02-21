import { z } from "zod";

export const vehicleStatusSchema = z.enum(["available", "on_trip", "in_shop", "retired"]);

export const createVehicleSchema = z.object({
  name_model: z.string().min(1).max(100),
  license_plate: z.string().min(1).max(20),
  max_capacity: z.string().regex(/^\d+(\.\d{1,2})?$/),
  current_odometer: z.number().int().nonnegative(),
  status: vehicleStatusSchema.optional(),
  acquisition_cost: z.string().regex(/^\d+(\.\d{1,2})?$/),
});

export const updateVehicleSchema = createVehicleSchema.partial();

export const vehicleParamsSchema = z.object({
  id: z.string().regex(/^\d+$/).transform(Number),
});

export type CreateVehicleInput = z.infer<typeof createVehicleSchema>;
export type UpdateVehicleInput = z.infer<typeof updateVehicleSchema>;
export type VehicleParams = z.infer<typeof vehicleParamsSchema>;
