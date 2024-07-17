import { PrismaPostRepository } from "@/repositories/prisma/post.repository";
import { FindPostByIdUseCase } from "@/use-cases/post/find-by-id.use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function findPostById(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = z
    .object({
      id: z.coerce.number(),
    })
    .parse(request.params);

  const repository = new PrismaPostRepository();
  const useCase = new FindPostByIdUseCase(repository);

  const teacher = await useCase.handler(id);
  if (!teacher) return reply.status(404).send();

  return reply.status(200).send(teacher);
}
