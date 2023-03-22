-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "fname" TEXT NOT NULL,
    "lname" TEXT NOT NULL,
    "avatar_url" TEXT NOT NULL,
    "registration_date" DATETIME NOT NULL,
    "phone" TEXT NOT NULL,
    "birthday" DATETIME NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Ticket" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "from_location" TEXT NOT NULL,
    "to_location" TEXT NOT NULL,
    "arrival_date" DATETIME NOT NULL,
    "departure_date" DATETIME NOT NULL,
    "unit_price" REAL NOT NULL,
    "count" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "ticket_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "total_price" REAL NOT NULL,
    "registration_date" DATETIME NOT NULL,
    CONSTRAINT "Order_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Order_ticket_id_fkey" FOREIGN KEY ("ticket_id") REFERENCES "Ticket" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_avatar_url_key" ON "User"("avatar_url");
