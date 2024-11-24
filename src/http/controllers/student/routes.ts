import { FastifyInstance } from "fastify";
import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { getStudents } from "./get-all";
import { findStudentById } from "./find-by-id";
import { createStudent } from "./create";
import { updateStudent } from "./update";
import { deleteStudent } from "./delete";

export async function studentRoutes(app: FastifyInstance) {
  app.get(
    "/students",
    {
      onRequest: [verifyJwt],
      schema: {
        tags: ["Student"],
        summary: "Endpoint para buscar todos os alunos",
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
    getStudents
  );
  app.get(
    "/students/:id",
    {
      onRequest: [verifyJwt],
      schema: {
        tags: ["Student"],
        summary: "Endpoint para buscar um aluno pelo ID",
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
    findStudentById
  );
  app.post(
    "/students",
    {
      schema: {
        tags: ["Student"],
        summary: "Endpoint para criar um aluno",
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
    createStudent
  );
  app.patch(
    "/students/:id",
    {
      onRequest: [verifyJwt],
      schema: {
        tags: ["Student"],
        summary: "Endpoint para atualizar um aluno",
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
    updateStudent
  );
  app.delete(
    "/students/:id",
    {
      onRequest: [verifyJwt],
      schema: {
        tags: ["Studant"],
        summary: "Endpoint para deletar um aluno",
        params: {
          type: "object",
          properties: {
            id: { type: "number" },
          },
        },
      },
    },
    deleteStudent
  );
}
