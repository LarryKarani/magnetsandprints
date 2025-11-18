"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle, Package, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCartStore } from "@/lib/store";

function PaymentSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const clearCart = useCartStore((state) => state.clearCart);
  const [orderDetails, setOrderDetails] = useState<{
    orderNumber: string;
    totalAmount: number;
    items?: unknown[];
  } | null>(null);

  useEffect(() => {
    // Clear the cart after successful payment
    clearCart();

    // Fetch order details
    if (orderId) {
      fetchOrderDetails(orderId);
    }
  }, [orderId, clearCart]);

  const fetchOrderDetails = async (id: string) => {
    try {
      const response = await fetch(`/api/orders/${id}`);
      if (response.ok) {
        const data = await response.json();
        setOrderDetails(data);
      }
    } catch {
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12">
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
                <CheckCircle className="w-24 h-24 mx-auto mb-6 text-green-500" />
              </motion.div>

              <h1 className="text-4xl font-bold mb-4 text-gray-900">
                Payment Successful!
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Thank you for your order! Your custom magnets are being prepared.
              </p>

              {orderDetails && (
                <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
                  <h2 className="font-semibold text-lg mb-4">Order Details</h2>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Order Number:</span>
                      <span className="font-medium">
                        {orderDetails.orderNumber}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Amount:</span>
                      <span className="font-medium">
                        ${orderDetails.totalAmount.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Items:</span>
                      <span className="font-medium">
                        {orderDetails.items?.length || 0} magnet(s)
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-4 mb-8">
                <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                  <Mail className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div className="text-left">
                    <h3 className="font-semibold mb-1">Confirmation Email</h3>
                    <p className="text-sm text-gray-600">
                      Check your email for order confirmation and tracking details.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg">
                  <Package className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                  <div className="text-left">
                    <h3 className="font-semibold mb-1">Fast Processing</h3>
                    <p className="text-sm text-gray-600">
                      Your order will be processed and shipped within 24-48 hours.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" onClick={() => router.push("/")}>
                  Back to Home
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => router.push("/upload")}
                >
                  Create More Magnets
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <PaymentSuccessContent />
    </Suspense>
  );
}
