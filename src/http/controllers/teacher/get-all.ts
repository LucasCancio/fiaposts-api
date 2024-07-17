import { PrismaTeacherRepository } from "@/repositories/prisma/teacher.repository";
import { GetAllTeachersUseCase } from "@/use-cases/teacher/get-all.use-case";
import { FastifyReply, FastifyRequest } from "fastify";

export async function getTeachers(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const repository = new PrismaTeacherRepository();
  const useCase = new GetAllTeachersUseCase(repository);

  const teachers = await useCase.handler();
  return reply.status(200).send(teachers);
}
