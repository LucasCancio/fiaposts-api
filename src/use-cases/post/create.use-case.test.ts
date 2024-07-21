import { beforeEach, describe, expect, it } from "vitest";
import { CreatePostUseCase } from "./create.use-case";
import { InMemoryTeacherRepository } from "@/repositories/in-memory/teacher.repository";
import { InMemoryPostRepository } from "@/repositories/in-memory/post.repository";
import { InMemoryCategoryRepository } from "@/repositories/in-memory/category.repository";
import { CreatePostDTO } from "@/dtos/post/create.dto";
import { ResourceNotFoundError } from "@/errors/resource-not-found-error";

describe("CreatePostUseCase", () => {
  let postRepository: InMemoryPostRepository;
  let categoryRepository: InMemoryCategoryRepository;
  let teacherRepository: InMemoryTeacherRepository;

  let useCase: CreatePostUseCase;

  beforeEach(() => {
    postRepository = new InMemoryPostRepository();
    categoryRepository = new InMemoryCategoryRepository();
    teacherRepository = new InMemoryTeacherRepository();

    useCase = new CreatePostUseCase(
      postRepository,
      categoryRepository,
      teacherRepository
    );
  });

  it("should create post", async () => {
    // Arrange
    const dto: CreatePostDTO = {
      title: "Post fake",
      categoriesIds: [1, 2],
      content: "Post fake content",
      slug: "post-fake",
      imageUrl: "https://via.placeholder.com/150",
    };
    const authorId = 1;

    // Act
    const post = await useCase.handler(dto, authorId);

    // Assert
    expect(post).not.toBeNull();
    expect(post.id).not.toBeNull();
    expect(post.title).toBe(dto.title);
    expect(post.content).toBe(dto.content);
    expect(post.slug).toBe(dto.slug);
  });

  it("should throw ResourceNotFoundError when category doesnt exists", async () => {
    // Arrange
    const dto: CreatePostDTO = {
      title: "Post fake",
      categoriesIds: [999],
      content: "Post fake content",
      slug: "post-fake",
      imageUrl: "https://via.placeholder.com/150",
    };
    const authorId = 1;

    // Act
    const post = useCase.handler(dto, authorId);

    // Assert
    await expect(post).rejects.toBeInstanceOf(ResourceNotFoundError);
  });

  it("should throw ResourceNotFoundError when teacher doesnt exists", async () => {
    // Arrange
    const dto: CreatePostDTO = {
      title: "Post fake",
      categoriesIds: [1],
      content: "Post fake content",
      slug: "post-fake",
      imageUrl: "https://via.placeholder.com/150",
    };
    const authorId = 999;

    // Act
    const post = useCase.handler(dto, authorId);

    // Assert
    await expect(post).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
