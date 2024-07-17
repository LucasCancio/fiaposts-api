import { InMemoryCategoryRepository } from "@/repositories/in-memory/category.repository";
import { describe, it, expect } from "vitest";
import { GetAllCategoriesUseCase } from "./get-all.use-case";
import { GetPostsByCategoryUseCase } from "./get-posts.use-case";
import { InMemoryPostRepository } from "@/repositories/in-memory/post.repository";

describe.skip("GetPostsByCategoryUseCase", () => {
  const repository = new InMemoryPostRepository();
  const useCase = new GetPostsByCategoryUseCase(repository);

  it("should return all posts that contains specific category", async () => {
    // Arrange
    const categoryId = 1;

    // Act
    const posts = await useCase.handler(categoryId);
    const categoriesFromPosts = posts.map((post) => post.categories);

    // Assert
  });
});
