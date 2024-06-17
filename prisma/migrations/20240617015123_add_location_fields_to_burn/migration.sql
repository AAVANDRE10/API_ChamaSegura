/*
  Warnings:

  - Added the required column `concelho` to the `burns` table without a default value. This is not possible if the table is not empty.
  - Added the required column `distrito` to the `burns` table without a default value. This is not possible if the table is not empty.
  - Added the required column `freguesia` to the `burns` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "burns" ADD COLUMN     "concelho" TEXT NOT NULL,
ADD COLUMN     "distrito" TEXT NOT NULL,
ADD COLUMN     "freguesia" TEXT NOT NULL;
