/*
  Warnings:

  - Added the required column `userId` to the `MenuReview` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CommunityPost" ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "MenuReview" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "userId" TEXT;
