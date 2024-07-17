import { env } from "@/env";
import { FastifyReply, FastifyRequest } from "fastify";
import { ZodError } from "zod";

interface ErrorHandlerMap {
  [key: string]: (
    error: Error | ZodError,
    request: FastifyRequest,
    reply: FastifyReply
  ) => void;
}

export const errorHandlerMap: ErrorHandlerMap = {
  ZodError: (error, _, reply) => {
    return reply.status(400).send({
      message: "Validation error",
      ...(error instanceof ZodError && { error: error.format() }),
    });
  },
  ResourceNotFoundError: (error, _, reply) => {
    return reply.status(404).send({ message: error.message });
  },
  ResourceAlreadyExistsError: (error, _, reply) => {
    return reply.status(400).send({ message: error.message });
  },
  InvalidCredentialsError: (error, _, reply) => {
    return reply.status(404).send({ message: error.message });
  },
  AuthenticationRequiredError: (error, _, reply) => {
    return reply.status(401).send({ message: error.message });
  },
  ForbiddenError: (error, _, reply) => {
    return reply.status(403).send({ message: error.message });
  },
};

export const globalErrorHandler = (
  error: Error,
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const handler = errorHandlerMap[error.constructor.name];
  if (handler) return handler(error, request, reply);

  if (env.NODE_ENV === "development") {
    console.error(error);
  }

  return reply.status(500).send({ message: "Internal Server Error" });
};