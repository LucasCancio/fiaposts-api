import { beforeEach, describe, expect, it } from "vitest";
import { DeleteTeacherUseCase } from "./delete.use-case";
import { InMemoryTeacherRepository } from "@/repositories/in-memory/teacher.repository";
import { ResourceNotFoundError } from "@/errors/resource-not-found-error";

describe("DeleteTeacherUseCase", () => {
  let repository: InMemoryTeacherRepository;
  let useCase: DeleteTeacherUseCase;

  beforeEach(() => {
    repository = new InMemoryTeacherRepository();
    useCase = new DeleteTeacherUseCase(repository);
  });

  it("should delete teacher from database", async () => {
    // Arrange
    const teacherId = 1;

    // Act
    const teacherBeforeDelete = await repository.findById(teacherId);
    const deleted = await useCase.handler(teacherId);
    const teacherDeleted = await repository.findById(teacherId);

    // Assert
    expect(deleted).toBeTruthy();
    expect(teacherBeforeDelete).not.toBeNull();
    expect(teacherDeleted).toBeNull();
  });

  it("should throw ResourceNotFoundError when post doesnt exists", async () => {
    // Arrange
    const teacherId = 999;

    // Act
    const deleted = useCase.handler(teacherId);

    // Assert
    await expect(deleted).rejects.toThrow(ResourceNotFoundError);
  });
});
