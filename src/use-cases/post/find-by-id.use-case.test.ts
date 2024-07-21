import { beforeEach, describe, expect, it } from "vitest";
import { FindPostByIdUseCase } from "./find-by-id.use-case";
import { InMemoryPostRepository } from "@/repositories/in-memory/post.repository";

describe("FindPostByIdUseCase", () => {
  let repository: InMemoryPostRepository;
  let useCase: FindPostByIdUseCase;

  beforeEach(() => {
    repository = new InMemoryPostRepository();
    useCase = new FindPostByIdUseCase(repository);
  });

  it("should find post that exists", async () => {
    // Arrange
    const postId = 1;

    // Act
    const post = await useCase.handler(postId);

    // Assert
    expect(post).not.toBeNull();
  });

  it("should return null when post doesnt exists", async () => {
    // Arrange
    const postId = 999;

    // Act
    const post = await useCase.handler(postId);

    // Assert
    expect(post).toBeNull();
  });
});
