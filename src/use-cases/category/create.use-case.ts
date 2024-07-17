import { CreateCategoryDTO } from "@/dtos/category/create.dto";
import { ICategoryRepository } from "@/repositories/interfaces/category.repository.interface";

export class CreateCategoryUseCase {
  constructor(private readonly categoryRepository: ICategoryRepository) {}

  async handler(dto: CreateCategoryDTO) {
    return this.categoryRepository.create(dto);
  }
}
