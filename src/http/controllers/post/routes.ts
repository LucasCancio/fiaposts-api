import { FastifyInstance } from "fastify";
import { createPost } from "./create";
import { findPostById } from "./find-by-id";
import { updatePost } from "./update";
import { getPosts } from "./get-all";
import { deletePost } from "./delete";
import { searchPosts } from "./search";
import { getAdminPosts } from "./admin";
import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { myPosts } from "./my-posts";

export async function postRoutes(app: FastifyInstance) {
  app.get(
    "/posts",
    {
      schema: {
        tags: ["Post"],
        summary: "Endpoint para buscar todos os posts",
        response: {
          200: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: { type: "string" },
                title: { type: "string" },
                content: { type: "string" },
                createdAt: { type: "string", format: "date-time" },
                updatedAt: { type: "string", format: "date-time" },
              },
            },
          },
        },
      },
    },
    getPosts
  );
  app.get(
    "/posts/:id",
    {
      schema: {
        tags: ["Post"],
        summary: "Endpoint para buscar um post pelo ID",
      },
    },
    findPostById
  );
  app.post(
    "/posts",
    {
      onRequest: [verifyJwt],
      schema: {
        tags: ["Post"],
        summary: "Endpoint para criar um post",
        body: {
          type: "object",
          required: ["title", "content"],
          properties: {
            title: { type: "string" },
            content: { type: "string" },
          },
        },
      },
    },
    createPost
  );
  app.patch(
    "/posts/:id",
    {
      onRequest: [verifyJwt],
      schema: {
        tags: ["Post"],
        summary: "Endpoint para atualizar um post",
        params: {
          type: "object",
          properties: {
            id: { type: "string" },
          },
        },
        body: {
          type: "object",
          properties: {
            title: { type: "string" },
            content: { type: "string" },
          },
        },
      },
    },
    updatePost
  );
  app.delete(
    "/posts/:id",
    {
      onRequest: [verifyJwt],
      schema: {
        tags: ["Post"],
        summary: "Endpoint para deletar um post",
        params: {
          type: "object",
          properties: {
            id: { type: "string" },
          },
        },
      },
    },
    deletePost
  );
  app.get(
    "/posts/search",
    {
      schema: {
        tags: ["Post"],
        summary: "Endpoint para filtrar posts, contendo paginação e ordenação",
        querystring: {
          type: "object",
          properties: {
            title: { type: "string" },
            content: { type: "string" },
          },
        },
      },
    },
    searchPosts
  );
  app.get(
    "/posts/my-posts",
    {
      onRequest: [verifyJwt],
    },
    myPosts
  );
  app.get(
    "/posts/admin",
    {
      onRequest: [verifyJwt],
      schema: {
        tags: ["Post"],
        summary:
          "Endpoint para buscar todos os posts com informações adicionais",
        response: {
          200: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: { type: "string" },
                title: { type: "string" },
                content: { type: "string" },
                createdAt: { type: "string", format: "date-time" },
                updatedAt: { type: "string", format: "date-time" },
              },
            },
          },
        },
      },
    },
    getAdminPosts
  );
}
