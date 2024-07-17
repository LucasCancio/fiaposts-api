import { FastifyInstance } from "fastify";
import { createTeacher } from "./create";
import { findTeacherById } from "./find-by-id";
import { updateTeacher } from "./update";
import { getTeachers } from "./get-all";
import { deleteTeacher } from "./delete";

export async function teacherRoutes(app: FastifyInstance) {
  app.get("/teachers", getTeachers);
  app.get("/teachers/:id", findTeacherById);
  app.post("/teachers", createTeacher);
  app.patch("/teachers/:id", updateTeacher);
  app.delete("/teachers/:id", deleteTeacher);
}
