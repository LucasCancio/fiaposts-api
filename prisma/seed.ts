import { encryptPassword } from "@/utils/encrypt-password";
import { PrismaClient } from "@prisma/client";
import { capitalize, random } from "lodash";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();
async function main() {
  console.log("Seeding database...");
  await prisma.postCategory.deleteMany();
  await prisma.category.deleteMany();
  await prisma.post.deleteMany();

  await prisma.$transaction([
    //Teachers
    prisma.teacher.upsert({
      where: { id: 1 },
      update: {},
      create: {
        id: 1,
        email: "professor@email.com",
        name: "Professor 1",
        password: (await encryptPassword("123456789")) as string,
      },
    }),
    prisma.teacher.upsert({
      where: { id: 2 },
      update: {},
      create: {
        id: 2,
        email: "professor2@email.com",
        name: "Professor 2",
        password: (await encryptPassword("123456789")) as string,
      },
    }),
    //Categories
    prisma.category.upsert({
      where: { id: 1 },
      update: {},
      create: {
        id: 1,
        name: "Dicas de Estudo",
        color: "#FDD017",
      },
    }),
    prisma.category.upsert({
      where: { id: 2 },
      update: {},
      create: {
        id: 2,
        name: "Guia de carreira",
        color: "#00FF00",
      },
    }),
    prisma.category.upsert({
      where: { id: 3 },
      update: {},
      create: {
        id: 3,
        name: "Ciência e Tecnologia",
        color: "#0000FF",
      },
    }),
  ]);

  //Posts
  for (let i = 1; i <= 100; i++) {
    const created = await prisma.post.create({
      data: {
        title: capitalize(faker.word.words(4)),
        slug: faker.lorem.slug(),
        content: faker.lorem.lines({ min: 10, max: 50 }),
        imageUrl: faker.image.url(),
        authorId: random(1, 2),
        updatedAt: faker.date.past(),
      },
    });

    const quantityCategories = random(1, 3);
    for (let categoryId = 1; categoryId <= quantityCategories; categoryId++) {
      await prisma.postCategory.create({
        data: {
          categoryId,
          postId: created.id,
        },
      });
    }
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
    console.log("Seed complete");
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
