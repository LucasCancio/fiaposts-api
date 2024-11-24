import { PrismaStudentRepository } from "@/repositories/prisma/student.repository";
import { DeleteStudentUseCase } from "@/use-cases/student/delete.use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function deleteStudent(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = z
    .object({
      id: z.coerce.number(),
    })
    .parse(request.params);

  const repository = new PrismaStudentRepository();
  const useCase = new DeleteStudentUseCase(repository);

  const deleted = await useCase.handler(id);
  return reply.status(deleted ? 204 : 404).send();
}
