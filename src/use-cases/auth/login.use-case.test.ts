import { beforeEach, describe, expect, it } from "vitest";
import { LoginUseCase } from "./login.use-case";
import { InMemoryTeacherRepository } from "@/repositories/in-memory/teacher.repository";
import { InvalidCredentialsError } from "@/errors/invalid-credentials-error";
import { InMemoryStudentRepository } from "@/repositories/in-memory/student.repository";

describe("Login use case", () => {
  let teacherRepository: InMemoryTeacherRepository;
  let studentRepository: InMemoryStudentRepository;
  let useCase: LoginUseCase;

  beforeEach(() => {
    teacherRepository = new InMemoryTeacherRepository();
    studentRepository = new InMemoryStudentRepository();
    useCase = new LoginUseCase(teacherRepository, studentRepository);
  });

  it("should return an user when the credentials are valid", async () => {
    // Act
    const user = await useCase.handler({
      email: "teacher1@email.com",
      password: "123456789",
    });

    // Assert
    expect(user).not.toBeNull();
  });

  it("should return an InvalidCredentialsError when the email doesnt exists", async () => {
    // Act
    const user = useCase.handler({
      email: "fake@email.com",
      password: "123456789",
    });

    // Assert
    expect(user).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should return an InvalidCredentialsError when the email exists but password is invalid", async () => {
    // Act
    const user = useCase.handler({
      email: "fake@email.com",
      password: "123",
    });

    // Assert
    await expect(user).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
