/*
  Warnings:

  - You are about to drop the column `specialty` on the `Appointment` table. All the data in the column will be lost.
  - Added the required column `procedure` to the `Appointment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Appointment" DROP COLUMN "specialty",
ADD COLUMN     "procedure" TEXT NOT NULL;
