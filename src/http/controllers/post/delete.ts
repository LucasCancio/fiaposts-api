import { PrismaPostRepository } from "@/repositories/prisma/post.repository";
import { DeletePostUseCase } from "@/use-cases/post/delete.use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function deletePost(request: FastifyRequest, reply: FastifyReply) {
  const { id } = z
    .object({
      id: z.coerce.number(),
    })
    .parse(request.params);

  const repository = new PrismaPostRepository();
  const useCase = new DeletePostUseCase(repository);

  const teacherId = request.user.id;

  const deleted = await useCase.handler(id, teacherId);

  return reply.status(deleted ? 204 : 404).send();
}
