import { loginSchema } from "@/dtos/auth/login.dto";
import { PrismaTeacherRepository } from "@/repositories/prisma/teacher.repository";
import { LoginUseCase } from "@/use-cases/auth/login.use-case";
import { FastifyReply, FastifyRequest } from "fastify";

export async function login(request: FastifyRequest, reply: FastifyReply) {
  const dto = loginSchema.parse(request.body);

  const repository = new PrismaTeacherRepository();
  const useCase = new LoginUseCase(repository);

  const teacher = await useCase.handler(dto);

  const token = await reply.jwtSign({ id: teacher.id, email: teacher.email });

  const sevenDays = new Date(Date.now() + 1000 * 60 * 60 * 24 * 1);
  reply.setCookie("access_token", token, {
    path: "/",
    httpOnly: true,
    secure: true,
    expires: sevenDays,
  });

  return reply.status(200).send({ token });
}
