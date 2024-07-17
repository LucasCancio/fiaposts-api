import { PrismaPostRepository } from "@/repositories/prisma/post.repository";
import { GetAllPostsUseCase } from "@/use-cases/post/get-all.use-case";
import { FastifyReply, FastifyRequest } from "fastify";

export async function getPosts(request: FastifyRequest, reply: FastifyReply) {
  const repository = new PrismaPostRepository();
  const useCase = new GetAllPostsUseCase(repository);

  const posts = await useCase.handler();
  return reply.status(200).send(posts);
}
