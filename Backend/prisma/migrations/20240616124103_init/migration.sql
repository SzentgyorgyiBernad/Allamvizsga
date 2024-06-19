/*
  Warnings:

  - You are about to drop the column `income_type_id` on the `expenditure_plan` table. All the data in the column will be lost.
  - Added the required column `account_id` to the `Expenditure_plan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `amount` to the `Expenditure_plan` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `expenditure_plan` DROP FOREIGN KEY `Expenditure_plan_income_type_id_fkey`;

-- AlterTable
ALTER TABLE `expenditure_plan` DROP COLUMN `income_type_id`,
    ADD COLUMN `account_id` VARCHAR(191) NOT NULL,
    ADD COLUMN `amount` DOUBLE NOT NULL;

-- AddForeignKey
ALTER TABLE `Expenditure_plan` ADD CONSTRAINT `Expenditure_plan_account_id_fkey` FOREIGN KEY (`account_id`) REFERENCES `Accounts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
