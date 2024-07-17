import { FastifyInstance } from "fastify";
import { createCategory } from "./create";
import { findCategoryById } from "./find-by-id";
import { getCategories } from "./get-all";
import { deleteCategory } from "./delete";
import { getPostsByCategory } from "./get-posts";

export async function categoryRoutes(app: FastifyInstance) {
  app.get("/categories", getCategories);
  app.get("/categories/:id", findCategoryById);
  app.post("/categories", createCategory);
  app.delete("/categories/:id", deleteCategory);
  app.get("/categories/:id/posts", getPostsByCategory);
}
