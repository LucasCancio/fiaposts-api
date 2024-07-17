import { PrismaCategoryRepository } from "@/repositories/prisma/category.repository";
import { GetAllCategoriesUseCase } from "@/use-cases/category/get-all.use-case";
import { FastifyReply, FastifyRequest } from "fastify";

export async function getCategories(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const repository = new PrismaCategoryRepository();
  const useCase = new GetAllCategoriesUseCase(repository);

  const categories = await useCase.handler();
  return reply.status(200).send(categories);
}
