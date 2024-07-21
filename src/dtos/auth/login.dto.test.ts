import { describe, expect, it } from "vitest";
import { LoginDTO, loginSchema } from "./login.dto";
import { ZodError } from "zod";

describe("LoginDTO", () => {
  it("should create when its valid", async () => {
    // Arrange
    const dto: LoginDTO = {
      email: "teste@gmail.com",
      password: "123456789",
    };

    // Act
    const parsed = loginSchema.parse(dto);

    // Assert
    expect(parsed).not.toBeNull();
  });

  it("should throw ZodError when object is incomplete", async () => {
    // Arrange
    const dto: LoginDTO = {
      email: "teste@gmail.com",
    };

    //  Act / Assert
    expect(() => loginSchema.parse(dto)).toThrowError(ZodError);
  });

  it("should throw ZodError when email is invalid", async () => {
    // Arrange
    const dto: LoginDTO = {
      email: "testecom",
      password: "123456789",
    };

    //  Act / Assert
    expect(() => loginSchema.parse(dto)).toThrowError(ZodError);
  });

  it("should throw ZodError when password is len than 6 characters", async () => {
    // Arrange
    const dto: LoginDTO = {
      email: "teste@gmail.com",
      password: "1234",
    };

    //  Act / Assert
    expect(() => loginSchema.parse(dto)).toThrowError(ZodError);
  });
});
