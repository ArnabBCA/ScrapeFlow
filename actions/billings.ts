"use server";

import { getCreditsPack, PackId } from "@/lib/billing";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { validateWebhookSignature } from "razorpay/dist/utils/razorpay-utils";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID as string,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function getAvailableCredits() {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthenticated");
  }

  const balance = await prisma.userBalance.findUnique({
    where: {
      userId,
    },
  });

  if (!balance) return -1;

  return balance.credits;
}
export async function setupUser() {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthenticated");
  }

  const userBalance = await prisma.userBalance.findUnique({
    where: {
      userId,
    },
  });

  if (!userBalance) {
    await prisma.userBalance.create({
      data: {
        userId,
        credits: 200,
      },
    });
  }
}

/*export async function purchaseCredits(packId: PackId) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthenticated");
  }

  const seletedPack = getCreditsPack(packId);

  if (!seletedPack) {
    throw new Error("Inavlid package");
  }

  const priceId = seletedPack?.priceId;

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    invoice_creation: {
      enabled: true,
    },
    success_url: getAppUrl("billing"),
    cancel_url: getAppUrl("billing"),

    // adding custom details to session info via metadata
    metadata: {
      userId,
      packId,
    },
    line_items: [
      {
        quantity: 1,
        price: priceId, // here price refer to priceId from stripe
      },
    ],
  });

  if (!session.url) {
    throw new Error("Cannot create stripe session");
  }

  redirect(session.url);
}*/

export async function getUserPurchases() {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthenticated");
  }

  return await prisma.userPurchase.findMany({
    where: {
      userId,
    },
    orderBy: {
      date: "desc",
    },
  });
}

/*export async function downloadInvoice(id: string) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthenticated");
  }

  const purchase = await prisma.userPurchase.findUnique({
    where: {
      userId,
      id,
    },
  });

  if (!purchase) {
    throw new Error("Bad request");
  }

  const session = await stripe.checkout.sessions.retrieve(purchase.stripeId);
  if (!session.invoice) {
    throw new Error("Invoice not found");
  }

  const invoice = await stripe.invoices.retrieve(session.invoice as string);
  return invoice.hosted_invoice_url;
}*/

export async function purchaseCredits(packId: PackId) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthenticated");
  }

  const seletedPack = getCreditsPack(packId);

  if (!seletedPack) {
    throw new Error("Inavlid package");
  }

  const price = seletedPack?.price;

  const order = await razorpay.orders.create({
    amount: price * 100,
    currency: "INR",
  });

  return order;
}

type VerifyPaymentArgs = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  packId: string;
  currency: string;
  amount: number;
};

export async function verifyPayment({
  razorpay_order_id,
  razorpay_payment_id,
  razorpay_signature,
  packId,
  currency,
  amount,
}: VerifyPaymentArgs) {
  const secret = process.env.RAZORPAY_KEY_SECRET as string;
  const body = razorpay_order_id + "|" + razorpay_payment_id;

  try {
    const isValidSignature = validateWebhookSignature(
      body,
      razorpay_signature,
      secret
    );

    if (!isValidSignature) {
      console.log("Payment verification failed");
      return { status: "verification_failed", success: false };
    }

    const { userId } = await auth();
    if (!userId) {
      return { status: "unauthorized", success: false };
    }

    if (!packId) {
      throw new Error("Missing pack id");
    }
    if (!currency) {
      throw new Error("Missing currency");
    }
    if (!amount) {
      throw new Error("Missing amount");
    }

    const purchasedPack = getCreditsPack(packId as PackId);
    if (!purchasedPack) {
      throw new Error("Purchase pack not found");
    }

    await prisma.userBalance.upsert({
      where: {
        userId,
      },
      create: {
        userId,
        credits: purchasedPack.credits,
      },
      update: {
        credits: {
          increment: purchasedPack.credits,
        },
      },
    });

    await prisma.userPurchase.create({
      data: {
        userId,
        stripeId: razorpay_order_id,
        description: `${purchasedPack.name} - ${purchasedPack.credits} credits`,
        amount: amount,
        currency: currency,
      },
    });

    return { status: "verification_successful", success: true };
  } catch (error) {
    console.error("Error verifying payment:", error);
    return { status: "verification_failed", success: false };
  }
}
