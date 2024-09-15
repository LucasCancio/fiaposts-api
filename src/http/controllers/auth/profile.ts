import { PrismaTeacherRepository } from "@/repositories/prisma/teacher.repository";
import { FindTeacherByIdUseCase } from "@/use-cases/teacher/find-by-id.use-case";
import { FastifyReply, FastifyRequest } from "fastify";

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const repository = new PrismaTeacherRepository();
  const useCase = new FindTeacherByIdUseCase(repository);

  const loggedUserId = request.user.id;

  const teacher = await useCase.handler(loggedUserId);
  if (!teacher) return reply.status(404).send();

  return reply.status(200).send(teacher);
}
