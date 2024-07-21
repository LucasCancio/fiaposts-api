import { updateSchema } from "@/dtos/post/update.dto";
import { PrismaCategoryRepository } from "@/repositories/prisma/category.repository";
import { PrismaPostRepository } from "@/repositories/prisma/post.repository";
import { UpdatePostUseCase } from "@/use-cases/post/update.use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function updatePost(request: FastifyRequest, reply: FastifyReply) {
  const dto = updateSchema.parse(request.body);
  const { id } = z
    .object({
      id: z.coerce.number(),
    })
    .parse(request.params);

  const postRepository = new PrismaPostRepository();
  const categoryRepository = new PrismaCategoryRepository();

  const useCase = new UpdatePostUseCase(postRepository, categoryRepository);

  const teacherId = request.user.id;
  console.log(teacherId);

  const post = await useCase.handler(id, dto, teacherId);
  return reply.status(200).send(post);
}
