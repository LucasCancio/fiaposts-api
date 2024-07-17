import { CreateCategoryDTO } from "@/dtos/category/create.dto";
import { Category } from "@prisma/client";

export interface ICategoryRepository {
  getAll(): Promise<Category[]>;
  findAllByIds(ids: number[]): Promise<Category[]>;
  create(category: CreateCategoryDTO): Promise<Category>;
  delete(id: number): Promise<boolean>;
}
