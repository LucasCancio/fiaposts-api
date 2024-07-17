import { IPostRepository } from "@/repositories/interfaces/post.repository.interface";

export class GetAllPostsUseCase {
  constructor(private readonly postRepository: IPostRepository) {}

  async handler() {
    return await this.postRepository.getAll();
  }
}
