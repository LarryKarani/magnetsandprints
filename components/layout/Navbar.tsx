"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ShoppingCart, User } from "lucide-react";
import { useCartStore } from "@/lib/store";

export default function Navbar() {
  const pathname = usePathname();
  const cartItems = useCartStore((state) => state.items);
  const itemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg" />
            <span className="text-xl font-bold gradient-text">
              Magnets & Prints
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className={`hover:text-purple-600 ${
                pathname === "/" ? "text-purple-600" : ""
              }`}
            >
              Home
            </Link>
            <Link
              href="/upload"
              className={`hover:text-purple-600 ${
                pathname === "/upload" ? "text-purple-600" : ""
              }`}
            >
              Create
            </Link>
            <Link href="/products" className="hover:text-purple-600">
              Products
            </Link>
            <Link href="/about" className="hover:text-purple-600">
              About
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="w-5 h-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Button>
            </Link>
            <Link href="/admin">
              <Button variant="ghost" size="icon">
                <User className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
