/*
  Warnings:

  - Added the required column `userId` to the `profiles` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_profiles" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "url_avatar" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_profiles" ("email", "id", "name", "url_avatar") SELECT "email", "id", "name", "url_avatar" FROM "profiles";
DROP TABLE "profiles";
ALTER TABLE "new_profiles" RENAME TO "profiles";
CREATE UNIQUE INDEX "profiles_userId_key" ON "profiles"("userId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
