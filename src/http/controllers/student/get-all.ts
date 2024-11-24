import { PrismaStudentRepository } from "@/repositories/prisma/student.repository";
import { GetAllStudentsUseCase } from "@/use-cases/student/get-all.use-case";
import { FastifyReply, FastifyRequest } from "fastify";

export async function getStudents(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const repository = new PrismaStudentRepository();
  const useCase = new GetAllStudentsUseCase(repository);

  const teachers = await useCase.handler();
  return reply.status(200).send(teachers);
}
