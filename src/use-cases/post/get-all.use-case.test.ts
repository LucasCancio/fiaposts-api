import { InMemoryPostRepository } from "@/repositories/in-memory/post.repository";
import { beforeEach, describe, expect, it } from "vitest";
import { GetAllPostsUseCase } from "./get-all.use-case";

describe("GetAllPostsUseCase", () => {
  let repository: InMemoryPostRepository;
  let useCase: GetAllPostsUseCase;

  beforeEach(() => {
    repository = new InMemoryPostRepository();
    useCase = new GetAllPostsUseCase(repository);
  });

  it("should get all posts", async () => {
    // Act
    const posts = await useCase.handler();

    // Assert
    expect(posts).not.toBeNull();
    expect(posts.length).toBeGreaterThan(0);
  });
});
