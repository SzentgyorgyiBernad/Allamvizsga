/*
  Warnings:

  - You are about to alter the column `currency_name` on the `accounts` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - A unique constraint covering the columns `[id]` on the table `Currency` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id` to the `Currency` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `accounts` DROP FOREIGN KEY `Accounts_currency_name_fkey`;

-- DropIndex
DROP INDEX `Currency_name_key` ON `currency`;

-- AlterTable
ALTER TABLE `accounts` MODIFY `currency_name` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `currency` ADD COLUMN `id` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Currency_id_key` ON `Currency`(`id`);

-- AddForeignKey
ALTER TABLE `Accounts` ADD CONSTRAINT `Accounts_currency_name_fkey` FOREIGN KEY (`currency_name`) REFERENCES `Currency`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
