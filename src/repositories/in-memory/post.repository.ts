import { Post } from "@prisma/client";
import { IPostRepository } from "../interfaces/post.repository.interface";
import { PostWithCategoriesDTO } from "@/dtos/post/post-with-categories.dto";
import { SearchPostDTO, SearchPostOutput } from "@/dtos/post/search.dto";
import { InMemoryCategoryRepository } from "./category.repository";
import { CompletePostDTO } from "@/dtos/post/complete-post.dto";

export class InMemoryPostRepository implements IPostRepository {
  private categories = new InMemoryCategoryRepository().categories;

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
      categories: this.categories,
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
      categories: this.categories,
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
      categories: this.categories,
    },
  ];

  getAllWithTeachers(): Promise<CompletePostDTO[]> {
    return Promise.resolve(
      this.posts.map((post) => {
        return {
          ...post,
          teacher: {
            id: post.authorId,
            name: "Teacher",
            email: "teacher@id",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        } as CompletePostDTO;
      })
    );
  }

  getAllPaginated(dto?: SearchPostDTO): Promise<SearchPostOutput> {
    throw new Error("Method not implemented.");
  }

  getAll(): Promise<PostWithCategoriesDTO[]> {
    return Promise.resolve(this.posts);
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
    const categories = await new InMemoryCategoryRepository().findAllByIds(
      categoriesIds
    );

    this.posts = this.posts.map((p) => {
      if (p.id === post.id) {
        return {
          ...p,
          ...post,
          categories,
        };
      }
      return p;
    });

    return Promise.resolve(post);
  }

  async delete(id: number): Promise<boolean> {
    this.posts = this.posts.filter((post) => post.id !== id);
    return Promise.resolve(true);
  }
}
