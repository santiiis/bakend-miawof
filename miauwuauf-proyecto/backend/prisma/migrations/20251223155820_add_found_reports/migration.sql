-- CreateTable
CREATE TABLE "FoundReport" (
    "id" TEXT NOT NULL,
    "qrToken" TEXT NOT NULL,
    "message" TEXT,
    "lat" DOUBLE PRECISION,
    "lng" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FoundReport_pkey" PRIMARY KEY ("id")
);
