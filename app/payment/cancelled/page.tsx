"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { XCircle, ArrowLeft, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

function PaymentCancelledContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl mx-auto"
        >
          <Card>
            <CardContent className="p-12 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
              >
                <XCircle className="w-24 h-24 mx-auto mb-6 text-orange-500" />
              </motion.div>

              <h1 className="text-4xl font-bold mb-4 text-gray-900">
                Payment Cancelled
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Your payment was not completed. Don&apos;t worry, your items are still
                in your cart.
              </p>

              {orderId && (
                <div className="bg-gray-50 rounded-lg p-6 mb-8">
                  <p className="text-sm text-gray-600">
                    Order ID: <span className="font-medium">{orderId}</span>
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    Your order has been saved but not confirmed. You can try again
                    whenever you&apos;re ready.
                  </p>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-4 mb-8">
                <div className="p-4 bg-blue-50 rounded-lg text-left">
                  <h3 className="font-semibold mb-2">Need Help?</h3>
                  <p className="text-sm text-gray-600">
                    If you experienced any issues during checkout, please contact
                    our support team.
                  </p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg text-left">
                  <h3 className="font-semibold mb-2">Your Items Are Safe</h3>
                  <p className="text-sm text-gray-600">
                    All your customized magnets are still in your cart and ready
                    for checkout.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  onClick={() => router.push("/cart")}
                  className="gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Try Again
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => router.push("/")}
                  className="gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Home
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

export default function PaymentCancelledPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <PaymentCancelledContent />
    </Suspense>
  );
}
