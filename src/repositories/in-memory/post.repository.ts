import { Post } from "@prisma/client";
import { IPostRepository } from "../interfaces/post.repository.interface";
import { PostWithCategoriesDTO } from "@/dtos/post/post-with-categories.dto";
import { SearchPostDTO } from "@/dtos/post/search.dto";
import { InMemoryCategoryRepository } from "./category.repository";

export class InMemoryPostRepository implements IPostRepository {
  public posts: PostWithCategoriesDTO[] = [
    {
      id: 1,
      title: "Post 1",
      content: "Post 1",
      createdAt: new Date(),
      imageUrl: "https://via.placeholder.com/150",
      slug: "post-1",
      authorId: 1,
      updatedAt: new Date(),
      categories: [],
    },
    {
      id: 2,
      title: "Post 2",
      content: "Post 2",
      createdAt: new Date(),
      imageUrl: "https://via.placeholder.com/150",
      slug: "post-2",
      authorId: 1,
      updatedAt: new Date(),
      categories: [],
    },
    {
      id: 3,
      title: "Post 3",
      content: "Post 3",
      createdAt: new Date(),
      imageUrl: "https://via.placeholder.com/150",
      slug: "post-3",
      authorId: 2,
      updatedAt: new Date(),
      categories: [],
    },
  ];

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

    /* const posts = await prisma.post.findMany({
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
 */
    throw new Error("Method not implemented.");
  }

  async getByCategory(categoryId: number): Promise<PostWithCategoriesDTO[]> {
    const posts = this.posts.filter((post) =>
      post.categories.some((category) => category.id === categoryId)
    );
    return Promise.resolve(posts);
  }

  async findById(id: number): Promise<PostWithCategoriesDTO | null> {
    const post = this.posts.find((post) => post.id === id);
    return Promise.resolve(post || null);
  }

  async create(post: Post, categoriesIds: number[]): Promise<Post> {
    const categories = await new InMemoryCategoryRepository().findAllByIds(
      categoriesIds
    );

    this.posts.push({
      ...post,
      categories,
    });

    return post;
  }

  async update(post: Post, categoriesIds: number[]): Promise<Post> {
    /* prisma.post.update({
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

    return updatedPost; */
    throw new Error("Method not implemented.");
  }

  async delete(id: number): Promise<boolean> {
    this.posts = this.posts.filter((post) => post.id !== id);
    return Promise.resolve(true);
  }
}
