import { encryptPassword } from "@/utils/encrypt-password";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  console.log("Seeding database...");

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
      },
    }),
    prisma.category.upsert({
      where: { id: 2 },
      update: {},
      create: {
        id: 2,
        name: "Guia de carreira",
      },
    }),
    prisma.category.upsert({
      where: { id: 3 },
      update: {},
      create: {
        id: 3,
        name: "Ciência e Tecnologia",
      },
    }),
  ]);

  //Posts
  await prisma.post.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      title: "Como estudar para o ENEM",
      content:
        "# Dicas de como estudar para o ENEM\n- Faça um cronograma de estudos\n- Revise as provas anteriores\n- Faça simulados",
      authorId: 1,
      PostCategory: {
        create: {
          categoryId: 1,
        },
      },
    },
  });
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
