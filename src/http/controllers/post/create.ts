import { createSchema } from "@/dtos/post/create.dto";
import { PrismaCategoryRepository } from "@/repositories/prisma/category.repository";
import { PrismaPostRepository } from "@/repositories/prisma/post.repository";
import { PrismaTeacherRepository } from "@/repositories/prisma/teacher.repository";
import { CreatePostUseCase } from "@/use-cases/post/create.use-case";
import { FastifyReply, FastifyRequest } from "fastify";

export async function createPost(request: FastifyRequest, reply: FastifyReply) {
  const dto = createSchema.parse(request.body);

  const postRepository = new PrismaPostRepository();
  const categoryRepository = new PrismaCategoryRepository();
  const teacherRepository = new PrismaTeacherRepository();

  const useCase = new CreatePostUseCase(
    postRepository,
    categoryRepository,
    teacherRepository
  );

  const authorId = request.user.id;

  const post = await useCase.handler(dto, authorId);
  return reply.status(201).send(post);
}
