import { FastifyInstance } from "fastify";
import { createPost } from "./create";
import { findPostById } from "./find-by-id";
import { updatePost } from "./update";
import { getPosts } from "./get-all";
import { deletePost } from "./delete";
import { searchPosts } from "./search";

export async function postRoutes(app: FastifyInstance) {
  app.get("/posts", getPosts);
  app.get("/posts/:id", findPostById);
  app.post("/posts", createPost);
  app.patch("/posts/:id", updatePost);
  app.delete("/posts/:id", deletePost);
  app.get("/posts/search", searchPosts);
  //app.get("/posts/admin", ?);//TODO: Fazer
}
