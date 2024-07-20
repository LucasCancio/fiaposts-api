import { hash } from "bcryptjs";

export async function encryptPassword(password?: string) {
  if (!password) return "";
  return hash(password, 8);
}
