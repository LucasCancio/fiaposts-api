import { searchSchema } from "@/dtos/post/search.dto";
import { PrismaPostRepository } from "@/repositories/prisma/post.repository";
import { GetAllMyPostsUseCase } from "@/use-cases/post/get-my-posts.use-case";
import { FastifyReply, FastifyRequest } from "fastify";

export async function myPosts(request: FastifyRequest, reply: FastifyReply) {
  const dto = searchSchema.parse(request.query);

  const userId = request.user.id;
  const repository = new PrismaPostRepository();
  const useCase = new GetAllMyPostsUseCase(repository);

  const posts = await useCase.handler(dto, userId);
  return reply.status(200).send(posts);
}
