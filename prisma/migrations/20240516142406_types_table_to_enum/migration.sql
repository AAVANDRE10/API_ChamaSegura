/*
  Warnings:

  - You are about to drop the column `burn_type_id` on the `burn` table. All the data in the column will be lost.
  - You are about to drop the column `state_id` on the `municipality` table. All the data in the column will be lost.
  - You are about to drop the column `taxNumber` on the `municipality` table. All the data in the column will be lost.
  - You are about to drop the column `state_users_id` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `user_type_id` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `burn_type` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `state` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `state_user` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_type` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `type` to the `burn` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `municipality` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tax_number` to the `municipality` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "BurnType" AS ENUM ('REGCLEAN', 'PARTICULAR');

-- CreateEnum
CREATE TYPE "State" AS ENUM ('APPROVED', 'PENDING', 'PENDINGCM', 'DENIED');

-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('REGULAR', 'ICNF', 'CM');

-- CreateEnum
CREATE TYPE "StateUser" AS ENUM ('ENABLED', 'DISBALED');

-- DropForeignKey
ALTER TABLE "burn" DROP CONSTRAINT "burn_burn_type_id_fkey";

-- DropForeignKey
ALTER TABLE "municipality" DROP CONSTRAINT "municipality_state_id_fkey";

-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_state_users_id_fkey";

-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_user_type_id_fkey";

-- AlterTable
ALTER TABLE "burn" DROP COLUMN "burn_type_id",
ADD COLUMN     "type" "BurnType" NOT NULL;

-- AlterTable
ALTER TABLE "municipality" DROP COLUMN "state_id",
DROP COLUMN "taxNumber",
ADD COLUMN     "state" "State" NOT NULL,
ADD COLUMN     "tax_number" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "state_users_id",
DROP COLUMN "user_type_id",
ADD COLUMN     "state" "StateUser" NOT NULL,
ADD COLUMN     "type" "UserType" NOT NULL;

-- DropTable
DROP TABLE "burn_type";

-- DropTable
DROP TABLE "state";

-- DropTable
DROP TABLE "state_user";

-- DropTable
DROP TABLE "user_type";
