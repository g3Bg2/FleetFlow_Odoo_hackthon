import { Hono } from "hono";
import * as authController from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { loginSchema, registerSchema } from "../validators/auth.validator.js";

const authRouter = new Hono();

authRouter.post("/login", validate({ body: loginSchema }), authController.login);
authRouter.post("/register", validate({ body: registerSchema }), authController.register);

export default authRouter;
