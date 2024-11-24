import { Teacher } from "@prisma/client";
import { ITeacherRepository } from "../interfaces/teacher.repository.interface";
import { prisma } from "@/lib/prisma/client";
import { CreateUserDTO } from "@/dtos/user/create.dto";

export class PrismaTeacherRepository implements ITeacherRepository {
  getAll(): Promise<Teacher[]> {
    return prisma.teacher.findMany();
  }
  findById(id: number): Promise<Teacher | null> {
    return prisma.teacher.findUnique({
      where: {
        id,
      },
    });
  }

  findByEmail(email: string): Promise<Teacher | null> {
    return prisma.teacher.findUnique({
      where: {
        email,
      },
    });
  }

  create(teacher: CreateUserDTO): Promise<Teacher> {
    return prisma.teacher.create({
      data: teacher,
    });
  }
  update(teacher: Teacher): Promise<Teacher> {
    return prisma.teacher.update({
      where: {
        id: teacher.id,
      },
      data: teacher,
    });
  }

  async delete(id: number): Promise<boolean> {
    return !!(await prisma.teacher.delete({
      where: {
        id,
      },
    }));
  }
}
