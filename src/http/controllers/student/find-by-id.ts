import { PrismaStudentRepository } from "@/repositories/prisma/student.repository";
import { FindStudentByIdUseCase } from "@/use-cases/student/find-by-id.use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function findStudentById(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = z
    .object({
      id: z.coerce.number(),
    })
    .parse(request.params);

  const repository = new PrismaStudentRepository();
  const useCase = new FindStudentByIdUseCase(repository);

  const teacher = await useCase.handler(id);
  if (!teacher) return reply.status(404).send();

  return reply.status(200).send(teacher);
}
