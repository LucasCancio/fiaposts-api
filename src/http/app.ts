import fastify from "fastify";
import { teacherRoutes } from "@/http/controllers/teacher/routes";
import { env } from "../env";
import { globalErrorHandler } from "../utils/global-error-handler";
import fastifyJwt from "@fastify/jwt";
import { authRoutes } from "@/http/controllers/auth/routes";
import { postRoutes } from "./controllers/post/routes";
import { categoryRoutes } from "./controllers/category/routes";
import fastifyCookie from "@fastify/cookie";
import swagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";

export const app = fastify();

// Authentication
app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: "access_token",
    signed: false,
  },
  sign: {
    expiresIn: env.JWT_EXPIRATION,
  },
});
app.register(fastifyCookie);

// Routes
app.register(authRoutes);
app.register(teacherRoutes);
app.register(postRoutes);
app.register(categoryRoutes);

// Swagger
app.register(swagger, {
  swagger: {
    info: {
      title: "Test swagger",
      description: "Testing the Fastify swagger API",
      version: "0.1.0",
    },
  },
});
app.register(swaggerUI, {
  routePrefix: "/docs",
  uiConfig: {
    docExpansion: "full",
    deepLinking: false,
  },
  staticCSP: true,
  transformStaticCSP: (header) => header,
  transformSpecification: (swaggerObject, request, reply) => {
    return swaggerObject;
  },
  transformSpecificationClone: true,
});

app.setErrorHandler(globalErrorHandler);

app.ready((err) => {
  if (err) throw err;
  app.swagger();
});
