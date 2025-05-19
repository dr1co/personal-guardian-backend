/*
  Warnings:

  - You are about to alter the column `title` on the `cards` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `title` on the `credentials` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `url` on the `credentials` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(200)`.
  - You are about to alter the column `title` on the `wifis` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.

*/
-- AlterTable
ALTER TABLE "cards" ALTER COLUMN "title" SET DATA TYPE VARCHAR(50);

-- AlterTable
ALTER TABLE "credentials" ALTER COLUMN "title" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "url" SET DATA TYPE VARCHAR(200);

-- AlterTable
ALTER TABLE "notes" ALTER COLUMN "note" SET DATA TYPE VARCHAR(10000);

-- AlterTable
ALTER TABLE "wifis" ALTER COLUMN "title" SET DATA TYPE VARCHAR(50);
