import { PrismaPostRepository } from "@/repositories/prisma/post.repository";
import { GetAllPostsAdminUseCase } from "@/use-cases/post/get-all-admin.use-case";
import { GetAllPostsUseCase } from "@/use-cases/post/get-all.use-case";
import { FastifyReply, FastifyRequest } from "fastify";

export async function getAdminPosts(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const repository = new PrismaPostRepository();
  const useCase = new GetAllPostsAdminUseCase(repository);

  const posts = await useCase.handler();
  return reply.status(200).send(posts);
}
