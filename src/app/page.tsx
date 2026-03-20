"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Fish,
  Clock,
  Users,
  Award,
  MapPin,
  Star,
  ArrowRight,
  CheckCircle,
  Waves,
  Sun
} from "lucide-react";

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
    name: "Half Day Trip",
    duration: "4.5 Hours",
    price1: 275,
    price2: 375,
    description: "Perfect introduction to Smith River fly fishing. All gear provided with snacks and beverages.",
    includes: ["All fly fishing gear", "Snacks & beverages", "Expert instruction", "Drift boat included"],
  },
  {
    name: "Full Day Trip",
    duration: "7-8 Hours",
    price1: 400,
    price2: 500,
    description: "Complete Smith River experience with lunch included. Maximize your time on the water.",
    includes: ["All fly fishing gear", "Full lunch & beverages", "Expert instruction", "Drift boat included"],
    featured: true,
  },
];

const features = [
  {
    icon: Fish,
    title: "Wild Brown Trout",
    description: "The Smith River is home to a thriving wild brown trout population alongside stocked rainbow and brook trout."
  },
  {
    icon: Waves,
    title: "Year-Round Fishing",
    description: "Cold tailwater conditions from Philpott Dam maintain ideal temperatures for trout fishing all year."
  },
  {
    icon: Award,
    title: "Expert Guide",
    description: "Local expertise from a guide born and raised on the Smith River with years of fly fishing experience."
  },
  {
    icon: Users,
    title: "All Skill Levels",
    description: "Whether you're a beginner or experienced angler, our trips are tailored to your skill level."
  },
];

