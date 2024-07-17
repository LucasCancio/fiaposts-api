import { CreatePostDTO } from "@/dtos/post/create.dto";
import { ResourceNotFoundError } from "@/errors/resource-not-found-error";
import { ICategoryRepository } from "@/repositories/interfaces/category.repository.interface";
import { IPostRepository } from "@/repositories/interfaces/post.repository.interface";
import { ITeacherRepository } from "@/repositories/interfaces/teacher.repository.interface";

export class CreatePostUseCase {
  constructor(
    private readonly postRepository: IPostRepository,
    private readonly categoryRepository: ICategoryRepository,
    private readonly teacherRepository: ITeacherRepository
  ) {}

  async handler(dto: CreatePostDTO, authorId: number) {
    const categories = await this.categoryRepository.findAllByIds(
      dto.categoriesIds
    );

    if (categories.length !== dto.categoriesIds.length) {
      const categoriesNotFound = dto.categoriesIds.filter(
        (category) => categories.find((c) => c.id === category) === undefined
      );

      throw new ResourceNotFoundError(
        `Categories ${categoriesNotFound.join(", ")}`
      );
    }

    const teacher = await this.teacherRepository.findById(authorId);
    if (!teacher) throw new ResourceNotFoundError(`Teacher ${authorId}`);

    return this.postRepository.create(
      {
        authorId: teacher.id,
        title: dto.title,
        content: dto.content,
        imageUrl: dto.imageUrl,
        slug: dto.slug,
      },
      dto.categoriesIds
    );
  }
}
