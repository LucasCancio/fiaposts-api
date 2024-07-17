import fastify from "fastify";
import { teacherRoutes } from "@/http/controllers/teacher/routes";
import { env } from "../env";
import { globalErrorHandler } from "../utils/global-error-handler";
import fastifyJwt from "@fastify/jwt";
import { validateCookie } from "./middlewares/cookie-validate";
import { authRoutes } from "@/http/controllers/auth/routes";
import { postRoutes } from "./controllers/post/routes";
import { categoryRoutes } from "./controllers/category/routes";
import fCookie from "@fastify/cookie";

export const app = fastify();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  sign: { expiresIn: env.JWT_EXPIRATION },
});

app.addHook("preHandler", (request, reply, next) => {
  request.jwt = app.jwt;
  validateCookie(request, reply);
  return next();
});

app.register(fCookie, {
  secret: env.JWT_SECRET,
  hook: "onRequest",
});

app.register(authRoutes);
app.register(teacherRoutes);
app.register(postRoutes);
app.register(categoryRoutes);

app.setErrorHandler(globalErrorHandler);
