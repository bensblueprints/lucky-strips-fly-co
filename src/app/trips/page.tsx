"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Clock,
  Users,
  CheckCircle,
  Calendar,
  ArrowRight,
  Phone,
  Fish,
  Sun,
  Sunrise,
  Info,
} from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const trips = [
  {
    id: "half-day",
    name: "Half Day Float Trip",
    duration: "4.5 Hours",
    icon: Sunrise,
    description: "The perfect introduction to Smith River fly fishing. Ideal for beginners or those with limited time who still want a quality fishing experience.",
    longDescription: "Our half day trips are designed to give you a taste of what the Smith River has to offer. You'll float some of the most productive water on the river while learning fly casting techniques and local fishing strategies. All gear is provided, making this the perfect trip for first-timers.",
    pricing: [
      { guests: 1, price: 275 },
      { guests: 2, price: 375 },
    ],
    includes: [
      "All fly fishing gear (rod, reel, line, flies)",
      "Snacks and beverages",
      "Expert fly fishing instruction",
      "Drift boat float",
      "Waders and boots (if needed)",
    ],
    schedule: "Morning trips start at 7:00 AM | Afternoon trips start at 1:00 PM",
    bestFor: ["First-time fly fishers", "Families with children", "Limited schedules", "Trying something new"],
  },
  {
    id: "full-day",
    name: "Full Day Float Trip",
    duration: "7-8 Hours",
    icon: Sun,
    featured: true,
    description: "Our most popular trip. Spend a full day on the water maximizing your fishing time and covering the best sections of the Smith River.",
    longDescription: "The full day trip is our signature experience. You'll have time to fish multiple sections of the river, work through different hatches, and really dial in your technique. Lunch is prepared riverside, and you'll have plenty of time to explore what makes the Smith River special.",
    pricing: [
      { guests: 1, price: 400 },
      { guests: 2, price: 500 },
    ],
    includes: [
      "All fly fishing gear (rod, reel, line, flies)",
      "Full lunch prepared riverside",
      "Snacks and beverages all day",
      "Expert fly fishing instruction",
      "Drift boat float",
      "Waders and boots (if needed)",
      "Photos of your trip",
    ],
    schedule: "Trips begin at 7:00 AM and conclude around 3:00 PM",
    bestFor: ["Serious anglers", "Maximum fishing time", "Learning experience", "Trophy fish hunting"],
  },
];

const faqs = [
  {
    question: "What should I bring?",
    answer: "We provide all fishing gear, but you should bring sunglasses (polarized preferred), sunscreen, a hat, layered clothing appropriate for the weather, and a valid Virginia fishing license with trout stamp."
  },
  {
    question: "Do I need a fishing license?",
    answer: "Yes, you'll need a valid Virginia fishing license with a trout stamp. These can be purchased online at the Virginia Department of Wildlife Resources website."
  },
  {
    question: "What if it rains?",
    answer: "We fish in light rain - sometimes the best fishing happens during overcast or rainy conditions! In the case of severe weather or unsafe conditions, we'll work with you to reschedule."
  },
  {
    question: "Can I keep the fish I catch?",
    answer: "We practice catch and release to protect the wild trout population. However, certain stocked sections may allow harvest - ask your guide about current regulations."
  },
  {
    question: "What's the best time of year to fish?",
    answer: "The Smith River fishes well year-round thanks to the cold tailwater. Spring and fall offer excellent dry fly fishing during hatches, while winter can produce some of the largest brown trout."
  },
];

