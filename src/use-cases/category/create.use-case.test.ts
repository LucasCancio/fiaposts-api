import { InMemoryCategoryRepository } from "@/repositories/in-memory/category.repository";
import { describe, it, expect } from "vitest";
import { CreateCategoryUseCase } from "./create.use-case";

describe("CreateCategoryUseCase", () => {
  const repository = new InMemoryCategoryRepository();
  const useCase = new CreateCategoryUseCase(repository);

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
