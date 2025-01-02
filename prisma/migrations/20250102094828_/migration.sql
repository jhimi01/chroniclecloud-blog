/*
  Warnings:

  - Made the column `userId` on table `blogpost` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userEmail` on table `blogpost` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `blogpost` DROP FOREIGN KEY `BlogPost_userId_fkey`;

-- AlterTable
ALTER TABLE `blogpost` MODIFY `userId` VARCHAR(191) NOT NULL,
    MODIFY `userEmail` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `BlogPost` ADD CONSTRAINT `BlogPost_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
