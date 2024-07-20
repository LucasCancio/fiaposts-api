import { InMemoryCategoryRepository } from "@/repositories/in-memory/category.repository";
import { describe, it, expect, beforeEach } from "vitest";
import { GetAllCategoriesUseCase } from "./get-all.use-case";

describe("GetAllCategoriesUseCase", () => {
  let repository: InMemoryCategoryRepository;
  let useCase: GetAllCategoriesUseCase;

  beforeEach(() => {
    repository = new InMemoryCategoryRepository();
    useCase = new GetAllCategoriesUseCase(repository);
  });

  it("should return all categories", async () => {
    // Act
    const categories = await useCase.handler();

    // Assert
    expect(categories.length).greaterThan(0);
  });
});
