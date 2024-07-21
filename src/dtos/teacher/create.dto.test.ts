import { describe, expect, it } from "vitest";
import { ZodError } from "zod";
import { CreateTeacherDTO, createSchema } from "./create.dto";

describe("CreateTeacherDTO", () => {
  it("should create when its valid", async () => {
    // Arrange
    const dto: CreateTeacherDTO = {
      name: "Teste",
      email: "teste@gmail.com",
      password: "123456",
    };

    // Act
    const parsed = createSchema.parse(dto);

    // Assert
    expect(parsed).not.toBeNull();
  });

  it("should throw ZodError when name is len than 3 characters", async () => {
    // Arrange
    const dto: CreateTeacherDTO = {
      email: "Teacher",
      name: "123",
      password: "123456789",
    };

    //  Act / Assert
    expect(() => createSchema.parse(dto)).toThrowError(ZodError);
  });

  it("should throw ZodError when email is invalid", async () => {
    // Arrange
    const dto: CreateTeacherDTO = {
      name: "Teste",
      email: "testecom",
      password: "123456789",
    };

    //  Act / Assert
    expect(() => createSchema.parse(dto)).toThrowError(ZodError);
  });

  it("should throw ZodError when password is len than 6 characters", async () => {
    // Arrange
    const dto: CreateTeacherDTO = {
      name: "Teste",
      email: "teste@gmail.com",
      password: "1234",
    };

    //  Act / Assert
    expect(() => createSchema.parse(dto)).toThrowError(ZodError);
  });
});
