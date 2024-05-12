/*
  Warnings:

  - Added the required column `currency_name` to the `Accounts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `default` to the `Accounts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `accounts` ADD COLUMN `currency_name` VARCHAR(191) NOT NULL,
    ADD COLUMN `default` BOOLEAN NOT NULL;

-- CreateTable
CREATE TABLE `Currency` (
    `name` VARCHAR(191) NOT NULL,
    `value` DOUBLE NOT NULL,

    UNIQUE INDEX `Currency_name_key`(`name`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Accounts` ADD CONSTRAINT `Accounts_currency_name_fkey` FOREIGN KEY (`currency_name`) REFERENCES `Currency`(`name`) ON DELETE RESTRICT ON UPDATE CASCADE;
