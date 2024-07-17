import { ICategoryRepository } from "@/repositories/interfaces/category.repository.interface";

export class GetAllCategoriesUseCase {
  constructor(private readonly categoryRepository: ICategoryRepository) {}

  async handler() {
    return await this.categoryRepository.getAll();
  }
}
