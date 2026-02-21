import { Hono } from "hono";
import * as userController from "../controllers/user.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import {
  createUserSchema,
  updateUserSchema,
  userParamsSchema,
} from "../validators/user.validator.js";

const userRouter = new Hono();

userRouter.get("/", userController.getAllUsers);
userRouter.get("/:id", validate({ params: userParamsSchema }), userController.getUserById);
userRouter.post("/", validate({ body: createUserSchema }), userController.createUser);
userRouter.put(
  "/:id",
  validate({ params: userParamsSchema, body: updateUserSchema }),
  userController.updateUser
);
userRouter.delete("/:id", validate({ params: userParamsSchema }), userController.deleteUser);

export default userRouter;
