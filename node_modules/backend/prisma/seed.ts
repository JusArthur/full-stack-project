import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // A dummy menu item is required first to satisfy the foreign key constraint on the reviews
  const item = await prisma.menuItem.create({
    data: {
      name: 'Signature Dark Roast',
      description: 'Our classic dark roast coffee.',
      price: 2.50,
    }
  });

  await prisma.menuReview.createMany({
    data: [
      { author: 'Jane Doe', rating: 5, comment: 'Absolutely love this coffee!', menuItemId: item.id },
      { author: 'John Smith', rating: 4, comment: 'Great taste, served hot.', menuItemId: item.id },
      { author: 'Alice Johnson', rating: 3, comment: 'Good, but a bit too bitter for me.', menuItemId: item.id }
    ]
  });

  console.log('Database successfully seeded with initial menu item and reviews.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });