import { PrismaClient, Prisma } from "../app/generated/prisma";

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
  {
    name: "Alice",
    email: "alice@prisma.io",
    notes: {
      create: [
         {
          title: "Follow Prisma on Twitter",
          content: "https://www.twitter.com/prisma",
          location: 'Start',
          destination: 'end',
          date: `${Date.now()}`
        },      ],
    },
  },
  {
    name: "Bob",
    email: "bob@prisma.io",
    notes: {
      create: [
        {
          title: "Follow Prisma on Twitter",
          content: "https://www.twitter.com/prisma",
          location: 'Start',
          destination: 'end',
          date: `${Date.now()}`
        },
      ],
    },
  },
];

export async function main() {
  for (const u of userData) {
    await prisma.user.create({ data: u });
  }
}

main();