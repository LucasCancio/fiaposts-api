import { beforeEach, describe, expect, it } from "vitest";
import { GetAllPostsAdminUseCase } from "./get-all-admin.use-case";
import { InMemoryPostRepository } from "@/repositories/in-memory/post.repository";

describe("GetAllPostsAdminUseCase", () => {
  let repository: InMemoryPostRepository;
  let useCase: GetAllPostsAdminUseCase;

  beforeEach(() => {
    repository = new InMemoryPostRepository();
    useCase = new GetAllPostsAdminUseCase(repository);
  });

  it("should get all posts", async () => {
    // Act
    const posts = await useCase.handler();

    // Assert
    expect(posts).not.toBeNull();
    expect(posts.length).toBeGreaterThan(0);
  });
});
