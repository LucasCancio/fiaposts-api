import { prisma } from "@/lib/prisma/client";
import { CreateUserDTO } from "@/dtos/user/create.dto";
import { IStudentRepository } from "../interfaces/student.repository.interface";
import { Student } from "@prisma/client";

export class PrismaStudentRepository implements IStudentRepository {
  getAll(): Promise<Student[]> {
    return prisma.student.findMany();
  }
  findById(id: number): Promise<Student | null> {
    return prisma.student.findUnique({
      where: {
        id,
      },
    });
  }

  findByEmail(email: string): Promise<Student | null> {
    return prisma.student.findUnique({
      where: {
        email,
      },
    });
  }

  create(student: CreateUserDTO): Promise<Student> {
    return prisma.student.create({
      data: student,
    });
  }
  update(student: Student): Promise<Student> {
    return prisma.student.update({
      where: {
        id: student.id,
      },
      data: student,
    });
  }

  async delete(id: number): Promise<boolean> {
    return !!(await prisma.student.delete({
      where: {
        id,
      },
    }));
  }
}
