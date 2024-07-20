import { beforeEach, describe, expect, it } from "vitest";
import { CreateTeacherUseCase } from "./create.use-case";
import { InMemoryTeacherRepository } from "@/repositories/in-memory/teacher.repository";
import { CreateTeacherDTO } from "@/dtos/teacher/create.dto";

describe("CreateTeacherUseCase", () => {
  let repository: InMemoryTeacherRepository;
  let useCase: CreateTeacherUseCase;

  beforeEach(() => {
    repository = new InMemoryTeacherRepository();
    useCase = new CreateTeacherUseCase(repository);
  });

  it("should create teacher", async () => {
    // Arrange
    const fakeTeacher: CreateTeacherDTO = {
      email: "fake@email.com",
      name: "Fake Name",
      password: "123456789",
    };

    // Act
    const teacher = await useCase.handler(fakeTeacher);

    // Assert
    expect(teacher).not.toBeNull();
    expect(teacher.name).toBe(fakeTeacher.name);
    expect(teacher.email).toBe(fakeTeacher.email);
    expect(teacher.password).not.toBeNull();
    expect(teacher.createdAt).not.toBeNull();
  });
});
