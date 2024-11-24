import { CreateUserDTO } from "@/dtos/user/create.dto";
import { Teacher } from "@prisma/client";

export interface ITeacherRepository {
  getAll(): Promise<Teacher[]>;
  findById(id: number): Promise<Teacher | null>;
  findByEmail(email: string): Promise<Teacher | null>;
  create(teacher: CreateUserDTO): Promise<Teacher>;
  update(teacher: Teacher): Promise<Teacher>;
  delete(id: number): Promise<boolean>;
}
