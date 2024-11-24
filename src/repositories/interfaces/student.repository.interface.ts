import { CreateUserDTO } from "@/dtos/user/create.dto";
import { Student } from "@prisma/client";

export interface IStudentRepository {
  getAll(): Promise<Student[]>;
  findById(id: number): Promise<Student | null>;
  findByEmail(email: string): Promise<Student | null>;
  create(student: CreateUserDTO): Promise<Student>;
  update(student: Student): Promise<Student>;
  delete(id: number): Promise<boolean>;
}
