import { describe, expect, it } from "vitest";
import { ZodError } from "zod";
import { CreateCategoryDTO, createSchema } from "./create.dto";

describe("CreateCategoryDTO", () => {
  it("should create when its valid", async () => {
    // Arrange
    const dto: CreateCategoryDTO = {
      name: "Category Name",
      color: "#FFFFFF",
    };

    // Act
    const parsed = createSchema.parse(dto);

    // Assert
    expect(parsed).not.toBeNull();
  });

  it("should throw ZodError when name is len than 5 characters", async () => {
    // Arrange
    const dto: CreateCategoryDTO = {
      name: "123",
      color: "#FFFFFF",
    };

    //  Act / Assert
    expect(() => createSchema.parse(dto)).toThrowError(ZodError);
  });
});
