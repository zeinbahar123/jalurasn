import { NextResponse } from "next/server";
import { createHash, timingSafeEqual } from "crypto";
import { prisma } from "@/lib/prisma";

const PREMIUM_PRICE = 100_000;

export async function POST(request: Request) {
  try {
    const notification = await request.json();

    const {
      order_id: orderId,
      transaction_id: transactionId,
      transaction_status: transactionStatus,
      status_code: statusCode,
      gross_amount: grossAmount,
      fraud_status: fraudStatus,
      signature_key: signatureKey,
    } = notification;

    if (
      !orderId ||
      !transactionId ||
      !transactionStatus ||
      !statusCode ||
      !grossAmount ||
      !signatureKey
    ) {
      return NextResponse.json(
        {
          error: "Data notifikasi Midtrans tidak lengkap.",
        },
        { status: 400 },
      );
    }

    const serverKey = process.env.MIDTRANS_SERVER_KEY;

    if (!serverKey) {
      console.error("MIDTRANS_SERVER_KEY belum tersedia.");

      return NextResponse.json(
        {
          error: "Konfigurasi pembayaran belum lengkap.",
        },
        { status: 500 },
      );
    }

    /*
     * Verifikasi signature dari Midtrans.
     *
     * Rumus resmi:
     * SHA512(order_id + status_code + gross_amount + ServerKey)
     */
    const signatureInput =
      orderId + statusCode + grossAmount + serverKey;

    const calculatedSignature = createHash("sha512")
      .update(signatureInput)
      .digest("hex");

    const receivedBuffer = Buffer.from(signatureKey, "utf8");
    const calculatedBuffer = Buffer.from(calculatedSignature, "utf8");

    if (
      receivedBuffer.length !== calculatedBuffer.length ||
      !timingSafeEqual(receivedBuffer, calculatedBuffer)
    ) {
      console.error("Signature Midtrans tidak valid.");

      return NextResponse.json(
        {
          error: "Signature pembayaran tidak valid.",
        },
        { status: 403 },
      );
    }

    /*
     * Pastikan nominal transaksi sesuai dengan harga Premium TACTIX.
     *
     * Midtrans mengirim gross_amount sebagai string,
     * biasanya dalam format seperti "100000.00".
     */
    const nominal = Number(grossAmount);

    if (!Number.isFinite(nominal) || nominal !== PREMIUM_PRICE) {
      console.error("Nominal pembayaran tidak sesuai:", grossAmount);

      return NextResponse.json(
        {
          error: "Nominal pembayaran tidak sesuai.",
        },
        { status: 400 },
      );
    }

    const purchase = await prisma.purchase.findUnique({
      where: {
        paymentReference: orderId,
      },
    });

    if (!purchase) {
      console.error("Purchase tidak ditemukan:", orderId);

      return NextResponse.json(
        {
          error: "Purchase tidak ditemukan.",
        },
        { status: 404 },
      );
    }

    /*
     * Pastikan Purchase memang Premium.
     */
    if (purchase.plan !== "PREMIUM") {
      return NextResponse.json(
        {
          error: "Paket pembayaran tidak valid.",
        },
        { status: 400 },
      );
    }

    /*
     * PEMBAYARAN BERHASIL
     *
     * Midtrans:
     * - status_code = 200
     * - transaction_status = settlement
     *
     * Untuk kartu, capture + fraud_status accept juga dianggap berhasil.
     */
    const pembayaranBerhasil =
      statusCode === "200" &&
      (transactionStatus === "settlement" ||
        (transactionStatus === "capture" &&
          fraudStatus === "accept"));

    if (pembayaranBerhasil) {
      /*
       * Idempotent:
       * Kalau Midtrans mengirim notifikasi yang sama lebih dari sekali,
       * transaksi tidak dibuat ulang.
       */
      await prisma.$transaction([
        prisma.purchase.update({
          where: {
            id: purchase.id,
          },
          data: {
            status: "PAID",
            paidAt: purchase.paidAt ?? new Date(),
          },
        }),

        prisma.user.update({
          where: {
            id: purchase.userId,
          },
          data: {
            subscription: "PREMIUM",
          },
        }),
      ]);

      console.log(
        `TACTIX Premium aktif: ${orderId} / ${transactionId}`,
      );

      return NextResponse.json({
        success: true,
        status: "PAID",
      });
    }

    /*
     * PEMBAYARAN MASIH MENUNGGU
     */
    if (transactionStatus === "pending") {
      await prisma.purchase.update({
        where: {
          id: purchase.id,
        },
        data: {
          status: "PENDING",
        },
      });

      return NextResponse.json({
        success: true,
        status: "PENDING",
      });
    }

    /*
     * PEMBAYARAN GAGAL / DIBATALKAN / KEDALUWARSA
     */
    if (
      transactionStatus === "deny" ||
      transactionStatus === "cancel" ||
      transactionStatus === "expire"
    ) {
      await prisma.purchase.update({
        where: {
          id: purchase.id,
        },
        data: {
          status: "FAILED",
        },
      });

      return NextResponse.json({
        success: true,
        status: "FAILED",
      });
    }

    /*
     * Status lain yang belum kita proses.
     */
    return NextResponse.json({
      success: true,
      status: transactionStatus,
    });
  } catch (error) {
    console.error("Midtrans notification error:", error);

    return NextResponse.json(
      {
        error: "Gagal memproses notifikasi pembayaran.",
      },
      { status: 500 },
    );
  }
}