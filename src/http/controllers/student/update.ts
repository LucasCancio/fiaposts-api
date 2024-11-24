import { updateSchema } from "@/dtos/user/update.dto";
import { PrismaStudentRepository } from "@/repositories/prisma/student.repository";
import { UpdateStudentUseCase } from "@/use-cases/student/update.use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function updateStudent(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const dto = updateSchema.parse(request.body);
  const { id } = z
    .object({
      id: z.coerce.number(),
    })
    .parse(request.params);

  const repository = new PrismaStudentRepository();
  const useCase = new UpdateStudentUseCase(repository);
  const teacher = await useCase.handler(id, dto);
  return reply.status(200).send(teacher);
}
