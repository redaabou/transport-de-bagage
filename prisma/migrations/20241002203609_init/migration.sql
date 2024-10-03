/*
  Warnings:

  - You are about to drop the column `description` on the `offer` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `offer` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `offer` table. All the data in the column will be lost.
  - You are about to drop the column `offerId` on the `review` table. All the data in the column will be lost.
  - You are about to drop the `request` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `transportId` to the `Offer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transportId` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `request` DROP FOREIGN KEY `Request_offerId_fkey`;

-- DropForeignKey
ALTER TABLE `request` DROP FOREIGN KEY `Request_userId_fkey`;

-- DropForeignKey
ALTER TABLE `review` DROP FOREIGN KEY `Review_offerId_fkey`;

-- AlterTable
ALTER TABLE `offer` DROP COLUMN `description`,
    DROP COLUMN `price`,
    DROP COLUMN `title`,
    ADD COLUMN `status` VARCHAR(191) NOT NULL DEFAULT 'PENDING',
    ADD COLUMN `transportId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `review` DROP COLUMN `offerId`,
    ADD COLUMN `transportId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `request`;

-- CreateTable
CREATE TABLE `Transport` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `image` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `pricePerKm` DOUBLE NOT NULL,
    `ownerId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Transport` ADD CONSTRAINT `Transport_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Offer` ADD CONSTRAINT `Offer_transportId_fkey` FOREIGN KEY (`transportId`) REFERENCES `Transport`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_transportId_fkey` FOREIGN KEY (`transportId`) REFERENCES `Transport`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
