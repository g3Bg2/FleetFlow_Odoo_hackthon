import { z } from "zod";

export const createMaintenanceLogSchema = z.object({
  vehicle_id: z.number().int().positive(),
  service_type: z.string().min(1).max(255),
  cost: z.string().regex(/^\d+(\.\d{1,2})?$/),
  service_date: z.string().transform((val) => new Date(val)),
});

export const updateMaintenanceLogSchema = createMaintenanceLogSchema.partial();

export const maintenanceLogParamsSchema = z.object({
  id: z.string().regex(/^\d+$/).transform(Number),
});

export type CreateMaintenanceLogInput = z.infer<typeof createMaintenanceLogSchema>;
export type UpdateMaintenanceLogInput = z.infer<typeof updateMaintenanceLogSchema>;
export type MaintenanceLogParams = z.infer<typeof maintenanceLogParamsSchema>;
