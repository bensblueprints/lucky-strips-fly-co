"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Fish,
  Clock,
  Users,
  MapPin,
  Star,
  ArrowRight,
  ArrowDown,
  CheckCircle,
  Waves,
  Compass,
} from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const rivers = [
  {
    name: "Smith River",
    location: "Bassett, Virginia",
    species: "Wild Brown Trout & Rainbow Trout",
    description:
      "Pristine tailwater fishery below Philpott Dam. Year-round trout viability with cold, clear waters.",
    image: "/images/hero.jpg",
    featured: true,
  },
  {
    name: "New River",
    location: "Radford - Pearisburg, VA",
    species: "Trophy Smallmouth Bass",
    description:
      "Float the nation's oldest river system chasing trophy smallmouth bass populations.",
    image: "/images/river-1.jpg",
  },
];

const trips = [
  {
    name: "Full Day Float Trip",
    duration: "7-8 Hours",
    price1: 375,
    price2: 475,
    description:
      "Cover more water with multiple rods rigged for various scenarios. Includes anchored boat fishing in prime holding waters.",
    includes: [
      "All fly fishing gear",
      "Lunch & beverages",
      "Expert instruction",
      "Drift boat included",
    ],
    featured: true,
  },
  {
    name: "Half Day Float Trip",
    duration: "4.5 Hours",
    price1: 300,
    price2: 375,
    description:
      "Perfect introduction to explore local freshwater resources. All gear provided with snacks and beverages.",
    includes: [
      "All fly fishing gear",
      "Snacks & beverages",
      "Expert instruction",
      "Drift boat included",
    ],
  },
];

