import { SearchPostDTO } from "@/dtos/post/search.dto";
import { IPostRepository } from "@/repositories/interfaces/post.repository.interface";

export class GetAllMyPostsUseCase {
  constructor(private readonly postRepository: IPostRepository) {}

  async handler(dto: SearchPostDTO, userId: number) {
    return await this.postRepository.getAllPaginated(dto, userId);
  }
}
