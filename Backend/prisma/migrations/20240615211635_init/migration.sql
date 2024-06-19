/*
  Warnings:

  - Added the required column `amount` to the `User_goal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endAmount` to the `User_goal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user_goal` ADD COLUMN `amount` DOUBLE NOT NULL,
    ADD COLUMN `endAmount` DOUBLE NOT NULL;
