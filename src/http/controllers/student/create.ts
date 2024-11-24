import { createSchema } from "@/dtos/user/create.dto";
import { PrismaStudentRepository } from "@/repositories/prisma/student.repository";
import { CreateStudentUseCase } from "@/use-cases/student/create.use-case";
import { FastifyReply, FastifyRequest } from "fastify";

export async function createStudent(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const dto = createSchema.parse(request.body);

  const repository = new PrismaStudentRepository();
  const useCase = new CreateStudentUseCase(repository);

  const teacher = await useCase.handler(dto);
  return reply.status(201).send(teacher);
}
