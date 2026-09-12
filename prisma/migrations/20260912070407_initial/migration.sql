-- CreateEnum
CREATE TYPE "SubscriptionPlan" AS ENUM ('FREE', 'PREMIUM');

-- CreateEnum
CREATE TYPE "PurchaseStatus" AS ENUM ('PENDING', 'PAID', 'FAILED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "StatusAttempt" AS ENUM ('BERLANGSUNG', 'SELESAI', 'KADALUARSA');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "subscription" "SubscriptionPlan" NOT NULL DEFAULT 'FREE',
    "gagalMasuk" INTEGER NOT NULL DEFAULT 0,
    "terkunciSampai" TIMESTAMP(3),
    "namaTampilan" TEXT,
    "targetInstansi" TEXT,
    "targetFormasi" TEXT,
    "targetProvinsi" TEXT,
    "pendidikan" TEXT,
    "bio" TEXT,
    "tampilDiPeringkat" BOOLEAN NOT NULL DEFAULT true,
    "isMentor" BOOLEAN NOT NULL DEFAULT false,
    "tahunLolos" INTEGER,
    "instansiLolos" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Attempt" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "paketId" TEXT NOT NULL,
    "status" "StatusAttempt" NOT NULL DEFAULT 'BERLANGSUNG',
    "mulaiPada" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "batasPada" TIMESTAMP(3) NOT NULL,
    "selesaiPada" TIMESTAMP(3),
    "durasiDetik" INTEGER NOT NULL DEFAULT 0,
    "skorTWK" INTEGER NOT NULL DEFAULT 0,
    "skorTIU" INTEGER NOT NULL DEFAULT 0,
    "skorTKP" INTEGER NOT NULL DEFAULT 0,
    "skorTotal" INTEGER NOT NULL DEFAULT 0,
    "benarTWK" INTEGER NOT NULL DEFAULT 0,
    "benarTIU" INTEGER NOT NULL DEFAULT 0,
    "lulusTWK" BOOLEAN NOT NULL DEFAULT false,
    "lulusTIU" BOOLEAN NOT NULL DEFAULT false,
    "lulusTKP" BOOLEAN NOT NULL DEFAULT false,
    "lulusSemua" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Attempt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AttemptAnswer" (
    "id" TEXT NOT NULL,
    "attemptId" TEXT NOT NULL,
    "soalId" TEXT NOT NULL,
    "nomor" INTEGER NOT NULL,
    "kategori" TEXT NOT NULL,
    "jawaban" TEXT,
    "benar" BOOLEAN NOT NULL DEFAULT false,
    "poin" INTEGER NOT NULL DEFAULT 0,
    "raguRagu" BOOLEAN NOT NULL DEFAULT false,
    "detikDipakai" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "AttemptAnswer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Purchase" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "plan" "SubscriptionPlan" NOT NULL DEFAULT 'PREMIUM',
    "amount" INTEGER NOT NULL,
    "status" "PurchaseStatus" NOT NULL DEFAULT 'PENDING',
    "paymentReference" TEXT,
    "paidAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Purchase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" TEXT NOT NULL,
    "soalId" TEXT NOT NULL,
    "paketId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "isi" TEXT NOT NULL,
    "parentId" TEXT,
    "dihapus" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommentVote" (
    "id" TEXT NOT NULL,
    "commentId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "CommentVote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Story" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "judul" TEXT NOT NULL,
    "isi" TEXT NOT NULL,
    "tahunUjian" INTEGER,
    "instansi" TEXT,
    "hasilnya" TEXT,
    "tayang" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Story_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bookmark" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "soalId" TEXT NOT NULL,
    "paketId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Bookmark_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_targetInstansi_idx" ON "User"("targetInstansi");

-- CreateIndex
CREATE INDEX "User_isMentor_idx" ON "User"("isMentor");

-- CreateIndex
CREATE INDEX "User_subscription_idx" ON "User"("subscription");

-- CreateIndex
CREATE INDEX "Attempt_userId_paketId_idx" ON "Attempt"("userId", "paketId");

-- CreateIndex
CREATE INDEX "Attempt_paketId_skorTotal_idx" ON "Attempt"("paketId", "skorTotal");

-- CreateIndex
CREATE INDEX "Attempt_status_idx" ON "Attempt"("status");

-- CreateIndex
CREATE INDEX "AttemptAnswer_attemptId_idx" ON "AttemptAnswer"("attemptId");

-- CreateIndex
CREATE UNIQUE INDEX "AttemptAnswer_attemptId_soalId_key" ON "AttemptAnswer"("attemptId", "soalId");

-- CreateIndex
CREATE UNIQUE INDEX "Purchase_paymentReference_key" ON "Purchase"("paymentReference");

-- CreateIndex
CREATE INDEX "Purchase_userId_status_idx" ON "Purchase"("userId", "status");

-- CreateIndex
CREATE INDEX "Purchase_status_idx" ON "Purchase"("status");

-- CreateIndex
CREATE INDEX "Purchase_createdAt_idx" ON "Purchase"("createdAt");

-- CreateIndex
CREATE INDEX "Comment_soalId_createdAt_idx" ON "Comment"("soalId", "createdAt");

-- CreateIndex
CREATE INDEX "Comment_userId_idx" ON "Comment"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "CommentVote_commentId_userId_key" ON "CommentVote"("commentId", "userId");

-- CreateIndex
CREATE INDEX "Story_tayang_createdAt_idx" ON "Story"("tayang", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "Bookmark_userId_soalId_key" ON "Bookmark"("userId", "soalId");

-- AddForeignKey
ALTER TABLE "Attempt" ADD CONSTRAINT "Attempt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttemptAnswer" ADD CONSTRAINT "AttemptAnswer_attemptId_fkey" FOREIGN KEY ("attemptId") REFERENCES "Attempt"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentVote" ADD CONSTRAINT "CommentVote_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentVote" ADD CONSTRAINT "CommentVote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Story" ADD CONSTRAINT "Story_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bookmark" ADD CONSTRAINT "Bookmark_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
