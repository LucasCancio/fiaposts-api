import { FastifyReply, FastifyRequest } from "fastify";

export async function logout(request: FastifyRequest, reply: FastifyReply) {
  reply.clearCookie("access_token");
  return reply.status(204).send();
}
