import { UpdatePostDTO } from "@/dtos/post/update.dto";
import { ForbiddenError } from "@/errors/forbidden-error";
import { ResourceNotFoundError } from "@/errors/resource-not-found-error";
import { ICategoryRepository } from "@/repositories/interfaces/category.repository.interface";
import { IPostRepository } from "@/repositories/interfaces/post.repository.interface";

export class UpdatePostUseCase {
  constructor(
    private readonly postRepository: IPostRepository,
    private readonly categoryRepository: ICategoryRepository
  ) {}

  async handler(id: number, dto: UpdatePostDTO, teacherId: number) {
    const post = await this.postRepository.findById(id);
    if (!post) throw new ResourceNotFoundError(`Post ${id}`);
    if (post.authorId !== teacherId) throw new ForbiddenError();

    let categoriesIds = post.categories.map((c) => c.id);

    if (dto.categoriesIds != null) {
      const categories = dto.categoriesIds
        ? await this.categoryRepository.findAllByIds(dto.categoriesIds)
        : [];

      if (categories.length !== dto.categoriesIds?.length) {
        const categoriesNotFound =
          dto.categoriesIds?.filter(
            (category) =>
              categories.find((c) => c.id === category) === undefined
          ) ?? [];

        throw new ResourceNotFoundError(
          `Categories ${categoriesNotFound.join(", ")}`
        );
      }

      categoriesIds = dto.categoriesIds;
    }

    post.content = dto.content || post.content;
    post.title = dto.title || post.title;
    post.imageUrl = dto.imageUrl || post.imageUrl;
    post.slug = dto.slug || post.slug;
    post.updatedAt = new Date();

    return this.postRepository.update(post, categoriesIds);
  }
}
