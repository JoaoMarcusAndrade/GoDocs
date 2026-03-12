-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "image" TEXT,
    "CPF" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "pass_hash" TEXT NOT NULL
);
INSERT INTO "new_User" ("CPF", "email", "id", "image", "name", "number", "pass_hash") SELECT "CPF", "email", "id", "image", "name", "number", "pass_hash" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
