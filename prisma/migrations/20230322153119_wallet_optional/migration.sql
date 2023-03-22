-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "fname" TEXT NOT NULL,
    "lname" TEXT NOT NULL,
    "avatar_url" TEXT NOT NULL,
    "registration_date" DATETIME NOT NULL,
    "phone" TEXT NOT NULL,
    "birthday" DATETIME NOT NULL,
    "password" TEXT NOT NULL,
    "wallet" INTEGER
);
INSERT INTO "new_User" ("avatar_url", "birthday", "fname", "id", "lname", "password", "phone", "registration_date", "wallet") SELECT "avatar_url", "birthday", "fname", "id", "lname", "password", "phone", "registration_date", "wallet" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_avatar_url_key" ON "User"("avatar_url");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
