/*
  Warnings:

  - You are about to drop the column `user_id` on the `user_goal` table. All the data in the column will be lost.
  - Added the required column `account_id` to the `User_goal` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `user_goal` DROP FOREIGN KEY `User_goal_user_id_fkey`;

-- AlterTable
ALTER TABLE `user_goal` DROP COLUMN `user_id`,
    ADD COLUMN `account_id` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `User_goal` ADD CONSTRAINT `User_goal_account_id_fkey` FOREIGN KEY (`account_id`) REFERENCES `Accounts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
