import { Hono } from "hono";
import * as roleController from "../controllers/role.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import {
  createRoleSchema,
  roleParamsSchema,
  updateRoleSchema,
} from "../validators/role.validator.js";

const roleRouter = new Hono();

roleRouter.get("/", roleController.getAllRoles);
roleRouter.get("/:id", validate({ params: roleParamsSchema }), roleController.getRoleById);
roleRouter.post("/", validate({ body: createRoleSchema }), roleController.createRole);
roleRouter.put(
  "/:id",
  validate({ params: roleParamsSchema, body: updateRoleSchema }),
  roleController.updateRole
);
roleRouter.delete("/:id", validate({ params: roleParamsSchema }), roleController.deleteRole);

export default roleRouter;
