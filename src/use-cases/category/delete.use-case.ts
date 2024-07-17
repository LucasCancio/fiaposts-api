import { ResourceNotFoundError } from "@/errors/resource-not-found-error";
import { ICategoryRepository } from "@/repositories/interfaces/category.repository.interface";

export class DeleteCategoryUseCase {
  constructor(private readonly categoryRepository: ICategoryRepository) {}

  async handler(id: number) {
    const [category] = await this.categoryRepository.findAllByIds([id]);
    if (!category) throw new ResourceNotFoundError(`Post ${id}`);

    return this.categoryRepository.delete(id);
  }
}
