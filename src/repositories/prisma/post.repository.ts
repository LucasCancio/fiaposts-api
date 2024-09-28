import { Post, Prisma } from "@prisma/client";
import { IPostRepository } from "../interfaces/post.repository.interface";
import { prisma } from "@/lib/prisma/client";
import { PostWithCategoriesDTO } from "@/dtos/post/post-with-categories.dto";
import { SearchPostDTO, SearchPostOutput } from "@/dtos/post/search.dto";
import { CompletePostDTO } from "@/dtos/post/complete-post.dto";

const IncludeCategoryPrisma = {
  PostCategory: { select: { category: true } },
};

const IncludeCategoryAndAuthorPrisma = {
  PostCategory: { select: { category: true } },
  author: true,
};

type PrismaPostWithCategory = Prisma.PostGetPayload<{
  include: typeof IncludeCategoryPrisma;
}>;

type PrismaPostWithCategoryAndAuthor = Prisma.PostGetPayload<{
  include: typeof IncludeCategoryAndAuthorPrisma;
}>;

export class PrismaPostRepository implements IPostRepository {
  async getAllWithTeachers(): Promise<CompletePostDTO[]> {
    const posts = await prisma.post.findMany({
      include: IncludeCategoryAndAuthorPrisma,
    });

    return posts
      .map((post) => this.convertToCompletePostDTO(post))
      .filter((post) => post !== null) as CompletePostDTO[];
  }

  async getAll(): Promise<PostWithCategoriesDTO[]> {
    const posts = await prisma.post.findMany({
      include: IncludeCategoryPrisma,
    });

    return this.convertToPostsDTO(posts);
  }

  async getAllPaginated(
    dto?: SearchPostDTO,
    authorId?: number
  ): Promise<SearchPostOutput> {
    const {
      page = 1,
      perPage = 20,
      sortBy = "createdAt",
      order = "desc",
      title,
      content,
    } = dto || {};

    let where: Prisma.PostWhereInput = {
      OR:
        title || content
          ? [
              {
                title: title
                  ? {
                      contains: title,
                      mode: "insensitive",
                    }
                  : undefined,
              },
              {
                content: content
                  ? {
                      contains: content,
                      mode: "insensitive",
                    }
                  : undefined,
              },
            ]
          : undefined,
      AND: authorId ? { authorId } : undefined,
    };

    const allPostsFiltered = await prisma.post.findMany({
      where,
      //skip: (page - 1) * perPage,
      //take: perPage,
      orderBy: {
        [sortBy]: order,
      },
      include: IncludeCategoryAndAuthorPrisma,
    });

    return {
      posts: this.convertToCompletePostsDTO(
        allPostsFiltered.slice((page - 1) * perPage, page * perPage)
      ),
      meta: {
        page,
        pageIndex: page - 1,
        perPage,
        totalCount: allPostsFiltered.length,
      },
    };
  }

  async getByCategory(categoryId: number): Promise<PostWithCategoriesDTO[]> {
    const posts = await prisma.post.findMany({
      where: {
        PostCategory: {
          some: {
            categoryId,
          },
        },
      },
      include: IncludeCategoryPrisma,
    });
    return this.convertToPostsDTO(posts);
  }

  async findById(id: number): Promise<CompletePostDTO | null> {
    const post = await prisma.post.findUnique({
      where: {
        id,
      },
      include: IncludeCategoryAndAuthorPrisma,
    });
    return this.convertToCompletePostDTO(post);
  }

  async create(post: Post, categoriesIds: number[]): Promise<Post> {
    const created = await prisma.post.create({
      data: {
        content: post.content,
        title: post.title,
        slug: post.slug,
        imageUrl: post.imageUrl,
        authorId: post.authorId,
      },
    });

    await prisma.postCategory.createMany({
      data: categoriesIds.map((categoryId) => ({
        postId: created.id,
        categoryId,
      })),
    });

    return created;
  }

  async update(post: Post, categoriesIds: number[]): Promise<Post> {
    const [, , updatedPost] = await prisma.$transaction([
      this.deleteCategories(post.id),
      this.createCategories(post.id, categoriesIds),
      prisma.post.update({
        where: {
          id: post.id,
        },
        data: {
          content: post.content,
          title: post.title,
          slug: post.slug,
          imageUrl: post.imageUrl,
          updatedAt: new Date(),
        },
      }),
    ]);
    return updatedPost;
  }

  private deleteCategories(postId: number) {
    return prisma.postCategory.deleteMany({
      where: {
        postId,
      },
    });
  }

  private createCategories(postId: number, categoriesIds: number[]) {
    return prisma.postCategory.createMany({
      data: categoriesIds.map((categoryId) => ({
        postId,
        categoryId,
      })),
    });
  }

  async delete(id: number): Promise<boolean> {
    prisma.$transaction([
      this.deleteCategories(id),
      prisma.post.delete({
        where: {
          id,
        },
      }),
    ]);

    return true;
  }

  private convertToPostsDTO(
    posts: PrismaPostWithCategory[]
  ): PostWithCategoriesDTO[] {
    return posts
      .map((post) => this.convertToPostDTO(post))
      .filter((post) => post !== null);
  }

  private convertToPostDTO(
    post: PrismaPostWithCategory | null
  ): PostWithCategoriesDTO | null {
    if (!post) return null;

    return {
      id: post.id,
      authorId: post.authorId,
      content: post.content,
      title: post.title,
      slug: post.slug,
      imageUrl: post.imageUrl,
      categories: post.PostCategory.map((pc) => pc.category) || [],
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    };
  }

  private convertToCompletePostsDTO(
    posts: PrismaPostWithCategoryAndAuthor[]
  ): CompletePostDTO[] {
    return posts
      .map((post) => this.convertToCompletePostDTO(post))
      .filter((post) => post !== null);
  }

  private convertToCompletePostDTO(
    post: PrismaPostWithCategoryAndAuthor | null
  ): CompletePostDTO | null {
    if (!post) return null;

    return {
      id: post.id,
      authorId: post.authorId,
      content: post.content,
      title: post.title,
      slug: post.slug,
      imageUrl: post.imageUrl,
      categories: post.PostCategory.map((pc) => pc.category) || [],
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      teacher: {
        id: post.author.id,
        name: post.author.name,
        email: post.author.email,
        createdAt: post.author.createdAt,
        updatedAt: post.author.updatedAt,
      },
    };
  }
}
