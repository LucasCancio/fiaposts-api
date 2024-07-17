import { InMemoryCategoryRepository } from "@/repositories/in-memory/category.repository";
import { describe, it, expect } from "vitest";
import { GetAllCategoriesUseCase } from "./get-all.use-case";
import { FindCategoryByIdUseCase } from "./find-by-id.use-case";

describe("FindCategoryByIdUseCase", () => {
  const repository = new InMemoryCategoryRepository();
  const useCase = new FindCategoryByIdUseCase(repository);

  it("should return valid category", async () => {
    // Arrange
    const categoryId = 1;

    // Act
    const category = await useCase.handler([categoryId]);

    // Assert
    expect(category).not.toBeNull();
    expect(category.id).toBe(categoryId);
  });

  it("should return undefined when category doesnt exists", async () => {
    // Arrange
    const categoryId = 999;

    // Act
    const category = await useCase.handler([categoryId]);

    // Assert
    expect(category).toBeUndefined();
  });
});
