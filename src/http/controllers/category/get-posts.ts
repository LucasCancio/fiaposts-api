import { PrismaPostRepository } from "@/repositories/prisma/post.repository";
import { GetPostsByCategoryUseCase } from "@/use-cases/category/get-posts.use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function getPostsByCategory(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = z
    .object({
      id: z.coerce.number(),
    })
    .parse(request.params);

  const repository = new PrismaPostRepository();
  const useCase = new GetPostsByCategoryUseCase(repository);

  const posts = await useCase.handler(id);
  return reply.status(200).send(posts);
}
