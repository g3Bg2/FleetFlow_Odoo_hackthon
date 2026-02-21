import { db, todos } from "@repo/db";
import { Hono } from "hono";
import { eq } from "drizzle-orm";

const todoRouter = new Hono();

todoRouter.post("/", async (c) => {
  try {
    const { task, dueDate, userId } = await c.req.json();

    const validatedUserId = Number(userId);
    const validatedDueDate = new Date(dueDate);

    const [todo] = await db
      .insert(todos)
      .values({
        task,
        dueDate: validatedDueDate,
        userId: validatedUserId,
      })
      .returning();

    return c.json(
      {
        task,
        dueDate,
        id: todo.id.toString(),
        userId,
      },
      201,
    );
  } catch (error) {
    const errorMsg =
      error instanceof Error
        ? `Error in creating todo: ${error.message}`
        : `Unknown error in creating todo.`;
    throw new Error(errorMsg);
  }
});

todoRouter.get("/:userId", async (c) => {
  try {
    const userId = Number(c.req.param("userId"));

    const todosResult = await db
      .select()
      .from(todos)
      .where(eq(todos.userId, userId));

    const todosSuitableForJson = todosResult.map((todo) => ({
      ...todo,
      id: todo.id.toString(),
      userId: todo.userId.toString(),
    }));

    return c.json(todosSuitableForJson, 200);
  } catch (error) {
    const errorMsg =
      error instanceof Error
        ? `Error in fetching todos: ${error.message}`
        : `Unknown error in fetching todos.`;
    throw new Error(errorMsg);
  }
});

todoRouter.put("/:id", async (c) => {
  try {
    const { task, dueDate } = await c.req.json();
    const validatedDueDate = new Date(dueDate);
    const id = Number(c.req.param("id"));

    const [todo] = await db
      .update(todos)
      .set({ task, dueDate: validatedDueDate })
      .where(eq(todos.id, id))
      .returning();

    return c.json(
      {
        task,
        id: id.toString(),
        userId: todo.userId.toString(),
        dueDate,
      },
      200,
    );
  } catch (error) {
    const errorMsg =
      error instanceof Error
        ? `Error in updating todo: ${error.message}`
        : `Unknown error in updating todo.`;
    throw new Error(errorMsg);
  }
});

todoRouter.delete("/:id", async (c) => {
  try {
    const id = Number(c.req.param("id"));

    await db.delete(todos).where(eq(todos.id, id));

    return c.text(`Successfully deleted todo with id ${id.toString()}`, 200);
  } catch (error) {
    const errorMsg =
      error instanceof Error
        ? `Error in deleting todo: ${error.message}`
        : `Unknown error in deleting todo.`;
    throw new Error(errorMsg);
  }
});

export default todoRouter;
