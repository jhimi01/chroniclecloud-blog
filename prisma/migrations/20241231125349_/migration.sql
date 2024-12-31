/*
  Warnings:

  - You are about to drop the column `author` on the `blogpost` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `blogpost` DROP COLUMN `author`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `created_at`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- RenameIndex
ALTER TABLE `blogpost` RENAME INDEX `BlogPost_userId_fkey` TO `BlogPost_userId_idx`;

-- RenameIndex
ALTER TABLE `session` RENAME INDEX `Session_userId_fkey` TO `Session_userId_idx`;
