-- CreateTable
CREATE TABLE "Tracker" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "locations" TEXT[],

    CONSTRAINT "Tracker_pkey" PRIMARY KEY ("id")
);
