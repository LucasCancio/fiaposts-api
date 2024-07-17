import { updateSchema } from "@/dtos/teacher/update.dto";
import { PrismaTeacherRepository } from "@/repositories/prisma/teacher.repository";
import { UpdateTeacherUseCase } from "@/use-cases/teacher/update.use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function updateTeacher(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const dto = updateSchema.parse(request.body);
  const { id } = z
    .object({
      id: z.coerce.number(),
    })
    .parse(request.params);

  const repository = new PrismaTeacherRepository();
  const useCase = new UpdateTeacherUseCase(repository);
  const teacher = await useCase.handler(id, dto);
  return reply.status(200).send(teacher);
}
