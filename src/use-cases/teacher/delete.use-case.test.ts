import { beforeEach, describe, expect, it } from "vitest";
import { DeleteTeacherUseCase } from "./delete.use-case";
import { InMemoryTeacherRepository } from "@/repositories/in-memory/teacher.repository";

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
});
