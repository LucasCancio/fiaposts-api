import { ICategoryRepository } from "@/repositories/interfaces/category.repository.interface";

export class FindCategoryByIdUseCase {
  constructor(private readonly categoryRepository: ICategoryRepository) {}

  async handler(ids: number[]) {
    const [category] = await this.categoryRepository.findAllByIds(ids);
    return category;
  }
}
