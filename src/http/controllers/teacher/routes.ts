import { FastifyInstance } from "fastify";
import { createTeacher } from "./create";
import { findTeacherById } from "./find-by-id";
import { updateTeacher } from "./update";
import { getTeachers } from "./get-all";
import { deleteTeacher } from "./delete";
import { verifyJwt } from "@/http/middlewares/verify-jwt";

export async function teacherRoutes(app: FastifyInstance) {
  app.get("/teachers", { onRequest: [verifyJwt] }, getTeachers);
  app.get("/teachers/:id", { onRequest: [verifyJwt] }, findTeacherById);
  app.post("/teachers", createTeacher);
  app.patch("/teachers/:id", { onRequest: [verifyJwt] }, updateTeacher);
  app.delete("/teachers/:id", { onRequest: [verifyJwt] }, deleteTeacher);
}
