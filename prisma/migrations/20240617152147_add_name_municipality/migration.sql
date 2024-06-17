/*
  Warnings:

  - You are about to drop the column `user_id` on the `municipalities` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `municipalities` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `municipalities` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `responsible` on the `municipalities` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "municipalities" DROP CONSTRAINT "municipalities_user_id_fkey";

-- AlterTable
ALTER TABLE "municipalities" DROP COLUMN "user_id",
ADD COLUMN     "name" TEXT NOT NULL,
DROP COLUMN "responsible",
ADD COLUMN     "responsible" INTEGER NOT NULL,
ALTER COLUMN "state" SET DEFAULT 'APPROVED';

-- CreateIndex
CREATE UNIQUE INDEX "municipalities_name_key" ON "municipalities"("name");

-- AddForeignKey
ALTER TABLE "municipalities" ADD CONSTRAINT "municipalities_responsible_fkey" FOREIGN KEY ("responsible") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
