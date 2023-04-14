/*
  Warnings:

  - Made the column `wallet_id` on table `transactions` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_transactions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "category_id" TEXT NOT NULL,
    "description" TEXT,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "wallet_id" TEXT NOT NULL,
    CONSTRAINT "transactions_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categorys" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "transactions_wallet_id_fkey" FOREIGN KEY ("wallet_id") REFERENCES "wallets" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_transactions" ("category_id", "description", "id", "title", "type", "value", "wallet_id") SELECT "category_id", "description", "id", "title", "type", "value", "wallet_id" FROM "transactions";
DROP TABLE "transactions";
ALTER TABLE "new_transactions" RENAME TO "transactions";
CREATE UNIQUE INDEX "transactions_category_id_key" ON "transactions"("category_id");
CREATE UNIQUE INDEX "transactions_id_wallet_id_key" ON "transactions"("id", "wallet_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
