import { FastifyInstance } from "fastify";
import { createPost } from "./create";
import { findPostById } from "./find-by-id";
import { updatePost } from "./update";
import { getPosts } from "./get-all";
import { deletePost } from "./delete";
import { searchPosts } from "./search";
import { getAdminPosts } from "./admin";
import { verifyJwt } from "@/http/middlewares/verify-jwt";

export async function postRoutes(app: FastifyInstance) {
  app.get("/posts", getPosts);
  app.get("/posts/:id", findPostById);
  app.post("/posts", { onRequest: [verifyJwt] }, createPost);
  app.patch("/posts/:id", { onRequest: [verifyJwt] }, updatePost);
  app.delete("/posts/:id", { onRequest: [verifyJwt] }, deletePost);
  app.get("/posts/search", searchPosts);
  app.get("/posts/admin", { onRequest: [verifyJwt] }, getAdminPosts);
}
