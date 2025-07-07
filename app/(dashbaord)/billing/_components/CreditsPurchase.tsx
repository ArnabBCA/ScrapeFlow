"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CoinsIcon, CreditCardIcon } from "lucide-react";
import { CreditsPack, PackId } from "@/lib/billing";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { purchaseCredits, verifyPayment } from "@/actions/billings";

function CreditsPurchase() {
  const [selectedPack, setSelectedPack] = useState<PackId>(PackId.MEDIUM);
  const [loading, setLoading] = useState(false);

  const createOrder = async (packId: PackId) => {
    try {
      setLoading(true);
      const order = await purchaseCredits(packId);

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // this must be defined in .env.local
        order_id: order.id,
        name: "ScrapeFlow",
        description: "Purchase Credits",
        //callback_url: "/api/verify-payment",
        theme: { color: "#22c55e" },
        handler: function (response: any) {
          verifyPayment({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            packId: packId,
            currency: order.currency,
            amount: Number(order.amount),
          })
            .then((verifyRes) => {
              if (verifyRes.status === "verification_successful") {
                toast.success("Credits credited successfully, reloading...", {
                  id: "purchase",
                });
                setTimeout(() => {
                  window.location.reload();
                }, 1500);
              } else {
                toast.error("Payment verification failed", { id: "purchase" });
              }
            })
            .catch((err) => {
              console.error(err);
              toast.error("Error verifying payment");
            });
        },
      };

      const payment = new (window as any).Razorpay(options);
      payment.open();
    } catch (error) {
      console.error(error);
      toast.error("Error creating Razorpay order", { id: "purchase" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center gap-2">
          <CoinsIcon className="h-6 w-6 text-primary" />
          Purchase Credits
        </CardTitle>
        <CardDescription>
          Select the number of credits you want to purchase
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup
          value={selectedPack}
          onValueChange={(value) => setSelectedPack(value as PackId)}
        >
          {CreditsPack.map((pack) => (
            <div
              key={pack.id}
              className="flex items-center space-x-3 p-3 rounded-lg bg-secondary/50 hover:bg-secondary"
            >
              <RadioGroupItem value={pack.id} id={pack.id} />
              <Label
                htmlFor={pack.id}
                className="flex justify-between w-full cursor-pointer"
              >
                <span className="font-medium">
                  {pack.name} - {pack.label}
                </span>
                <span className="font-bold text-primary">
                  ${(pack.price / 100).toFixed(2)}
                </span>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          disabled={loading}
          onClick={() => createOrder(selectedPack)}
        >
          <CreditCardIcon className="h-5 w-5 mr-2" />
          {loading ? "Processing..." : "Purchase credits"}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default CreditsPurchase;
