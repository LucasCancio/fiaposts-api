import { Category, Post } from "@prisma/client";

export type PostWithCategoriesDTO = Post & {
  categories: Category[];
};
