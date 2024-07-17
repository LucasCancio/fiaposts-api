import { createSchema } from "@/dtos/teacher/create.dto";
import { PrismaTeacherRepository } from "@/repositories/prisma/teacher.repository";
import { CreateTeacherUseCase } from "@/use-cases/teacher/create.use-case";
import { FastifyReply, FastifyRequest } from "fastify";

export async function createTeacher(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const dto = createSchema.parse(request.body);

  const repository = new PrismaTeacherRepository();
  const useCase = new CreateTeacherUseCase(repository);

  const teacher = await useCase.handler(dto);
  return reply.status(201).send(teacher);
}
