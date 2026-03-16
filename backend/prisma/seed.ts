import { PrismaClient } from '@prisma/client';
import * as itemsData from '../../frontend/src/testData/menuItemsTestData.js';
import * as reviewsData from '../../frontend/src/testData/menuReviewsTestData.js';

const prisma = new PrismaClient();

async function main() {
  console.log("Wiping existing database records...");
  await prisma.menuReview.deleteMany();
  await prisma.menuItem.deleteMany();

  console.log("Extracting existing test data...");
  const menuItems = Object.values(itemsData).find(val => Array.isArray(val)) as any[] || [];
  const menuReviews = Object.values(reviewsData).find(val => Array.isArray(val)) as any[] || [];

  console.log("Anchoring items in database to support review foreign keys...");
  for (const item of menuItems) {
    await prisma.menuItem.create({
      data: {
        id: item.id,
        name: item.name,
        description: item.description,
        price: item.price,
      }
    });
  }

  console.log("Seeding reviews...");
  for (const review of menuReviews) {
    await prisma.menuReview.create({
      data: {
        id: review.id.toString(),
        author: review.author,
        rating: review.rating,
        comment: review.comment,
        date: new Date(review.date),
        menuItemId: review.menuItemId,
      }
    });
  }

  console.log(`Successfully seeded ${menuReviews.length} reviews attached to ${menuItems.length} anchor items.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });