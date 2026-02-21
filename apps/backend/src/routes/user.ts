import { db, users } from "@repo/db";
import { Hono } from "hono";

const userRouter = new Hono();

userRouter.post("/", async (c, _next) => {
  try {
    const { name } = await c.req.json();
    const [user] = await db.insert(users).values({ name }).returning();
    return c.json(
      {
        id: user.id.toString(),
        name: user.name,
      },
      200
    );
  } catch (error) {
    const errorMsg =
      error instanceof Error
        ? `error in creating user: ${error.message}`
        : `unknown error in creating user.`;
    throw new Error(errorMsg);
  }
});

userRouter.get("/", async (c, _next) => {
  try {
    const usersResult = await db.select().from(users);
    const usersWithIdAsString = usersResult.map((user) => ({
      id: user.id.toString(),
      name: user.name,
    }));
    return c.json(usersWithIdAsString, 200);
  } catch (error) {
    const errorMsg =
      error instanceof Error
        ? `error in creating user: ${error.message}`
        : `unknown error in creating user.`;
    throw new Error(errorMsg);
  }
});

export default userRouter;
