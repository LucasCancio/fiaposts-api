import { IPostRepository } from "@/repositories/interfaces/post.repository.interface";

export class FindPostByIdUseCase {
  constructor(private readonly postRepository: IPostRepository) {}

  async handler(id: number) {
    return await this.postRepository.findById(id);
  }
}
