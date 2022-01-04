-- CreateTable
CREATE TABLE "LostCordinates" (
    "id" SERIAL NOT NULL,
    "x" INTEGER NOT NULL,
    "y" INTEGER NOT NULL,

    CONSTRAINT "LostCordinates_pkey" PRIMARY KEY ("id")
);
