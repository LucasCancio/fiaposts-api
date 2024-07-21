import { FastifyInstance } from "fastify";
import { createCategory } from "./create";
import { findCategoryById } from "./find-by-id";
import { getCategories } from "./get-all";
import { deleteCategory } from "./delete";
import { getPostsByCategory } from "./get-posts";
import { verifyJwt } from "@/http/middlewares/verify-jwt";

export async function categoryRoutes(app: FastifyInstance) {
  app.get("/categories", getCategories);
  app.get("/categories/:id", findCategoryById);
  app.post("/categories", { onRequest: [verifyJwt] }, createCategory);
  app.delete("/categories/:id", { onRequest: [verifyJwt] }, deleteCategory);
  app.get("/categories/:id/posts", getPostsByCategory);
}
