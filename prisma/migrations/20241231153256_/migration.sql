/*
  Warnings:

  - You are about to drop the column `author` on the `blogpost` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `blogpost` DROP COLUMN `author`;

-- AddForeignKey
ALTER TABLE `Session` ADD CONSTRAINT `Session_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