export default function TripsPage() {
  const [selectedTrip, setSelectedTrip] = useState<string | null>(null);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-primary-900">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1551524559-8af4e6624178?q=80&w=2026"
            alt="Drift boat on river"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative z-10 container-custom text-center text-white px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
              Guided Fly Fishing Trips
            </span>
            <h1 className="heading-1 max-w-3xl mx-auto mb-6">
              Book Your Smith River Adventure
            </h1>
            <p className="text-xl text-primary-100 max-w-2xl mx-auto">
              Choose your trip, select your date, and get ready for an unforgettable day on the water.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Trip Cards */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
            className="space-y-8"
          >
            {trips.map((trip) => (
              <motion.div
                key={trip.id}
                variants={fadeInUp}
                className={cn(
                  "bg-white rounded-2xl border-2 transition-all overflow-hidden",
                  trip.featured ? "border-primary-500 shadow-lg" : "border-gray-200",
                  selectedTrip === trip.id ? "ring-2 ring-primary-500 ring-offset-2" : ""
                )}
              >
                {trip.featured && (
                  <div className="bg-primary-600 text-white text-center py-2 text-sm font-medium">
                    Most Popular Choice
                  </div>
                )}

                <div className="p-8">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Trip Info */}
                    <div className="lg:col-span-2">
                      <div className="flex items-start gap-4 mb-4">
                        <div className={cn(
                          "p-3 rounded-xl",
                          trip.featured ? "bg-primary-100" : "bg-gray-100"
                        )}>
                          <trip.icon className={cn(
                            "h-8 w-8",
                            trip.featured ? "text-primary-600" : "text-gray-600"
                          )} />
                        </div>
                        <div>
                          <h2 className="heading-3 text-gray-900">{trip.name}</h2>
                          <div className="flex items-center gap-4 mt-1 text-gray-500">
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {trip.duration}
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              1-2 Guests
                            </span>
                          </div>
                        </div>
                      </div>

                      <p className="text-gray-600 mb-6">{trip.longDescription}</p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-3">What&apos;s Included</h3>
                          <ul className="space-y-2">
                            {trip.includes.map((item) => (
                              <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                                <CheckCircle className="h-4 w-4 text-primary-500 flex-shrink-0 mt-0.5" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-3">Best For</h3>
                          <ul className="space-y-2">
                            {trip.bestFor.map((item) => (
                              <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                                <Fish className="h-4 w-4 text-primary-500 flex-shrink-0 mt-0.5" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="mt-6 p-4 bg-gray-50 rounded-lg flex items-start gap-3">
                        <Info className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />
                        <div className="text-sm text-gray-600">
                          <span className="font-medium text-gray-700">Schedule:</span> {trip.schedule}
                        </div>
                      </div>
                    </div>

                    {/* Pricing & Booking */}
                    <div className="lg:border-l lg:pl-8 lg:border-gray-200">
                      <h3 className="font-semibold text-gray-900 mb-4">Pricing</h3>
                      <div className="space-y-3 mb-6">
                        {trip.pricing.map((tier) => (
                          <div
                            key={tier.guests}
                            className="flex justify-between items-center p-4 bg-gray-50 rounded-lg"
                          >
                            <span className="text-gray-700">
                              {tier.guests} {tier.guests === 1 ? "Person" : "People"}
                            </span>
                            <span className="text-2xl font-bold text-gray-900">
                              {formatPrice(tier.price)}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="space-y-3">
                        <button
                          onClick={() => setSelectedTrip(selectedTrip === trip.id ? null : trip.id)}
                          className={cn(
                            "w-full py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2",
                            trip.featured
                              ? "bg-primary-600 text-white hover:bg-primary-700"
                              : "bg-gray-900 text-white hover:bg-gray-800"
                          )}
                        >
                          <Calendar className="h-5 w-5" />
                          Book This Trip
                        </button>
                        <a
                          href="tel:+12767320517"
                          className="w-full py-3 px-4 rounded-lg font-medium border-2 border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                        >
                          <Phone className="h-5 w-5" />
                          Call to Book
                        </a>
                      </div>

                      {selectedTrip === trip.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-6 p-4 bg-primary-50 rounded-lg border border-primary-200"
                        >
                          <p className="text-sm text-primary-800 mb-3">
                            Ready to book? Contact us to check availability and reserve your trip.
                          </p>
                          <a
                            href="mailto:luckystripsflyco@gmail.com?subject=Trip Booking Request"
                            className="text-primary-600 font-medium text-sm hover:underline"
                          >
                            Email: luckystripsflyco@gmail.com
                          </a>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.span variants={fadeInUp} className="text-primary-600 font-medium">
              What to Expect
            </motion.span>
            <motion.h2 variants={fadeInUp} className="heading-2 text-gray-900 mt-2">
              Your Day on the Water
            </motion.h2>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                step: "01",
                title: "Meet & Gear Up",
                description: "Meet at the designated put-in location. We'll get you fitted with waders, boots, and all the fly fishing gear you need."
              },
              {
                step: "02",
                title: "Learn & Fish",
                description: "Whether you're a beginner or expert, you'll get personalized instruction as we float the river targeting trout in the best spots."
              },
              {
                step: "03",
                title: "Memories Made",
                description: "End the day with photos of your catches, new skills learned, and memories of an incredible day on Virginia's Smith River."
              }
            ].map((item) => (
              <motion.div
                key={item.step}
                variants={fadeInUp}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 text-primary-600 font-bold text-xl mb-4">
                  {item.step}
                </div>
                <h3 className="font-display text-xl font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQs */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-3xl">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-12"
          >
            <motion.span variants={fadeInUp} className="text-primary-600 font-medium">
              FAQs
            </motion.span>
            <motion.h2 variants={fadeInUp} className="heading-2 text-gray-900 mt-2">
              Common Questions
            </motion.h2>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
            className="space-y-4"
          >
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-gray-900">{faq.question}</span>
                  <ArrowRight
                    className={cn(
                      "h-5 w-5 text-gray-400 transition-transform",
                      expandedFaq === index ? "rotate-90" : ""
                    )}
                  />
                </button>
                {expandedFaq === index && (
                  <div className="px-6 pb-4 text-gray-600">
                    {faq.answer}
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary-900 text-white">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="heading-2 mb-4">Questions? We&apos;re Here to Help</h2>
            <p className="text-primary-100 max-w-2xl mx-auto mb-8">
              Not sure which trip is right for you? Give us a call or send an email—we&apos;re happy to help you plan the perfect fishing experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+12767320517" className="btn-accent">
                <Phone className="mr-2 h-5 w-5 inline" />
                (276) 732-0517
              </a>
              <Link href="/contact" className="btn-secondary bg-transparent border-white text-white hover:bg-white/10">
                Send a Message
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
