-- AlterTable
ALTER TABLE `accounts` MODIFY `default` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `income_types` MODIFY `in_or_out` VARCHAR(191) NOT NULL;
