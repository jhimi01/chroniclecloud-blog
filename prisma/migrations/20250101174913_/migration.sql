-- DropForeignKey
ALTER TABLE `session` DROP FOREIGN KEY `Session_userId_fkey`;

-- AddForeignKey
ALTER TABLE `Session` ADD CONSTRAINT `Session_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `session` RENAME INDEX `Session_userId_fkey` TO `Session_userId_idx`;
