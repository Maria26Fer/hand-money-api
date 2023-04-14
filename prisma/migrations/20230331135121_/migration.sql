/*
  Warnings:

  - A unique constraint covering the columns `[lastNumbers]` on the table `cards` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "cards_user_id_type_key";

-- CreateIndex
CREATE UNIQUE INDEX "cards_lastNumbers_key" ON "cards"("lastNumbers");
