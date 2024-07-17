import { hash } from "bcryptjs";

export async function encryptPassword(password?: string) {
  if (!password) return password;
  return hash(password, 8);
}
