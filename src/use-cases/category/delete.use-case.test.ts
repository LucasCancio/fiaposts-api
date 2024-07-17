import { InMemoryCategoryRepository } from "@/repositories/in-memory/category.repository";
import { describe, it, expect } from "vitest";
import { DeleteCategoryUseCase } from "./delete.use-case";
import { ResourceNotFoundError } from "@/errors/resource-not-found-error";

describe("DeleteCategoryUseCase", () => {
  const repository = new InMemoryCategoryRepository();
  const useCase = new DeleteCategoryUseCase(repository);

  it("should delete category", async () => {
    // Arrange
    const categoryId = 1;

    // Act
    const deleted = await useCase.handler(categoryId);
    const remainingCategories = repository.categories;

    // Assert
    expect(deleted).not.toBeNull();
    expect(remainingCategories).not.toEqual(
      expect.arrayContaining([expect.objectContaining({ id: categoryId })])
    );
  });

  it("should return an ResourceNotFoundError when category not exists", async () => {
    // Arrange
    const categoryId = 111;

    // Act
    const deleted = useCase.handler(categoryId);

    // Assert
    await expect(deleted).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
