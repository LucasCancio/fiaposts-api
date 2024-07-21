import { describe, expect, it } from "vitest";
import { ZodError } from "zod";
import { CreatePostDTO, createSchema } from "./create.dto";

describe("CreatePostDTO", () => {
  it("should create when its valid", async () => {
    // Arrange
    const dto: CreatePostDTO = {
      title: "Post Title",
      content: "Post Content",
      imageUrl: "https://www.google.com",
      slug: "post-slug",
      categoriesIds: [1],
    };

    // Act
    const parsed = createSchema.parse(dto);

    // Assert
    expect(parsed).not.toBeNull();
  });

  it("should throw ZodError when object is incomplete", async () => {
    // Arrange
    const dto: CreatePostDTO = {
      title: "Post Title",
    };

    //  Act / Assert
    expect(() => createSchema.parse(dto)).toThrowError(ZodError);
  });

  it("should throw ZodError when title is len than 5 characters", async () => {
    // Arrange
    const dto: CreatePostDTO = {
      title: "1234",
      content: "Post Content",
      imageUrl: "https://www.google.com",
      slug: "post-slug",
      categoriesIds: [1],
    };

    //  Act / Assert
    expect(() => createSchema.parse(dto)).toThrowError(ZodError);
  });

  it("should throw ZodError when content is len than 10 characters", async () => {
    // Arrange
    const dto: CreatePostDTO = {
      title: "Post Title",
      content: "12345",
      imageUrl: "https://www.google.com",
      slug: "post-slug",
      categoriesIds: [1],
    };

    //  Act / Assert
    expect(() => createSchema.parse(dto)).toThrowError(ZodError);
  });

  it("should throw ZodError when imageUrl is not an url", async () => {
    // Arrange
    const dto: CreatePostDTO = {
      title: "Post Title",
      content: "Post Content",
      imageUrl: "fake url",
      slug: "post-slug",
      categoriesIds: [1],
    };

    //  Act / Assert
    expect(() => createSchema.parse(dto)).toThrowError(ZodError);
  });

  it("should throw ZodError when slug is len than 10 characters", async () => {
    // Arrange
    const dto: CreatePostDTO = {
      title: "Post Title",
      content: "Post Content",
      imageUrl: "https://www.google.com",
      slug: "1234",
      categoriesIds: [1],
    };

    //  Act / Assert
    expect(() => createSchema.parse(dto)).toThrowError(ZodError);
  });

  it("should throw ZodError when categoriesIds is empty", async () => {
    // Arrange
    const dto: CreatePostDTO = {
      title: "Post Title",
      content: "Post Content",
      imageUrl: "https://www.google.com",
      slug: "post-slug",
    };

    //  Act / Assert
    expect(() => createSchema.parse(dto)).toThrowError(ZodError);
  });
});
