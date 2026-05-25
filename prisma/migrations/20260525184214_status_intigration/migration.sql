-- CreateEnum
CREATE TYPE "InquiryStatus" AS ENUM ('OPEN', 'CLOSED');

-- CreateTable
CREATE TABLE "inquiries" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "institution" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "inquiryType" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" "InquiryStatus" NOT NULL DEFAULT 'OPEN',

    CONSTRAINT "inquiries_pkey" PRIMARY KEY ("id")
);
