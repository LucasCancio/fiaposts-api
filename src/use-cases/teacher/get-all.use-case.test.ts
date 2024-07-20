import { beforeEach, describe, expect, it } from "vitest";
import { GetAllTeachersUseCase } from "./get-all.use-case";
import { InMemoryTeacherRepository } from "@/repositories/in-memory/teacher.repository";

describe("GetAllTeachersUseCase", () => {
  let repository: InMemoryTeacherRepository;
  let useCase: GetAllTeachersUseCase;

  beforeEach(() => {
    repository = new InMemoryTeacherRepository();
    useCase = new GetAllTeachersUseCase(repository);
  });

  it("should get all teachers", async () => {
    // Act
    const teachers = await useCase.handler();

    // Assert
    expect(teachers).not.toBeNull();
    expect(teachers.length).toBeGreaterThan(0);
  });
});
