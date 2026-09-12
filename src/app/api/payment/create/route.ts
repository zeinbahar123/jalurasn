import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { snap } from "@/lib/midtrans";

const PREMIUM_PRICE = 100_000;

export async function POST() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Anda harus masuk terlebih dahulu." },
        { status: 401 },
      );
    }

    const userId = session.user.id;

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        email: true,
        name: true,
        subscription: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Data pengguna tidak ditemukan." },
        { status: 404 },
      );
    }

    if (user.subscription === "PREMIUM") {
      return NextResponse.json(
        {
          error: "Akun Anda sudah Premium.",
          sudahPremium: true,
        },
        { status: 400 },
      );
    }

    const orderId = `TACTIX-${Date.now()}-${user.id.slice(-8)}`;

    const purchase = await prisma.purchase.create({
      data: {
        userId: user.id,
        plan: "PREMIUM",
        amount: PREMIUM_PRICE,
        status: "PENDING",
        paymentReference: orderId,
      },
    });

    try {
      const transaction = await snap.createTransaction({
        transaction_details: {
          order_id: orderId,
          gross_amount: PREMIUM_PRICE,
        },
      });

      return NextResponse.json({
        success: true,
        purchaseId: purchase.id,
        orderId,
        token: transaction.token,
        redirectUrl: transaction.redirect_url,
      });
    } catch (error) {
      await prisma.purchase.update({
        where: {
          id: purchase.id,
        },
        data: {
          status: "FAILED",
        },
      });

      console.error("Midtrans create transaction error:", error);

      return NextResponse.json(
        {
          error: "Gagal membuat transaksi pembayaran.",
        },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error("Create payment error:", error);

    return NextResponse.json(
      {
        error: "Terjadi kesalahan saat membuat pembayaran.",
      },
      { status: 500 },
    );
  }
}