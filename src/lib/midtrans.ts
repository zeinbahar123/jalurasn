import midtransClient from "midtrans-client";

const serverKey = process.env.MIDTRANS_SERVER_KEY;
const clientKey = process.env.MIDTRANS_CLIENT_KEY;

if (!serverKey) {
  throw new Error("MIDTRANS_SERVER_KEY belum diset di .env");
}

if (!clientKey) {
  throw new Error("MIDTRANS_CLIENT_KEY belum diset di .env");
}

export const snap = new midtransClient.Snap({
  isProduction: false,
  serverKey,
  clientKey,
});