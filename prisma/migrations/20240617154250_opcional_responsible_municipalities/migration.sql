-- DropForeignKey
ALTER TABLE "municipalities" DROP CONSTRAINT "municipalities_responsible_fkey";

-- AlterTable
ALTER TABLE "municipalities" ALTER COLUMN "responsible" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "municipalities" ADD CONSTRAINT "municipalities_responsible_fkey" FOREIGN KEY ("responsible") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
