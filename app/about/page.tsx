"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Heart,
  Star,
  Truck,
  Shield,
  Users,
  Sparkles,
  Package,
  Award,
} from "lucide-react";

export default function AboutPage() {
  const router = useRouter();

  const values = [
    {
      icon: Heart,
      title: "Quality First",
      description:
        "We use premium materials and professional printing to ensure every magnet meets our high standards.",
    },
    {
      icon: Star,
      title: "Customer Satisfaction",
      description:
        "Your happiness is our priority. We offer a 100% satisfaction guarantee on all orders.",
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description:
        "Orders are processed and shipped within 24 hours, so you get your magnets quickly.",
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description:
        "We protect your data and ensure safe, secure payment processing for every transaction.",
    },
  ];

  const features = [
    {
      icon: Sparkles,
      title: "Professional Printing",
      description:
        "State-of-the-art printing technology ensures vibrant colors and sharp details.",
    },
    {
      icon: Package,
      title: "Careful Packaging",
      description:
        "Each magnet is carefully packaged to arrive in perfect condition.",
    },
    {
      icon: Award,
      title: "Premium Materials",
      description:
        "We use high-quality magnetic material that's durable and long-lasting.",
    },
    {
      icon: Users,
      title: "Friendly Support",
      description:
        "Our customer support team is here to help with any questions or concerns.",
    },
  ];

  const stats = [
    { number: "10,000+", label: "Happy Customers" },
    { number: "50,000+", label: "Magnets Created" },
    { number: "4.9/5", label: "Average Rating" },
    { number: "24hrs", label: "Shipping Time" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-50 via-white to-pink-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              About Magnets & Prints
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              We&apos;re passionate about helping you preserve and display your
              favorite memories. Our mission is to make it easy and affordable
              to turn your photos into beautiful, high-quality magnets.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white border-y">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-indigo-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Our Story
            </h2>
            <div className="space-y-4 text-lg text-gray-600 text-left">
              <p>
                Magnets & Prints was born from a simple idea: everyone should be
                able to easily turn their favorite photos into beautiful,
                tangible keepsakes that they can enjoy every day.
              </p>
              <p>
                We noticed that while people take thousands of photos on their
                phones, those precious memories often stay hidden in digital
                albums. We wanted to change that by making it incredibly easy to
                bring those photos into the physical world.
              </p>
              <p>
                Today, we&apos;re proud to have helped thousands of customers
                preserve and display their favorite moments. Whether it&apos;s family
                photos on the fridge, pet pictures in the office, or vacation
                memories as gifts, we&apos;re here to help you celebrate what matters
                most.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600">
              What drives us to deliver the best experience
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="text-center h-full">
                  <CardContent className="p-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
                      <value.icon className="w-8 h-8 text-indigo-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {value.title}
                    </h3>
                    <p className="text-gray-600">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Makes Us Different
            </h2>
            <p className="text-xl text-gray-600">
              Quality, convenience, and care in every order
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-pink-100 rounded-full mb-4">
                  <feature.icon className="w-8 h-8 text-pink-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Process */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Our Quality Process
            </h2>
            <p className="text-xl text-gray-600 mb-12">
              Every magnet goes through our rigorous quality control process
            </p>

            <div className="space-y-8 text-left">
              {[
                {
                  step: "1",
                  title: "Upload & Review",
                  description:
                    "Your photos are reviewed to ensure they meet our quality standards for printing.",
                },
                {
                  step: "2",
                  title: "Professional Printing",
                  description:
                    "We use state-of-the-art printers to create vibrant, high-resolution images.",
                },
                {
                  step: "3",
                  title: "Quality Check",
                  description:
                    "Each magnet is inspected for color accuracy, clarity, and defects.",
                },
                {
                  step: "4",
                  title: "Secure Packaging",
                  description:
                    "Magnets are carefully packaged to ensure they arrive in perfect condition.",
                },
              ].map((process, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                    {process.step}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {process.title}
                    </h3>
                    <p className="text-gray-600">{process.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-indigo-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Ready to Create Your Magnets?
            </h2>
            <p className="text-xl text-indigo-100 mb-8">
              Join thousands of happy customers and turn your photos into
              beautiful magnets today
            </p>
            <Button
              onClick={() => router.push("/upload")}
              size="lg"
              variant="secondary"
            >
              Get Started Now
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
