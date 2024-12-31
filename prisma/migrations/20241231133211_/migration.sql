/*
  Warnings:

  - Added the required column `userEmail` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `session` DROP FOREIGN KEY `Session_userId_fkey`;

-- AlterTable
ALTER TABLE `session` ADD COLUMN `userEmail` VARCHAR(191) NOT NULL;
