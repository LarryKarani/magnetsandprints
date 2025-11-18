"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check, Star, Truck, Shield, Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
  const router = useRouter();
  const features = [
    {
      icon: Heart,
      title: "Premium Quality",
      description: "High-resolution printing on durable magnetic material",
    },
    {
      icon: Truck,
      title: "Fast Shipping",
      description: "Orders shipped within 24 hours",
    },
    {
      icon: Shield,
      title: "100% Satisfaction",
      description: "Money-back guarantee on all orders",
    },
  ];

  const products = [
    {
      size: '2" x 2"',
      price: "$3.99",
      name: "Square Small",
      image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&h=400&fit=crop"
    },
    {
      size: '3" x 3"',
      price: "$5.99",
      name: "Square Medium",
      image: "https://images.unsplash.com/photo-1512295767273-ac109ac3acfa?w=400&h=400&fit=crop"
    },
    {
      size: '4" x 4"',
      price: "$7.99",
      name: "Square Large",
      image: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=400&h=400&fit=crop"
    },
    {
      size: '2" x 6"',
      price: "$9.99",
      name: "Rectangle",
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=400&fit=crop"
    },
  ];

  const reviews = [
    {
      name: "Jennifer M.",
      rating: 5,
      text: "The quality exceeded my expectations! Colors are vibrant and the magnets are strong.",
    },
    {
      name: "David K.",
      rating: 5,
      text: "Super fast delivery and easy ordering process. Will definitely order again!",
    },
    {
      name: "Lisa R.",
      rating: 5,
      text: "Perfect way to display my favorite memories. Great gift idea too!",
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-50 via-white to-pink-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Turn Photos Into
                <span className="block text-indigo-600">Custom Magnets</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Premium quality photo magnets. Perfect for
                your fridge, office, or as gifts.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button onClick={() => router.push('/upload')} className="px-8 py-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center">
                  Create Your Magnets
                  <ArrowRight className="ml-2 w-5 h-5" />
                </button>
                <button onClick={() => router.push('/upload')} className="px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-gray-400 transition-colors">
                  View Pricing
                </button>
              </div>
              <div className="mt-8 flex items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-2" />
                  Free Shipping $25+
                </div>
                <div className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-2" />
                  Ships in 24hrs
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="relative rounded-2xl aspect-square shadow-xl overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400&h=400&fit=crop"
                      alt="Family photo magnet"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative rounded-2xl aspect-square shadow-xl overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1476973422084-e0fa66ff9456?w=400&h=400&fit=crop"
                      alt="Travel photo magnet"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-4 mt-8">
                  <div className="relative rounded-2xl aspect-square shadow-xl overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=400&h=400&fit=crop"
                      alt="Pet photo magnet"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative rounded-2xl aspect-square shadow-xl overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=400&h=400&fit=crop"
                      alt="Landscape photo magnet"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Bar */}
      <section className="border-y border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-4"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Create your custom magnets in 3 simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                step: "1",
                title: "Upload Photos",
                description:
                  "Choose your favorite photos from your device or social media",
              },
              {
                step: "2",
                title: "Customize",
                description:
                  "Select size, quantity, and finish options for each magnet",
              },
              {
                step: "3",
                title: "We Print & Ship",
                description:
                  "Your magnets are printed and shipped within 24 hours",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 text-white text-2xl font-bold rounded-full mb-6">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Choose Your Size
            </h2>
            <p className="text-xl text-gray-600">
              All sizes available in matte or glossy finish
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-indigo-600 hover:shadow-lg transition-all cursor-pointer"
              >
                <div className="relative aspect-square rounded-lg mb-4 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm mb-3">{product.size}</p>
                <p className="text-2xl font-bold text-indigo-600">
                  {product.price}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button onClick={() => router.push('/upload')} className="px-8 py-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors">
              Start Designing
            </button>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-6 h-6 fill-yellow-400 text-yellow-400"
                />
              ))}
              <span className="text-gray-600 ml-2">(2,847 reviews)</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Loved by Thousands
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-sm"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">{review.text}</p>
                <p className="font-semibold text-gray-900">{review.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-indigo-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Create Your Magnets?
            </h2>
            <p className="text-xl text-indigo-100 mb-8">
              Upload your photos and get started in minutes
            </p>
            <button onClick={() => router.push('/upload')} className="px-8 py-4 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors inline-flex items-center">
              Get Started Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
