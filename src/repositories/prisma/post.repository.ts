import { Post, Prisma } from "@prisma/client";
import { IPostRepository } from "../interfaces/post.repository.interface";
import { prisma } from "@/lib/prisma/client";
import { PostWithCategoriesDTO } from "@/dtos/post/post-with-categories.dto";
import { SearchPostDTO } from "@/dtos/post/search.dto";

const IncludeCategoryPrisma = {
  PostCategory: { select: { category: true } },
};

type PrismaPostWithCategory = Prisma.PostGetPayload<{
  include: typeof IncludeCategoryPrisma;
}>;

export class PrismaPostRepository implements IPostRepository {
  async getAll(
    dto: SearchPostDTO | undefined
  ): Promise<PostWithCategoriesDTO[]> {
    const {
      page = 1,
      perPage = 20,
      sortBy = "createdAt",
      order = "desc",
      title,
      content,
    } = dto || {};

    const posts = await prisma.post.findMany({
      where: {
        OR: [
          {
            title: {
              contains: title,
              mode: "insensitive",
            },
          },
          {
            content: {
              contains: content,
              mode: "insensitive",
            },
          },
        ],
      },
      skip: (page - 1) * perPage,
      take: perPage,
      orderBy: {
        [sortBy]: order,
      },
      include: IncludeCategoryPrisma,
    });

    return this.convertToPostsDTO(posts);
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

  async findById(id: number): Promise<PostWithCategoriesDTO | null> {
    const post = await prisma.post.findUnique({
      where: {
        id,
      },
      include: IncludeCategoryPrisma,
    });
    return this.convertToPostDTO(post);
  }

  create(post: Post, categoriesIds: number[]): Promise<Post> {
    return prisma.post.create({
      data: {
        ...post,
        PostCategory: {
          create: categoriesIds.map((categoryId) => ({
            categoryId,
          })),
        },
      },
    });
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
    return !!(await prisma.post.delete({
      where: {
        id,
      },
    }));
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
}
