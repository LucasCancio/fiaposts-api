import { SearchPostDTO } from "@/dtos/post/search.dto";
import { IPostRepository } from "@/repositories/interfaces/post.repository.interface";

export class SearchPostsUseCase {
  constructor(private readonly postRepository: IPostRepository) {}

  async handler(dto: SearchPostDTO) {
    return await this.postRepository.getAllPaginated(dto);
  }
}
