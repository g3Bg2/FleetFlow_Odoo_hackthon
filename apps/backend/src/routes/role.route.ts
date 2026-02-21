import { Hono } from "hono";
import * as roleController from "../controllers/role.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import {
  createRoleSchema,
  roleParamsSchema,
  updateRoleSchema,
} from "../validators/role.validator.js";

const roleRouter = new Hono();

roleRouter.get("/", authMiddleware, roleController.getAllRoles);
roleRouter.get(
  "/:id",
  authMiddleware,
  validate({ params: roleParamsSchema }),
  roleController.getRoleById
);
roleRouter.post(
  "/",
  authMiddleware,
  validate({ body: createRoleSchema }),
  roleController.createRole
);
roleRouter.put(
  "/:id",
  authMiddleware,
  validate({ params: roleParamsSchema, body: updateRoleSchema }),
  roleController.updateRole
);
roleRouter.delete(
  "/:id",
  authMiddleware,
  validate({ params: roleParamsSchema }),
  roleController.deleteRole
);

export default roleRouter;
