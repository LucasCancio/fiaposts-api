import { AuthenticationRequiredError } from "@/errors/authentication-required-error";
import { FastifyJWT } from "@fastify/jwt";
import { FastifyReply, FastifyRequest } from "fastify";

const publicRoutes = [
  "POST-/login",
  "POST-/teachers",
  "GET-/posts",
  "GET-/posts/:id",
  "GET-/posts/search",
  "GET-/categories",
  "GET-/categories/:id",
  "GET-/categories/:id/posts",
];

export async function validateCookie(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const route = `${request.method}-${request.routeOptions.url}`;
    if (publicRoutes.includes(route)) return;

    const token = request.cookies.access_token;
    if (!token) throw new AuthenticationRequiredError();

    const decoded = request.jwt.verify<FastifyJWT["user"]>(token);
    request.user = decoded;
  } catch (error) {
    console.error(error);
    reply.status(401).send({ message: "Unauthorized" });
  }
}
