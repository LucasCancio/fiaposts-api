import { FastifyInstance } from "fastify";
import { createCategory } from "./create";
import { findCategoryById } from "./find-by-id";
import { getCategories } from "./get-all";
import { deleteCategory } from "./delete";
import { getPostsByCategory } from "./get-posts";
import { verifyJwt } from "@/http/middlewares/verify-jwt";

export async function categoryRoutes(app: FastifyInstance) {
  app.get(
    "/categories",
    {
      schema: {
        tags: ["Category"],
        summary: "Endpoint para buscar todas as categorias",
        response: {
          200: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: { type: "number" },
                name: { type: "string" },
              },
            },
          },
        },
      },
    },
    getCategories
  );
  app.get(
    "/categories/:id",
    {
      schema: {
        tags: ["Category"],
        summary: "Endpoint para buscar uma categoria pelo ID",
        params: {
          type: "object",
          properties: {
            id: { type: "number" },
          },
        },
        response: {
          200: {
            type: "object",
            properties: {
              id: { type: "number" },
              name: { type: "string" },
            },
          },
          404: {
            type: "object",
            properties: {
              message: { type: "string" },
            },
          },
        },
      },
    },
    findCategoryById
  );
  app.post(
    "/categories",
    {
      onRequest: [verifyJwt],
      schema: {
        tags: ["Category"],
        summary: "Endpoint para criar uma categoria",
        body: {
          type: "object",
          required: ["name"],
          properties: {
            name: { type: "string" },
          },
        },
        response: {
          201: {
            type: "object",
            properties: {
              id: { type: "number" },
              name: { type: "string" },
            },
          },
          400: {
            type: "object",
            properties: {
              message: { type: "string" },
            },
          },
        },
      },
    },
    createCategory
  );
  app.delete(
    "/categories/:id",
    {
      onRequest: [verifyJwt],
      schema: {
        tags: ["Category"],
        summary: "Endpoint para deletar uma categoria",
        params: {
          type: "object",
          properties: {
            id: { type: "number" },
          },
        },
        response: {
          204: {
            type: "object",
          },
          404: {
            type: "object",
            properties: {
              message: { type: "string" },
            },
          },
        },
      },
    },
    deleteCategory
  );
  app.get(
    "/categories/:id/posts",
    {
      schema: {
        tags: ["Category"],
        summary: "Endpoint para buscar todos os posts de uma categoria",
        params: {
          type: "object",
          properties: {
            id: { type: "number", description: "Id da categoria" },
          },
        },
        response: {
          200: {
            type: "array",
            items: {
              type: "object",
            },
          },
          404: {
            type: "object",
            properties: {
              message: { type: "string" },
            },
          },
        },
      },
    },
    getPostsByCategory
  );
}
