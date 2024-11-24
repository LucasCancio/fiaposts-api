import { Student } from "@prisma/client";
import { CreateUserDTO } from "@/dtos/user/create.dto";
import { IStudentRepository } from "../interfaces/student.repository.interface";

export class InMemoryStudentRepository implements IStudentRepository {
  public students: Student[] = [
    {
      id: 1,
      name: "student 1",
      email: "student1@email.com",
      password: "$2a$08$qWskv5pXtzborAWjVD2xGOjTHjh2qYVM4HEBkiVoNGNM17avU.yRS",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      name: "student 2",
      email: "student2@email.com",
      password: "$2a$08$qWskv5pXtzborAWjVD2xGOjTHjh2qYVM4HEBkiVoNGNM17avU.yRS",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 3,
      name: "student 3",
      email: "student3@email.com",
      password: "$2a$08$qWskv5pXtzborAWjVD2xGOjTHjh2qYVM4HEBkiVoNGNM17avU.yRS",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  getAll(): Promise<Student[]> {
    return Promise.resolve(this.students);
  }

  findById(id: number): Promise<Student | null> {
    const student = this.students.find((student) => student.id === id);
    return Promise.resolve(student || null);
  }

  findByEmail(email: string): Promise<Student | null> {
    const student = this.students.find((student) => student.email === email);
    return Promise.resolve(student || null);
  }

  create(student: CreateUserDTO): Promise<Student> {
    const studentCreated: Student = {
      id: this.students.length + 1,
      name: student.name,
      email: student.email,
      password: student.password,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.students.push(studentCreated);
    return Promise.resolve(studentCreated);
  }
  update(student: Student): Promise<Student> {
    this.students = this.students.map((t) => {
      if (t.id === student.id) {
        return {
          ...t,
          ...student,
        };
      }

      return t;
    });

    return Promise.resolve(student);
  }

  async delete(id: number): Promise<boolean> {
    this.students = this.students.filter((student) => student.id !== id);
    return Promise.resolve(true);
  }
}
