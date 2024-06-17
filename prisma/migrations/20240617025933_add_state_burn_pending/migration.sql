/*
  Warnings:

  - The values [PENDINGCM] on the enum `State` will be removed. If these variants are still used in the database, this will fail.
  - The values [DISBALED] on the enum `StateUser` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "State_new" AS ENUM ('APPROVED', 'PENDING', 'DENIED', 'DELETED');
ALTER TABLE "municipalities" ALTER COLUMN "state" DROP DEFAULT;
ALTER TABLE "municipalities" ALTER COLUMN "state" TYPE "State_new" USING ("state"::text::"State_new");
ALTER TYPE "State" RENAME TO "State_old";
ALTER TYPE "State_new" RENAME TO "State";
DROP TYPE "State_old";
ALTER TABLE "municipalities" ALTER COLUMN "state" SET DEFAULT 'PENDING';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "StateUser_new" AS ENUM ('ENABLED', 'DISABLED');
ALTER TABLE "users" ALTER COLUMN "state" DROP DEFAULT;
ALTER TABLE "users" ALTER COLUMN "state" TYPE "StateUser_new" USING ("state"::text::"StateUser_new");
ALTER TYPE "StateUser" RENAME TO "StateUser_old";
ALTER TYPE "StateUser_new" RENAME TO "StateUser";
DROP TYPE "StateUser_old";
ALTER TABLE "users" ALTER COLUMN "state" SET DEFAULT 'ENABLED';
COMMIT;
