import { FastifyJWT } from "@fastify/jwt";
import { FastifyReply, FastifyRequest } from "fastify";

export async function verifyJwt(request: FastifyRequest, reply: FastifyReply) {
  try {
    const decoded = await request.jwtVerify<FastifyJWT["user"]>();
    request.user = decoded;
  } catch (err) {
    return reply.status(401).send({ message: "Unauthorized." });
  }
}
