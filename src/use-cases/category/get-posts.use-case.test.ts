import { describe, it, expect, beforeEach } from "vitest";
import { GetPostsByCategoryUseCase } from "./get-posts.use-case";
import { InMemoryPostRepository } from "@/repositories/in-memory/post.repository";

describe("GetPostsByCategoryUseCase", () => {
  let repository: InMemoryPostRepository;
  let useCase: GetPostsByCategoryUseCase;

  beforeEach(() => {
    repository = new InMemoryPostRepository();
    useCase = new GetPostsByCategoryUseCase(repository);
  });

  it("should return all posts that contains specific category", async () => {
    // Arrange
    const categoryId = 1;

    // Act
    const posts = await useCase.handler(categoryId);
    const categoriesIdsFromPosts = posts.map((post) =>
      post.categories.map((category) => category.id)
    );

    // Assert
    for (const categories of categoriesIdsFromPosts) {
      expect(categories).toContain(categoryId);
    }
  });
});
