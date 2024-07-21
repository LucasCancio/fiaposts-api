import { beforeEach, describe, expect, it } from "vitest";
import { DeletePostUseCase } from "./delete.use-case";
import { InMemoryPostRepository } from "@/repositories/in-memory/post.repository";
import { ForbiddenError } from "@/errors/forbidden-error";
import { ResourceNotFoundError } from "@/errors/resource-not-found-error";

describe("DeletePostUseCase", () => {
  let repository: InMemoryPostRepository;
  let useCase: DeletePostUseCase;

  beforeEach(() => {
    repository = new InMemoryPostRepository();
    useCase = new DeletePostUseCase(repository);
  });

  it("should delete post from database", async () => {
    // Arrange
    const postId = 1;

    // Act
    const postBeforeDelete = await repository.findById(postId);
    const deleted = await useCase.handler(
      postId,
      postBeforeDelete?.authorId ?? 1
    );
    const postDeleted = await repository.findById(postId);

    // Assert
    expect(deleted).toBeTruthy();
    expect(postBeforeDelete).not.toBeNull();
    expect(postDeleted).toBeNull();
  });

  it("should throw ResourceNotFoundError when post doesnt exists", async () => {
    // Arrange
    const postId = 999;
    const authorId = 1;

    // Act
    const deleted = useCase.handler(postId, authorId);

    // Assert
    expect(deleted).rejects.toThrow(ResourceNotFoundError);
  });

  it("should throw ForbiddenError when teacherId is not the post's author", async () => {
    // Arrange
    const postId = 1;
    const authorId = 999;

    // Act
    const post = await repository.findById(postId);
    const deleted = useCase.handler(postId, authorId);

    // Assert
    await expect(deleted).rejects.toThrow(ForbiddenError);
    expect(post).not.toBeNull();
  });
});
