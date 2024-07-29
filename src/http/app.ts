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
import { definitions } from "@/utils/swagger-definitions";

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

// Swagger
app.register(swagger, {
  swagger: {
    info: {
      title: "FIAPosts API",
      description: "Plataforma de POSTS da faculdade FIAP",
      version: "1.0.0",
    },
    tags: [
      {
        name: "Auth",
        description: "Endpoints relacionados a autenticação",
      },
      {
        name: "Teacher",
        description: "Endpoints relacionados a professores",
      },
      {
        name: "Post",
        description: "Endpoints relacionados a posts",
      },
      {
        name: "Category",
        description: "Endpoints relacionados a categorias",
      },
    ],
    definitions,
  },
});
app.register(swaggerUI, {
  routePrefix: "/swagger",
  uiConfig: {
    docExpansion: "full",
    deepLinking: false,
  },
  uiHooks: {
    onRequest: function (request, reply, next) {
      next();
    },
    preHandler: function (request, reply, next) {
      next();
    },
  },
  staticCSP: true,
  transformStaticCSP: (header) => header,
  transformSpecification: (swaggerObject, request, reply) => {
    return swaggerObject;
  },
  transformSpecificationClone: true,
});

app.setErrorHandler(globalErrorHandler);

// Routes
app.register(authRoutes);
app.register(teacherRoutes);
app.register(postRoutes);
app.register(categoryRoutes);

app.ready((err) => {
  if (err) throw err;
  app.swagger();
});
