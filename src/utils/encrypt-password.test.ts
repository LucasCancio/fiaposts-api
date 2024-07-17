import { describe, expect, it } from "vitest";
import { encryptPassword } from "./encrypt-password";

describe("encryptPassword", () => {
  it("should return password encrypted", async () => {
    // Arrange
    const password = "password12345";

    // Act
    const escryptedPassword = await encryptPassword(password);

    // Assert
    expect(escryptedPassword).not.toBeNull();
    expect(escryptedPassword).not.toBe(password);
  });
});
