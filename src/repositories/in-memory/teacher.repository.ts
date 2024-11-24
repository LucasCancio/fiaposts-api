import { Teacher } from "@prisma/client";
import { ITeacherRepository } from "../interfaces/teacher.repository.interface";
import { CreateUserDTO } from "@/dtos/user/create.dto";

export class InMemoryTeacherRepository implements ITeacherRepository {
  public teachers: Teacher[] = [
    {
      id: 1,
      name: "Teacher 1",
      email: "teacher1@email.com",
      password: "$2a$08$qWskv5pXtzborAWjVD2xGOjTHjh2qYVM4HEBkiVoNGNM17avU.yRS",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      name: "Teacher 2",
      email: "teacher2@email.com",
      password: "$2a$08$qWskv5pXtzborAWjVD2xGOjTHjh2qYVM4HEBkiVoNGNM17avU.yRS",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 3,
      name: "Teacher 3",
      email: "teacher3@email.com",
      password: "$2a$08$qWskv5pXtzborAWjVD2xGOjTHjh2qYVM4HEBkiVoNGNM17avU.yRS",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  getAll(): Promise<Teacher[]> {
    return Promise.resolve(this.teachers);
  }

  findById(id: number): Promise<Teacher | null> {
    const teacher = this.teachers.find((teacher) => teacher.id === id);
    return Promise.resolve(teacher || null);
  }

  findByEmail(email: string): Promise<Teacher | null> {
    const teacher = this.teachers.find((teacher) => teacher.email === email);
    return Promise.resolve(teacher || null);
  }

  create(teacher: CreateUserDTO): Promise<Teacher> {
    const teacherCreated: Teacher = {
      id: this.teachers.length + 1,
      name: teacher.name,
      email: teacher.email,
      password: teacher.password,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.teachers.push(teacherCreated);
    return Promise.resolve(teacherCreated);
  }
  update(teacher: Teacher): Promise<Teacher> {
    this.teachers = this.teachers.map((t) => {
      if (t.id === teacher.id) {
        return {
          ...t,
          ...teacher,
        };
      }

      return t;
    });

    return Promise.resolve(teacher);
  }

  async delete(id: number): Promise<boolean> {
    this.teachers = this.teachers.filter((teacher) => teacher.id !== id);
    return Promise.resolve(true);
  }
}
