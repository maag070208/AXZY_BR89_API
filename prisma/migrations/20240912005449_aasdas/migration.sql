/*
  Warnings:

  - Added the required column `boxCutId` to the `Tips` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `BoxCut` ADD COLUMN `status` VARCHAR(191) NOT NULL DEFAULT 'open';

-- AlterTable
ALTER TABLE `Tips` ADD COLUMN `boxCutId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Tips` ADD CONSTRAINT `Tips_boxCutId_fkey` FOREIGN KEY (`boxCutId`) REFERENCES `BoxCut`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
