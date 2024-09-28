import { FastifyInstance } from "fastify";
import { login } from "./login";
import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { profile } from "./profile";
import { logout } from "./logout";

export async function authRoutes(app: FastifyInstance) {
  app.post(
    "/login",
    {
      schema: {
        tags: ["Auth"],
        summary: "Endpoint para realizar o login",
        body: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: { type: "string", format: "email" },
            password: { type: "string" },
          },
        },
        response: {
          200: {
            type: "object",
            properties: {
              token: { type: "string" },
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
    login
  );
  app.get(
    "/profile",
    {
      onRequest: [verifyJwt],
    },
    profile
  );
  app.post("/logout", logout);
}
