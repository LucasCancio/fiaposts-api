import { IPostRepository } from "@/repositories/interfaces/post.repository.interface";

export class GetAllPostsAdminUseCase {
  constructor(private readonly postRepository: IPostRepository) {}

  async handler() {
    return await this.postRepository.getAllWithTeachers();
  }
}
