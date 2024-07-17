import { PrismaTeacherRepository } from "@/repositories/prisma/teacher.repository";
import { FindTeacherByIdUseCase } from "@/use-cases/teacher/find-by-id.use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function findTeacherById(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = z
    .object({
      id: z.coerce.number(),
    })
    .parse(request.params);

  const repository = new PrismaTeacherRepository();
  const useCase = new FindTeacherByIdUseCase(repository);

  const teacher = await useCase.handler(id);
  if (!teacher) return reply.status(404).send();

  return reply.status(200).send(teacher);
}
