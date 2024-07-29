const Teacher = {
  type: "object",
  properties: {
    id: { type: "integer" },
    email: { type: "string" },
    name: { type: ["string", "null"] },
    password: { type: "string" },
    createdAt: { type: "string", format: "date-time" },
    updatedAt: { type: "string", format: "date-time" },
    Post: {
      type: "array",
      items: { $ref: "#/definitions/Post" },
    },
  },
  required: ["id", "email", "password", "createdAt", "updatedAt"],
};

const Post = {
  type: "object",
  properties: {
    id: { type: "integer" },
    title: { type: "string" },
    content: { type: "string" },
    imageUrl: { type: ["string", "null"] },
    slug: { type: ["string", "null"] },
    authorId: { type: "integer" },
    createdAt: { type: "string", format: "date-time" },
    updatedAt: { type: "string", format: "date-time" },
    author: { $ref: "#/definitions/Teacher" },
    PostCategory: {
      type: "array",
      items: { $ref: "#/definitions/PostCategory" },
    },
  },
  required: ["id", "title", "content", "authorId", "createdAt", "updatedAt"],
};

const Category = {
  type: "object",
  properties: {
    id: { type: "integer" },
    name: { type: "string" },
    createdAt: { type: "string", format: "date-time" },
    updatedAt: { type: "string", format: "date-time" },
    PostCategory: {
      type: "array",
      items: { $ref: "#/definitions/PostCategory" },
    },
  },
  required: ["id", "name", "createdAt", "updatedAt"],
};

const CompletePostDTO = {
  type: "object",
  properties: {
    id: { type: "integer" },
    title: { type: "string" },
    content: { type: "string" },
    imageUrl: { type: ["string", "null"] },
    slug: { type: ["string", "null"] },
    authorId: { type: "integer" },
    createdAt: { type: "string", format: "date-time" },
    updatedAt: { type: "string", format: "date-time" },
    categories: {
      type: "array",
      items: { $ref: "#/definitions/Category" },
    },
    teacher: {
      type: "object",
      properties: {
        id: { type: "integer" },
        email: { type: "string" },
        name: { type: ["string", "null"] },
        createdAt: { type: "string", format: "date-time" },
        updatedAt: { type: "string", format: "date-time" },
        Post: {
          type: "array",
          items: { $ref: "#/definitions/Post" },
        },
      },
      required: ["id", "email", "createdAt", "updatedAt"],
    },
  },
  required: [
    "id",
    "title",
    "content",
    "authorId",
    "createdAt",
    "updatedAt",
    "categories",
    "teacher",
  ],
};

const PostWithCategoriesDTO = {
  type: "object",
  properties: {
    id: { type: "integer" },
    title: { type: "string" },
    content: { type: "string" },
    imageUrl: { type: ["string", "null"] },
    slug: { type: ["string", "null"] },
    authorId: { type: "integer" },
    createdAt: { type: "string", format: "date-time" },
    updatedAt: { type: "string", format: "date-time" },
    categories: {
      type: "array",
      items: { $ref: "#/definitions/Category" },
    },
  },
  required: [
    "id",
    "title",
    "content",
    "authorId",
    "createdAt",
    "updatedAt",
    "categories",
  ],
};

export const definitions = {
  Teacher,
  Post,
  Category,
  CompletePostDTO,
  PostWithCategoriesDTO,
};
