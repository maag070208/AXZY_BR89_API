/*
  Warnings:

  - Added the required column `userId` to the `BoxOut` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Tips` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `BoxOut` ADD COLUMN `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Tips` ADD COLUMN `userId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `BoxOut` ADD CONSTRAINT `BoxOut_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tips` ADD CONSTRAINT `Tips_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
