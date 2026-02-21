import type { Context } from "hono";
import * as dashboardService from "../services/dashboard.service.js";

export async function getDashboardStats(c: Context) {
  const stats = await dashboardService.getDashboardStats();
  return c.json(stats);
}
