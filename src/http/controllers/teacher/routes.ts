import { FastifyInstance } from "fastify";
import { createTeacher } from "./create";
import { findTeacherById } from "./find-by-id";
import { updateTeacher } from "./update";
import { getTeachers } from "./get-all";
import { deleteTeacher } from "./delete";
import { verifyJwt } from "@/http/middlewares/verify-jwt";

export async function teacherRoutes(app: FastifyInstance) {
  app.get(
    "/teachers",
    {
      onRequest: [verifyJwt],
      schema: {
        tags: ["Teacher"],
        summary: "Endpoint para buscar todos os professores",
        response: {
          200: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: { type: "number" },
                name: { type: "string" },
                email: { type: "string" },
                created_at: { type: "string", format: "date-time" },
                updated_at: { type: "string", format: "date-time" },
              },
            },
          },
        },
      },
    },
    getTeachers
  );
  app.get(
    "/teachers/:id",
    {
      onRequest: [verifyJwt],
      schema: {
        tags: ["Teacher"],
        summary: "Endpoint para buscar um professor pelo ID",
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
              email: { type: "string" },
              created_at: { type: "string", format: "date-time" },
              updated_at: { type: "string", format: "date-time" },
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
    findTeacherById
  );
  app.post(
    "/teachers",
    {
      schema: {
        tags: ["Teacher"],
        summary: "Endpoint para criar um professor",
        body: {
          type: "object",
          required: ["name", "email"],
          properties: {
            name: { type: "string" },
            email: { type: "string" },
          },
        },
      },
    },
    createTeacher
  );
  app.patch(
    "/teachers/:id",
    {
      onRequest: [verifyJwt],
      schema: {
        tags: ["Teacher"],
        summary: "Endpoint para atualizar um professor",
        params: {
          type: "object",
          properties: {
            id: { type: "number" },
          },
        },
        body: {
          type: "object",
          properties: {
            name: { type: "string" },
            email: { type: "string" },
          },
        },
      },
    },
    updateTeacher
  );
  app.delete(
    "/teachers/:id",
    {
      onRequest: [verifyJwt],
      schema: {
        tags: ["Teacher"],
        summary: "Endpoint para deletar um professor",
        params: {
          type: "object",
          properties: {
            id: { type: "number" },
          },
        },
      },
    },
    deleteTeacher
  );
}
