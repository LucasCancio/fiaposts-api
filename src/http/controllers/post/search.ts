import { searchSchema } from "@/dtos/post/search.dto";
import { PrismaPostRepository } from "@/repositories/prisma/post.repository";
import { SearchPostsUseCase } from "@/use-cases/post/search.use-case";
import { FastifyReply, FastifyRequest } from "fastify";

export async function searchPosts(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const dto = searchSchema.parse(request.query);

  const repository = new PrismaPostRepository();
  const useCase = new SearchPostsUseCase(repository);

  const posts = await useCase.handler(dto);
  return reply.status(200).send(posts);
}
