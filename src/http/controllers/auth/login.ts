import { loginSchema } from "@/dtos/auth/login.dto";
import { PrismaStudentRepository } from "@/repositories/prisma/student.repository";
import { PrismaTeacherRepository } from "@/repositories/prisma/teacher.repository";
import { LoginUseCase } from "@/use-cases/auth/login.use-case";
import { FastifyReply, FastifyRequest } from "fastify";

export async function login(request: FastifyRequest, reply: FastifyReply) {
  const dto = loginSchema.parse(request.body);

  const teacherRepository = new PrismaTeacherRepository();
  const studentRepository = new PrismaStudentRepository();
  const useCase = new LoginUseCase(teacherRepository, studentRepository);

  const teacher = await useCase.handler(dto);

  const token = await reply.jwtSign({
    id: teacher.id,
    email: teacher.email,
    isTeacher: dto.isTeacher,
  });

  reply.setCookie("access_token", token, {
    path: "/",
    httpOnly: true,
    secure: true,
  });

  return reply.status(200).send({ token });
}
