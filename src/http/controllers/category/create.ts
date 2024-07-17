import { createSchema } from "@/dtos/category/create.dto";
import { PrismaCategoryRepository } from "@/repositories/prisma/category.repository";
import { CreateCategoryUseCase } from "@/use-cases/category/create.use-case";
import { FastifyReply, FastifyRequest } from "fastify";

export async function createCategory(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const dto = createSchema.parse(request.body);

  const repository = new PrismaCategoryRepository();
  const useCase = new CreateCategoryUseCase(repository);

  const post = await useCase.handler(dto);
  return reply.status(201).send(post);
}
