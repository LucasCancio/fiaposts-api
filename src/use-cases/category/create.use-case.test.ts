import { InMemoryCategoryRepository } from "@/repositories/in-memory/category.repository";
import { describe, it, expect, beforeEach } from "vitest";
import { CreateCategoryUseCase } from "./create.use-case";

describe("CreateCategoryUseCase", () => {
  let repository: InMemoryCategoryRepository;
  let useCase: CreateCategoryUseCase;

  beforeEach(() => {
    repository = new InMemoryCategoryRepository();
    useCase = new CreateCategoryUseCase(repository);
  });

  it("should create category", async () => {
    // Arrange
    const name = "Category fake";

    // Act
    const category = await useCase.handler({ name });

    // Assert
    expect(category).not.toBeNull();
    expect(category.name).toBe(name);
  });
});
