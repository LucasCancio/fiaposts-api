import { PrismaCategoryRepository } from "@/repositories/prisma/category.repository";
import { DeleteCategoryUseCase } from "@/use-cases/category/delete.use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function deleteCategory(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = z
    .object({
      id: z.coerce.number(),
    })
    .parse(request.params);

  const repository = new PrismaCategoryRepository();

  const useCase = new DeleteCategoryUseCase(repository);

  const deleted = await useCase.handler(id);
  return reply.status(deleted ? 204 : 404).send();
}
