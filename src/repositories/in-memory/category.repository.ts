import { Category } from "@prisma/client";
import { ICategoryRepository } from "../interfaces/category.repository.interface";
import { CreateCategoryDTO } from "@/dtos/category/create.dto";

export class InMemoryCategoryRepository implements ICategoryRepository {
  public categories: Category[] = [
    {
      id: 1,
      name: "Category 1",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      name: "Category 2",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 3,
      name: "Category 3",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  getAll(): Promise<Category[]> {
    return Promise.resolve(this.categories);
  }

  findAllByIds(ids: number[]): Promise<Category[]> {
    return Promise.resolve(
      this.categories.filter((category) => ids.includes(category.id))
    );
  }

  create(category: CreateCategoryDTO): Promise<Category> {
    const categoryCreated: Category = {
      createdAt: new Date(),
      id: this.categories.length + 1,
      name: category.name,
      updatedAt: new Date(),
    };

    return Promise.resolve(categoryCreated);
  }

  async delete(id: number): Promise<boolean> {
    this.categories = this.categories.filter((category) => category.id !== id);
    return Promise.resolve(true);
  }
}
