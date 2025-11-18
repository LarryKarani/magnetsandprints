"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Star } from "lucide-react";

export default function ProductsPage() {
  const router = useRouter();

  const products = [
    {
      name: "Square Small",
      size: '2" x 2"',
      price: 3.99,
      image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&h=400&fit=crop",
      description: "Perfect for small memories",
      features: ["Vibrant colors", "Strong magnet", "Durable finish"],
    },
    {
      name: "Square Medium",
      size: '3" x 3"',
      price: 5.99,
      image: "https://images.unsplash.com/photo-1512295767273-ac109ac3acfa?w=400&h=400&fit=crop",
      description: "Most popular size",
      features: ["High resolution", "Weather resistant", "Easy to apply"],
      popular: true,
    },
    {
      name: "Square Large",
      size: '4" x 4"',
      price: 7.99,
      image: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=400&h=400&fit=crop",
      description: "Make a bold statement",
      features: ["Premium quality", "Extra strong", "Photo quality print"],
    },
    {
      name: "Rectangle",
      size: '2" x 6"',
      price: 9.99,
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=400&fit=crop",
      description: "Perfect for panoramic shots",
      features: ["Landscape format", "Professional look", "Unique shape"],
    },
  ];

  const finishOptions = [
    {
      name: "Glossy",
      description: "Vibrant colors with a shiny finish",
      features: ["Bright colors", "Reflective surface", "Modern look"],
    },
    {
      name: "Matte",
      description: "Soft, elegant finish without glare",
      features: ["No glare", "Fingerprint resistant", "Classic look"],
    },
  ];

  const borderOptions = [
    {
      name: "No Border",
      description: "Edge-to-edge photo coverage",
    },
    {
      name: "White Border",
      description: "Classic polaroid-style look",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-50 via-white to-pink-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Our Products
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Premium quality photo magnets in various sizes and finishes.
              Perfect for your fridge, office, or as gifts.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Choose Your Size
            </h2>
            <p className="text-gray-600">
              All sizes available in matte or glossy finish
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="relative overflow-hidden hover:shadow-lg transition-shadow">
                  {product.popular && (
                    <div className="absolute top-4 right-4 z-10 bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Popular
                    </div>
                  )}
                  <CardContent className="p-6">
                    <div className="relative aspect-square rounded-lg mb-4 overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2">{product.size}</p>
                    <p className="text-gray-600 text-sm mb-4">
                      {product.description}
                    </p>
                    <div className="space-y-2 mb-4">
                      {product.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-sm">
                          <Check className="w-4 h-4 text-green-500 mr-2" />
                          <span className="text-gray-600">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div>
                        <p className="text-sm text-gray-600">Starting at</p>
                        <p className="text-2xl font-bold text-indigo-600">
                          ${product.price}
                        </p>
                      </div>
                      <Button
                        onClick={() => router.push("/upload")}
                        size="sm"
                      >
                        Create
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Finish Options */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Finish Options
            </h2>
            <p className="text-gray-600">
              Choose the perfect finish for your magnets
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {finishOptions.map((finish, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      {finish.name}
                    </h3>
                    <p className="text-gray-600 mb-4">{finish.description}</p>
                    <div className="space-y-2">
                      {finish.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center">
                          <Star className="w-4 h-4 text-indigo-600 mr-2" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Border Options */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Border Options
            </h2>
            <p className="text-gray-600">Customize the look of your magnets</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {borderOptions.map((border, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-8 text-center">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {border.name}
                    </h3>
                    <p className="text-gray-600">{border.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Guarantee */}
      <section className="py-20 bg-indigo-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">Quality Guarantee</h2>
            <p className="text-xl mb-8 text-indigo-100">
              We use premium materials and professional printing techniques to
              ensure your magnets look amazing and last for years.
            </p>
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div>
                <h3 className="text-2xl font-bold mb-2">High Resolution</h3>
                <p className="text-indigo-100">
                  Professional quality printing for vibrant, detailed images
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Strong Magnets</h3>
                <p className="text-indigo-100">
                  Powerful magnets that hold securely to any metal surface
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Durable Materials</h3>
                <p className="text-indigo-100">
                  Weather-resistant and long-lasting construction
                </p>
              </div>
            </div>
            <Button
              onClick={() => router.push("/upload")}
              size="lg"
              variant="secondary"
            >
              Start Creating Your Magnets
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
