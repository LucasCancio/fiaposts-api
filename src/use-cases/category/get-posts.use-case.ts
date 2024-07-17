import { IPostRepository } from "@/repositories/interfaces/post.repository.interface";

export class GetPostsByCategoryUseCase {
  constructor(private readonly postRepository: IPostRepository) {}

  async handler(categoryId: number) {
    return await this.postRepository.getByCategory(categoryId);
  }
}
