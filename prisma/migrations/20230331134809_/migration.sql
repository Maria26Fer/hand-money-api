/*
  Warnings:

  - A unique constraint covering the columns `[user_id,type]` on the table `cards` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "cards_id_user_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "cards_user_id_type_key" ON "cards"("user_id", "type");