const features = [
  {
    icon: Fish,
    title: "Wild Trout Waters",
    description:
      "The Smith River sustains a thriving wild brown trout population alongside stocked rainbow and brook trout.",
  },
  {
    icon: Waves,
    title: "Year-Round Fishing",
    description:
      "Cold tailwater conditions from Philpott Dam maintain ideal temperatures for trout fishing all year.",
  },
  {
    icon: Compass,
    title: "Local Expertise",
    description:
      "Born and raised on the Smith River with decades of fly fishing experience on these waters.",
  },
  {
    icon: Users,
    title: "All Skill Levels",
    description:
      "Whether you're casting for the first time or an experienced angler, trips are tailored to your level.",
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
      {/* Hero Section - Static background for performance */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Static Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero.jpg"
            alt="Fly fishing on the Smith River"
            fill
            className="object-cover"
            priority
          />
          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-earth-950/70 via-earth-900/50 to-earth-950/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-forest-900/30 via-transparent to-river-900/30" />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 container-luxury text-center text-white px-6 pt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Overline */}
            <div className="inline-flex items-center gap-3 mb-8">
              <span className="w-12 h-px bg-gradient-to-r from-transparent to-gold-400" />
              <span className="text-overline text-gold-400">
                Smith River & New River, Virginia
              </span>
              <span className="w-12 h-px bg-gradient-to-l from-transparent to-gold-400" />
            </div>

            {/* Main Headline */}
            <h1 className="heading-display text-white max-w-5xl mx-auto mb-8">
              Experience{" "}
              <span className="text-gradient-gold font-semibold italic">
                World-Class
              </span>{" "}
              Fly Fishing
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-earth-200 max-w-3xl mx-auto mb-12 leading-relaxed font-light">
              Guided fly fishing adventures on Virginia&apos;s premier tailwater fisheries.
              Wild brown trout, trophy smallmouth, and unforgettable days on the water.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/trips" className="btn-gold text-lg group">
                Book Your Adventure
                <ArrowRight className="ml-2 h-5 w-5 inline transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/about"
                className="btn-outline border-white/30 text-white hover:bg-white hover:text-earth-900 text-lg"
              >
                Meet Your Guide
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        >
          <div className="flex flex-col items-center gap-2 text-white/60 animate-bounce">
            <span className="text-xs tracking-ultra-wide uppercase">Explore</span>
            <ArrowDown className="h-5 w-5" />
          </div>
        </motion.div>

        {/* Decorative Corner Elements */}
        <div className="absolute top-32 left-8 w-24 h-24 border-l-2 border-t-2 border-gold-500/20 z-10" />
        <div className="absolute bottom-32 right-8 w-24 h-24 border-r-2 border-b-2 border-gold-500/20 z-10" />
      </section>

      {/* Rivers Overview Section */}
      <section className="section-padding bg-earth-100">
        <div className="container-luxury">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.span variants={fadeInUp} className="text-overline">
              Two Premier Fisheries
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="heading-editorial text-earth-900 mt-4"
            >
              Virginia&apos;s Finest Waters
            </motion.h2>
            <motion.div variants={fadeInUp} className="gold-line-center mt-6" />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {rivers.map((river, index) => (
              <motion.div
                key={river.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative overflow-hidden"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={river.image}
                    alt={river.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-earth-950/90 via-earth-950/40 to-transparent" />

                  {/* Content Overlay */}
                  <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                    <div className="flex items-center gap-2 text-gold-400 text-sm mb-3">
                      <MapPin className="h-4 w-4" />
                      {river.location}
                    </div>
                    <h3 className="font-display text-2xl md:text-3xl text-white font-medium mb-2">
                      {river.name}
                    </h3>
                    <p className="text-gold-300 font-medium mb-3">
                      {river.species}
                    </p>
                    <p className="text-earth-200 text-sm leading-relaxed max-w-lg">
                      {river.description}
                    </p>
                    <Link
                      href="/trips"
                      className="inline-flex items-center gap-2 text-gold-400 hover:text-gold-300 mt-4 font-medium transition-colors group/link"
                    >
                      View Trips
                      <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                    </Link>
                  </div>

                  {/* Decorative Border */}
                  <div className="absolute inset-3 border border-white/10 pointer-events-none" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-white">
        <div className="container-luxury">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.span variants={fadeInUp} className="text-overline">
              Why Fish With Us
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="heading-editorial text-earth-900 mt-4"
            >
              The Lucky Strips Difference
            </motion.h2>
            <motion.div variants={fadeInUp} className="gold-line-center mt-6" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group text-center p-6 bg-earth-50 border border-earth-200/50 hover:border-gold-500/30 hover:bg-gold-50/50 transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 mb-5 border-2 border-gold-500/30 group-hover:border-gold-500 group-hover:bg-gold-500 transition-all duration-300">
                  <feature.icon className="h-6 w-6 text-gold-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="font-display text-lg font-medium text-earth-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-earth-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trips Section */}
      <section className="section-padding bg-earth-900 text-white">
        <div className="container-luxury">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.span variants={fadeInUp} className="text-overline text-gold-400">
              Guided Adventures
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="heading-editorial text-white mt-4"
            >
              Choose Your Trip
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-earth-300 mt-6 max-w-2xl mx-auto"
            >
              All trips include expert instruction, premium fly fishing gear, and
              a drift boat experience on Virginia&apos;s finest waters.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {trips.map((trip, index) => (
              <motion.div
                key={trip.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`relative bg-earth-800/50 backdrop-blur border border-earth-700 p-6 hover:border-gold-500/50 transition-all duration-300 ${
                  trip.featured ? "ring-1 ring-gold-500/30" : ""
                }`}
              >
                {trip.featured && (
                  <div className="absolute -top-px left-0 right-0 h-1 bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500" />
                )}

                <div className="flex items-start justify-between mb-5">
                  <div>
                    <h3 className="font-display text-xl text-white mb-1">
                      {trip.name}
                    </h3>
                    <span className="flex items-center gap-2 text-gold-400 text-sm">
                      <Clock className="h-4 w-4" />
                      {trip.duration}
                    </span>
                  </div>
                  {trip.featured && (
                    <span className="px-2 py-1 bg-gold-500 text-earth-900 text-xs font-semibold tracking-wide">
                      POPULAR
                    </span>
                  )}
                </div>

                <p className="text-earth-300 text-sm mb-5 leading-relaxed">
                  {trip.description}
                </p>

                <ul className="space-y-2 mb-6">
                  {trip.includes.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-sm text-earth-200"
                    >
                      <CheckCircle className="h-4 w-4 text-gold-500 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="border-t border-earth-700 pt-5">
                  <div className="flex justify-between items-end mb-5">
                    <div>
                      <span className="text-earth-500 text-xs uppercase tracking-wide">
                        1 Person
                      </span>
                      <p className="text-2xl font-display text-white">
                        ${trip.price1}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-earth-500 text-xs uppercase tracking-wide">
                        2 People
                      </span>
                      <p className="text-2xl font-display text-white">
                        ${trip.price2}
                      </p>
                    </div>
                  </div>
                  <Link
                    href="/book"
                    className={`w-full text-center block py-3 font-semibold tracking-wide transition-all duration-300 ${
                      trip.featured
                        ? "bg-gold-500 text-earth-900 hover:bg-gold-400"
                        : "bg-earth-700 text-white hover:bg-gold-500 hover:text-earth-900"
                    }`}
                  >
                    Book Now
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/trips"
              className="inline-flex items-center gap-2 text-gold-400 hover:text-gold-300 font-medium transition-colors"
            >
              View All Trip Options
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-earth-100">
        <div className="container-luxury">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.span variants={fadeInUp} className="text-overline">
              Client Stories
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="heading-editorial text-earth-900 mt-4"
            >
              What Anglers Say
            </motion.h2>
            <motion.div variants={fadeInUp} className="gold-line-center mt-6" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white p-6 border border-earth-200 hover:border-gold-500/30 hover:shadow-md transition-all duration-300"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-gold-400 text-gold-400"
                    />
                  ))}
                </div>
                <p className="text-earth-700 leading-relaxed mb-5 italic text-sm">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-earth-200">
                  <div className="w-9 h-9 bg-gold-500/10 rounded-full flex items-center justify-center">
                    <span className="text-gold-600 font-semibold text-sm">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-earth-900 text-sm">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-earth-500">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/river-1.jpg"
            alt="Smith River scenery"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-earth-950/85" />
        </div>

        <div className="relative z-10 container-luxury text-center text-white px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-overline text-gold-400 mb-4 block">
              Your Adventure Awaits
            </span>
            <h2 className="heading-editorial mb-6">Ready to Hit the Water?</h2>
            <p className="text-lg text-earth-200 max-w-2xl mx-auto mb-8 leading-relaxed">
              Book your guided fly fishing trip on the Smith River or New River
              today. Limited availability, so reserve your spot now.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/book" className="btn-gold text-lg">
                Book Your Trip
              </Link>
              <a
                href="tel:+12767320517"
                className="btn-outline border-white/30 text-white hover:bg-white hover:text-earth-900 text-lg"
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
