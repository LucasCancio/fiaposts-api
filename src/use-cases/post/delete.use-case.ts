import { ForbiddenError } from "@/errors/forbidden-error";
import { ResourceNotFoundError } from "@/errors/resource-not-found-error";
import { IPostRepository } from "@/repositories/interfaces/post.repository.interface";

export class DeletePostUseCase {
  constructor(private readonly postRepository: IPostRepository) {}

  async handler(id: number, teacherId: number) {
    const post = await this.postRepository.findById(id);
    if (!post) throw new ResourceNotFoundError(`Post ${id}`);

    if (post.authorId !== teacherId) throw new ForbiddenError();

    return this.postRepository.delete(id);
  }
}
