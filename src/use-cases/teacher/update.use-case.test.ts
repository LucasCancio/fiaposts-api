import { beforeEach, describe, expect, it } from "vitest";
import { UpdateTeacherUseCase } from "./update.use-case";
import { InMemoryTeacherRepository } from "@/repositories/in-memory/teacher.repository";
import { UpdateTeacherDTO } from "@/dtos/teacher/update.dto";

describe("UpdateTeacherUseCase", () => {
  let repository: InMemoryTeacherRepository;
  let useCase: UpdateTeacherUseCase;

  beforeEach(() => {
    repository = new InMemoryTeacherRepository();
    useCase = new UpdateTeacherUseCase(repository);
  });

  it("should update teacher", async () => {
    const teacherId = 1;
    const dto: UpdateTeacherDTO = {
      email: "updated@email.com",
      name: "Updated Name",
      password: "updated-password",
    };

    // Act
    await useCase.handler(teacherId, dto);
    const updatedTeacher = await repository.findById(teacherId);

    // Assert
    expect(updatedTeacher).not.toBeNull();
    expect(updatedTeacher?.name).toBe(dto.name);
    expect(updatedTeacher?.email).toBe(dto.email);
    expect(updatedTeacher?.updatedAt).not.toBeNull();
  });

  it("should update partially", async () => {
    const teacherId = 1;
    const dto: UpdateTeacherDTO = {
      name: "Updated Partial Name",
    };

    // Act
    // Creating new object to avoid reference
    const teacherBeforeUpdate = { ...(await repository.findById(teacherId)) };
    await useCase.handler(teacherId, dto);
    const teacherAfterUpdate = await repository.findById(teacherId);

    // Assert
    expect(teacherBeforeUpdate).not.toBeNull();
    expect(teacherAfterUpdate).not.toBeNull();

    expect(teacherBeforeUpdate?.email).toBe(teacherAfterUpdate?.email);
    expect(teacherBeforeUpdate?.name).not.toBe(teacherAfterUpdate?.name);
    expect(teacherBeforeUpdate?.updatedAt).not.toBe(
      teacherAfterUpdate?.updatedAt
    );
    expect(teacherAfterUpdate?.name).toBe(dto.name);
  });
});
