import { PrismaStudentRepository } from "@/repositories/prisma/student.repository";
import { PrismaTeacherRepository } from "@/repositories/prisma/teacher.repository";
import { FindStudentByIdUseCase } from "@/use-cases/student/find-by-id.use-case";
import { FindTeacherByIdUseCase } from "@/use-cases/teacher/find-by-id.use-case";
import { FastifyReply, FastifyRequest } from "fastify";

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const { id: loggedUserId, isTeacher } = request.user;

  const user = await (isTeacher
    ? findTeacherById(loggedUserId)
    : findStudentById(loggedUserId));
  if (!user) return reply.status(404).send();

  return reply.status(200).send({ ...user, isTeacher });
}

function findTeacherById(id: number) {
  const repository = new PrismaTeacherRepository();
  const useCase = new FindTeacherByIdUseCase(repository);

  return useCase.handler(id);
}

function findStudentById(id: number) {
  const repository = new PrismaStudentRepository();
  const useCase = new FindStudentByIdUseCase(repository);

  return useCase.handler(id);
}