const testimonials = [
  {
    name: "Mike T.",
    location: "Richmond, VA",
    text: "Best fly fishing experience I've had in Virginia. The guide was incredibly knowledgeable and patient with our group. Caught my personal best brown trout!",
    rating: 5,
  },
  {
    name: "Sarah K.",
    location: "Charlotte, NC",
    text: "First time fly fishing and I was hooked! Amazing day on the Smith River. The instruction was perfect for beginners and I caught more fish than I expected.",
    rating: 5,
  },
  {
    name: "David L.",
    location: "Roanoke, VA",
    text: "Professional, friendly, and knows every inch of this river. We'll definitely be booking again next season. Highly recommend!",
    rating: 5,
  },
];

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-16">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1504309092620-4d0ec726efa4?q=80&w=2070"
            alt="Fly fishing on the Smith River"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
        </div>

        <div className="relative z-10 container-custom text-center text-white px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
              Smith River, Virginia
            </span>
            <h1 className="heading-1 max-w-4xl mx-auto mb-6">
              Experience World-Class Fly Fishing on Virginia&apos;s Smith River
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto mb-8">
              Join us for an unforgettable guided fly fishing adventure. Expert instruction, premium gear, and access to Virginia&apos;s premier tailwater fishery.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/trips" className="btn-primary text-lg px-8 py-4">
                Book Your Trip
                <ArrowRight className="ml-2 h-5 w-5 inline" />
              </Link>
              <Link href="/about" className="btn-secondary bg-transparent border-white text-white hover:bg-white/10 text-lg px-8 py-4">
                Meet Your Guide
              </Link>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-white/70"
          >
            <ArrowRight className="h-6 w-6 rotate-90" />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.span
              variants={fadeInUp}
              className="text-primary-600 font-medium"
            >
              Why Fish With Us
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="heading-2 text-gray-900 mt-2"
            >
              The Smith River Experience
            </motion.h2>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                variants={fadeInUp}
                className="text-center p-6 rounded-2xl bg-gray-50 hover:bg-primary-50 transition-colors"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary-100 text-primary-600 mb-4">
                  <feature.icon className="h-7 w-7" />
                </div>
                <h3 className="font-display text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Trips Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.span
              variants={fadeInUp}
              className="text-primary-600 font-medium"
            >
              Our Guided Trips
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="heading-2 text-gray-900 mt-2"
            >
              Choose Your Adventure
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-gray-600 mt-4 max-w-2xl mx-auto"
            >
              All trips include expert instruction, premium fly fishing gear, and a drift boat experience on the beautiful Smith River.
            </motion.p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
          >
            {trips.map((trip) => (
              <motion.div
                key={trip.name}
                variants={fadeInUp}
                className={`relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow ${
                  trip.featured ? "ring-2 ring-primary-500" : ""
                }`}
              >
                {trip.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary-600 text-white text-xs font-semibold rounded-full">
                    Most Popular
                  </span>
                )}
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-primary-100 rounded-lg">
                    <Sun className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-gray-900">
                      {trip.name}
                    </h3>
                    <span className="text-sm text-gray-500 flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {trip.duration}
                    </span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-6">{trip.description}</p>
                <ul className="space-y-2 mb-6">
                  {trip.includes.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle className="h-4 w-4 text-primary-500 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="border-t pt-6">
                  <div className="flex justify-between items-end mb-4">
                    <div>
                      <span className="text-sm text-gray-500">1 Person</span>
                      <p className="text-2xl font-bold text-gray-900">${trip.price1}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm text-gray-500">2 People</span>
                      <p className="text-2xl font-bold text-gray-900">${trip.price2}</p>
                    </div>
                  </div>
                  <Link
                    href="/trips"
                    className={`w-full inline-block text-center py-3 rounded-lg font-medium transition-colors ${
                      trip.featured
                        ? "bg-primary-600 text-white hover:bg-primary-700"
                        : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                    }`}
                  >
                    Book Now
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About Preview */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="aspect-[4/3] relative rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1531218150217-54595bc2b934?q=80&w=2028"
                  alt="Fly fishing guide on the Smith River"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-primary-600 text-white p-6 rounded-xl shadow-lg hidden md:block">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  <span className="font-medium">Born & Raised</span>
                </div>
                <p className="text-sm text-primary-100 mt-1">Smith River, VA</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-primary-600 font-medium">Your Guide</span>
              <h2 className="heading-2 text-gray-900 mt-2 mb-6">
                Local Expertise, Lifelong Passion
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Born and raised on the Smith River in Bassett, Virginia, your guide brings a lifetime of local knowledge and a deep passion for fly fishing to every trip.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Currently a Biology/Ecology Teacher and Baseball Coach, he blends teaching and coaching qualities into fly fishing instruction, making every trip both educational and enjoyable.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-primary-600">20+</p>
                  <p className="text-sm text-gray-600">Years on the Smith</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-primary-600">100%</p>
                  <p className="text-sm text-gray-600">Customer Satisfaction</p>
                </div>
              </div>
              <Link href="/about" className="btn-primary">
                Learn More About Us
                <ArrowRight className="ml-2 h-5 w-5 inline" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-primary-900 text-white">
        <div className="container-custom">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.span
              variants={fadeInUp}
              className="text-primary-300 font-medium"
            >
              Testimonials
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="heading-2 mt-2"
            >
              What Our Guests Say
            </motion.h2>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.name}
                variants={fadeInUp}
                className="bg-primary-800/50 backdrop-blur-sm rounded-2xl p-8"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-accent-400 text-accent-400" />
                  ))}
                </div>
                <p className="text-primary-100 leading-relaxed mb-6">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-primary-300">{testimonial.location}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1583375478223-1b847c4c5cdf?q=80&w=2070"
            alt="Smith River at sunset"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-primary-900/80" />
        </div>

        <div className="relative z-10 container-custom text-center text-white px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="heading-2 mb-6">Ready to Hit the Water?</h2>
            <p className="text-xl text-primary-100 max-w-2xl mx-auto mb-8">
              Book your guided fly fishing trip on the Smith River today. Limited availability, so reserve your spot now!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/trips" className="btn-accent text-lg px-8 py-4">
                Book Your Trip
              </Link>
              <a
                href="tel:+12767320517"
                className="btn-secondary bg-transparent border-white text-white hover:bg-white/10 text-lg px-8 py-4"
              >
                Call (276) 732-0517
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
