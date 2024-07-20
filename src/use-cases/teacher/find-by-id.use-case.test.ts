import { beforeEach, describe, expect, it } from "vitest";
import { FindTeacherByIdUseCase } from "./find-by-id.use-case";
import { InMemoryTeacherRepository } from "@/repositories/in-memory/teacher.repository";

describe("FindTeacherByIdUseCase", () => {
  let repository: InMemoryTeacherRepository;
  let useCase: FindTeacherByIdUseCase;

  beforeEach(() => {
    repository = new InMemoryTeacherRepository();
    useCase = new FindTeacherByIdUseCase(repository);
  });

  it("should find teacher that exists", async () => {
    // Arrange
    const teacherId = 1;

    // Act
    const teacher = await useCase.handler(teacherId);

    // Assert
    expect(teacher).not.toBeNull();
  });

  it("should return null when teacher doesnt exists", async () => {
    // Arrange
    const teacherId = 999;

    // Act
    const teacher = await useCase.handler(teacherId);

    // Assert
    expect(teacher).toBeNull();
  });
});
