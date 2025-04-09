import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // User 1
  const user1 = await prisma.user.create({
    data: {
      email: 'ash@pokemon.com',
      password: 'pikachu123',
    },
  });

  await prisma.pet.create({
    data: {
      name: 'Pikachu',
      hunger: 20,
      happiness: 80,
      level: 5,
      ownerId: user1.id, // liên kết đúng user
    },
  });

  // User 2
  const user2 = await prisma.user.create({
    data: {
      email: 'misty@pokemon.com',
      password: 'staryu456',
    },
  });

  await prisma.pet.create({
    data: {
      name: 'Staryu',
      hunger: 10,
      happiness: 90,
      level: 3,
      ownerId: user2.id,
    },
  });

  console.log('🌱 Seeded users and pets!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
