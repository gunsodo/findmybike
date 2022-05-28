/*
  Warnings:

  - Added the required column `tid` to the `Tracker` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tracker" ADD COLUMN     "tid" TEXT NOT NULL;
