import { PrismaClient } from '@prisma/client';
import * as itemsData from '../../frontend/src/testData/menuItemsTestData.js';
import * as reviewsData from '../../frontend/src/testData/menuReviewsTestData.js';

const prisma = new PrismaClient();

async function main() {
  console.log("Wiping existing database records...");
  await prisma.menuReview.deleteMany();
  await prisma.menuItem.deleteMany();

  console.log("Extracting existing test data...");
  
  // Dynamically extract the arrays regardless of what your teammate named the exported variables
  const menuItems = Object.values(itemsData).find(val => Array.isArray(val)) as any[] || [];
  const menuReviews = Object.values(reviewsData).find(val => Array.isArray(val)) as any[] || [];

  if (menuItems.length === 0) {
    throw new Error("No array found in menuItemsTestData.");
  }

  console.log("Seeding database with original test data...");

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

  console.log(`Successfully seeded ${menuItems.length} items and ${menuReviews.length} reviews.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });