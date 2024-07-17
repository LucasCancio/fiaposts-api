import { PrismaTeacherRepository } from "@/repositories/prisma/teacher.repository";
import { DeleteTeacherUseCase } from "@/use-cases/teacher/delete.use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function deleteTeacher(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = z
    .object({
      id: z.coerce.number(),
    })
    .parse(request.params);

  const repository = new PrismaTeacherRepository();
  const useCase = new DeleteTeacherUseCase(repository);

  const deleted = await useCase.handler(id);
  return reply.status(deleted ? 204 : 404).send();
}
