import { PostWithCategoriesDTO } from "@/dtos/post/post-with-categories.dto";
import { SearchPostDTO } from "@/dtos/post/search.dto";
import { Post } from "@prisma/client";

export interface IPostRepository {
  getAll(dto?: SearchPostDTO): Promise<PostWithCategoriesDTO[]>;
  getByCategory(categoryId: number): Promise<PostWithCategoriesDTO[]>;
  findById(id: number): Promise<PostWithCategoriesDTO | null>;
  create(post: Partial<Post>, categoriesIds: number[]): Promise<Post>;
  update(post: Post, categoriesIds: number[]): Promise<Post>;
  delete(id: number): Promise<boolean>;
}
