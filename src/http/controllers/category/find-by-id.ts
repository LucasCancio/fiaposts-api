import { PrismaCategoryRepository } from "@/repositories/prisma/category.repository";
import { FindCategoryByIdUseCase } from "@/use-cases/category/find-by-id.use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function findCategoryById(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = z
    .object({
      id: z.coerce.number(),
    })
    .parse(request.params);

  const repository = new PrismaCategoryRepository();
  const useCase = new FindCategoryByIdUseCase(repository);

  const category = await useCase.handler([id]);
  if (!category) return reply.status(404).send();

  return reply.status(200).send(category);
}
