import { Category, Post, Teacher } from "@prisma/client";

export type CompletePostDTO = Post & {
  categories: Category[];
  teacher: Omit<Teacher, "password">;
};
