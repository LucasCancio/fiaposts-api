import { beforeEach, describe, expect, it } from "vitest";
import { CreateTeacherUseCase } from "./create.use-case";
import { InMemoryTeacherRepository } from "@/repositories/in-memory/teacher.repository";
import { CreateTeacherDTO } from "@/dtos/teacher/create.dto";
import { ResourceAlreadyExistsError } from "@/errors/resource-already-exists-error";

describe("CreateTeacherUseCase", () => {
  let repository: InMemoryTeacherRepository;
  let useCase: CreateTeacherUseCase;

  beforeEach(() => {
    repository = new InMemoryTeacherRepository();
    useCase = new CreateTeacherUseCase(repository);
  });

  it("should create teacher", async () => {
    // Arrange
    const newTeacher: CreateTeacherDTO = {
      email: "fake@email.com",
      name: "Fake Name",
      password: "123456789",
    };

    // Act
    const teacher = await useCase.handler(newTeacher);

    // Assert
    expect(teacher).not.toBeNull();
    expect(teacher.name).toBe(newTeacher.name);
    expect(teacher.email).toBe(newTeacher.email);
    expect(teacher.password).not.toBeNull();
    expect(teacher.createdAt).not.toBeNull();
  });

  it("should throw ResourceAlreadyExistsError when exists teacher with the same email", async () => {
    // Arrange
    const newTeacher: CreateTeacherDTO = {
      email: "teacher1@email.com",
      name: "Fake Name",
      password: "123456789",
    };

    // Act
    const teacher = useCase.handler(newTeacher);

    // Assert
    await expect(teacher).rejects.toBeInstanceOf(ResourceAlreadyExistsError);
  });
});
