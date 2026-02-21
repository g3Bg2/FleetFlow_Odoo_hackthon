import { Hono } from "hono";
import * as userController from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import {
  createUserSchema,
  updateUserSchema,
  userParamsSchema,
} from "../validators/user.validator.js";

const userRouter = new Hono();

userRouter.get("/", authMiddleware, userController.getAllUsers);
userRouter.get(
  "/:id",
  authMiddleware,
  validate({ params: userParamsSchema }),
  userController.getUserById
);
userRouter.post("/", validate({ body: createUserSchema }), userController.createUser);
userRouter.put(
  "/:id",
  authMiddleware,
  validate({ params: userParamsSchema, body: updateUserSchema }),
  userController.updateUser
);
userRouter.delete(
  "/:id",
  authMiddleware,
  validate({ params: userParamsSchema }),
  userController.deleteUser
);

export default userRouter;
