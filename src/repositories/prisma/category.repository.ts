import { Category } from "@prisma/client";
import { ICategoryRepository } from "../interfaces/category.repository.interface";
import { prisma } from "@/lib/prisma/client";
import { CreateCategoryDTO } from "@/dtos/category/create.dto";

export class PrismaCategoryRepository implements ICategoryRepository {
  getAll(): Promise<Category[]> {
    return prisma.category.findMany();
  }

  findAllByIds(ids: number[]): Promise<Category[]> {
    return prisma.category.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }

  create(category: CreateCategoryDTO): Promise<Category> {
    return prisma.category.create({
      data: category,
    });
  }

  async delete(id: number): Promise<boolean> {
    return !!(await prisma.category.delete({
      where: {
        id,
      },
    }));
  }
}
