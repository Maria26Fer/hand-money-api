/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `cards` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "transactions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "category_id" TEXT NOT NULL,
    "description" TEXT,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "wallet_id" TEXT,
    CONSTRAINT "transactions_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categorys" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "transactions_wallet_id_fkey" FOREIGN KEY ("wallet_id") REFERENCES "wallets" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "wallets" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    CONSTRAINT "wallets_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "transactions_category_id_key" ON "transactions"("category_id");

-- CreateIndex
CREATE UNIQUE INDEX "transactions_id_wallet_id_key" ON "transactions"("id", "wallet_id");

-- CreateIndex
CREATE UNIQUE INDEX "wallets_user_id_key" ON "wallets"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "wallets_id_user_id_key" ON "wallets"("id", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "cards_user_id_key" ON "cards"("user_id");
