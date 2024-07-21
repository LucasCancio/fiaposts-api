import { beforeEach, describe, expect, it } from "vitest";
import { UpdatePostUseCase } from "./update.use-case";
import { InMemoryPostRepository } from "@/repositories/in-memory/post.repository";
import { InMemoryCategoryRepository } from "@/repositories/in-memory/category.repository";
import { UpdatePostDTO } from "@/dtos/post/update.dto";
import { ResourceNotFoundError } from "@/errors/resource-not-found-error";
import { ForbiddenError } from "@/errors/forbidden-error";

describe("UpdatePostUseCase", () => {
  let postRepository: InMemoryPostRepository;
  let categoryRepository: InMemoryCategoryRepository;
  let useCase: UpdatePostUseCase;

  beforeEach(() => {
    postRepository = new InMemoryPostRepository();
    categoryRepository = new InMemoryCategoryRepository();
    useCase = new UpdatePostUseCase(postRepository, categoryRepository);
  });

  it("should update post", async () => {
    const postId = 1;
    const teacherId = 1;
    const dto: UpdatePostDTO = {
      title: "Updated Title",
      content: "Updated Content",
      slug: "updated-slug",
      imageUrl: "updated-image-url",
      categoriesIds: [1, 2],
    };

    // Act
    await useCase.handler(postId, dto, teacherId);
    const updatedPost = await postRepository.findById(postId);

    // Assert
    expect(updatedPost).not.toBeNull();
    expect(updatedPost?.title).toBe(dto.title);
    expect(updatedPost?.content).toBe(dto.content);
    expect(updatedPost?.slug).toBe(dto.slug);
    expect(updatedPost?.imageUrl).toBe(dto.imageUrl);
  });

  it("should update partially", async () => {
    const postId = 1;
    const teacherId = 1;
    const dto: UpdatePostDTO = {
      title: "Updated Partial Title",
    };

    // Act
    // Creating new object to avoid reference
    const postBeforeUpdate = { ...(await postRepository.findById(postId)) };
    await useCase.handler(postId, dto, teacherId);
    const postAfterUpdate = await postRepository.findById(postId);

    // Assert
    expect(postBeforeUpdate).not.toBeNull();
    expect(postAfterUpdate).not.toBeNull();

    expect(postBeforeUpdate?.content).toBe(postAfterUpdate?.content);
    expect(postBeforeUpdate?.title).not.toBe(postAfterUpdate?.title);
    expect(postAfterUpdate?.title).toBe(dto.title);
    expect(postBeforeUpdate?.updatedAt).not.toBe(postAfterUpdate?.updatedAt);
  });

  it("should throw ResourceNotFoundError when post doesnt exists", async () => {
    // Arrange
    const postId = 999;
    const teacherId = 1;
    const dto: UpdatePostDTO = {
      title: "Updated Partial Title",
    };

    // Act
    const update = useCase.handler(postId, dto, teacherId);

    // Assert
    await expect(update).rejects.toThrowError(ResourceNotFoundError);
  });

  it("should throw ForbiddenError when teacherId is not the post's author", async () => {
    // Arrange
    const postId = 1;
    const teacherId = 999;
    const dto: UpdatePostDTO = {
      title: "Updated Partial Title",
    };

    // Act
    const update = useCase.handler(postId, dto, teacherId);

    // Assert
    await expect(update).rejects.toThrowError(ForbiddenError);
  });
});
