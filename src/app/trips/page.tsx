"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  Users,
  CheckCircle,
  Phone,
  Fish,
  Sun,
  Sunrise,
  MapPin,
  Waves,
  Target,
  ChevronDown,
  Mail,
  Star,
} from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: "easeOut" }
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.08
    }
  }
};

// Smith River Trips
const smithRiverTrips = [
  {
    id: "smith-full-day-2",
    name: "Full Day Trout Float Trip",
    subtitle: "Two Person",
    river: "Smith River",
    duration: "7-8 Hours",
    icon: Sun,
    price: 475,
    guests: 2,
    featured: true,
    description: "Our signature experience for pairs. Spend a full day floating the pristine Smith River, targeting wild brown and rainbow trout.",
    includes: [
      "All fly fishing gear provided",
      "Riverside gourmet lunch",
      "Snacks and premium beverages",
      "Expert guide instruction",
      "Drift boat float",
      "Waders and boots",
      "Trip photography",
    ],
  },
  {
    id: "smith-full-day-1",
    name: "Full Day Trout Float Trip",
    subtitle: "One Person",
    river: "Smith River",
    duration: "7-8 Hours",
    icon: Sun,
    price: 375,
    guests: 1,
    description: "The ultimate solo fishing experience. One-on-one time with your guide means personalized instruction and maximum fishing time.",
    includes: [
      "All fly fishing gear provided",
      "Riverside gourmet lunch",
      "Snacks and beverages",
      "Personalized instruction",
      "Drift boat float",
      "Waders and boots",
    ],
  },
  {
    id: "smith-half-day-2",
    name: "Half Day Trout Float Trip",
    subtitle: "Two Person",
    river: "Smith River",
    duration: "4-5 Hours",
    icon: Sunrise,
    price: 375,
    guests: 2,
    description: "Perfect introduction to Smith River fly fishing. Ideal for beginners or those with limited time who want quality water time.",
    includes: [
      "All fly fishing gear provided",
      "Snacks and beverages",
      "Expert instruction",
      "Drift boat float",
      "Waders and boots",
    ],
  },
  {
    id: "smith-half-day-1",
    name: "Half Day Trout Float Trip",
    subtitle: "One Person",
    river: "Smith River",
    duration: "4-5 Hours",
    icon: Sunrise,
    price: 300,
    guests: 1,
    description: "A focused morning or afternoon session. Great for honing your skills or experiencing the river before committing to a full day.",
    includes: [
      "All fly fishing gear provided",
      "Snacks and beverages",
      "Personalized instruction",
      "Drift boat float",
      "Waders and boots",
    ],
  },
];

// New River Trips
const newRiverTrips = [
  {
    id: "new-full-day-2",
    name: "Full Day Smallmouth Trip",
    subtitle: "Two Person",
    river: "New River",
    duration: "7-8 Hours",
    icon: Sun,
    price: 500,
    guests: 2,
    featured: true,
    description: "Experience Virginia's premier smallmouth bass fishery. The New River offers incredible topwater action and hard-fighting fish.",
    includes: [
      "All fly fishing gear provided",
      "Riverside lunch",
      "Snacks and beverages",
      "Expert guide instruction",
      "Drift boat or raft float",
      "Trip photography",
    ],
  },
  {
    id: "new-full-day-1",
    name: "Full Day Smallmouth Trip",
    subtitle: "One Person",
    river: "New River",
    duration: "7-8 Hours",
    icon: Sun,
    price: 400,
    guests: 1,
    description: "Solo adventure on the legendary New River. Target trophy smallmouth bass with personalized guide attention.",
    includes: [
      "All fly fishing gear provided",
      "Riverside lunch",
      "Snacks and beverages",
      "Personalized instruction",
      "Drift boat or raft float",
    ],
  },
];

const castingInstruction = {
  id: "casting",
  name: "Casting Instruction",
  duration: "1 Hour",
  icon: Target,
  price: 75,
  description: "Perfect your fly casting technique with one-on-one instruction. Ideal for beginners or experienced anglers looking to refine their skills.",
  includes: [
    "One-on-one instruction",
    "All gear provided",
    "Video analysis (optional)",
    "Take-home tips sheet",
  ],
};

const faqs = [
  {
    question: "What should I bring on my trip?",
    answer: "We provide all fishing gear, but please bring sunglasses (polarized preferred), sunscreen, a hat, layered clothing appropriate for the weather, and a valid Virginia fishing license with trout stamp. A rain jacket is always a good idea."
  },
  {
    question: "Do I need a fishing license?",
    answer: "Yes, you'll need a valid Virginia fishing license with a trout stamp for Smith River trips. Licenses can be purchased online at the Virginia Department of Wildlife Resources website. We can help you with this process if needed."
  },
  {
    question: "What happens if the weather is bad?",
    answer: "We fish in light rain - often the best fishing happens during overcast or rainy conditions! In cases of severe weather, lightning, or unsafe conditions, we'll work with you to reschedule at no additional cost."
  },
  {
    question: "Can beginners book trips?",
    answer: "Absolutely! Many of our clients are first-time fly fishers. Our guides are experienced instructors who will have you casting and catching fish in no time. We provide all gear and patient, thorough instruction."
  },
  {
    question: "What's the best time of year to fish?",
    answer: "The Smith River fishes well year-round thanks to the cold tailwater from Philpott Dam. Spring and fall offer excellent dry fly fishing during hatches, while winter can produce some of the largest brown trout. Summer offers consistent fishing with terrestrial patterns."
  },
  {
    question: "Can I keep the fish I catch?",
    answer: "We practice catch and release to protect the wild trout population on the Smith River. The New River has different regulations that may allow harvest of smallmouth bass - ask your guide about current regulations."
  },
];

export default function TripsPage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  return (
    <>
      {/* Hero Section - Static for performance */}
      <section className="relative h-[60vh] min-h-[450px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/boat-1.jpg"
            alt="Drift boat on the Smith River"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-earth-900/70 via-earth-900/50 to-earth-900/80" />
        </div>

        <div className="relative z-10 text-center text-white px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block text-overline text-gold-400 mb-4">
              Guided Fly Fishing Experiences
            </span>
            <h1 className="heading-display text-white mb-6">
              Book Your
              <span className="block text-gold-400">Adventure</span>
            </h1>
            <p className="text-lg text-earth-200 max-w-2xl mx-auto mb-8">
              World-class fly fishing on Virginia&apos;s Smith River and New River.
              Choose your experience and create memories that last a lifetime.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="#smith-river" className="btn-gold">
                <Fish className="mr-2 h-5 w-5" />
                Smith River Trout
              </a>
              <a href="#new-river" className="btn-outline border-white text-white hover:bg-white hover:text-earth-900">
                <Waves className="mr-2 h-5 w-5" />
                New River Smallmouth
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Smith River Section */}
      <section id="smith-river" className="section-padding bg-earth-100">
        <div className="container-luxury">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
            className="text-center mb-12"
          >
            <motion.div variants={fadeInUp} className="flex items-center justify-center gap-3 mb-4">
              <span className="w-12 h-px bg-gold-500" />
              <Fish className="h-5 w-5 text-gold-500" />
              <span className="w-12 h-px bg-gold-500" />
            </motion.div>
            <motion.span variants={fadeInUp} className="text-overline text-gold-600">
              Virginia&apos;s Premier Tailwater
            </motion.span>
            <motion.h2 variants={fadeInUp} className="heading-editorial text-earth-800 mt-2 mb-4">
              Smith River Trout Trips
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-earth-600 max-w-3xl mx-auto">
              The Smith River below Philpott Dam offers year-round trout fishing in cold,
              pristine waters. Target wild brown and rainbow trout in one of Virginia&apos;s
              most beautiful settings.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {smithRiverTrips.map((trip, index) => (
              <motion.div
                key={trip.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className={`bg-white border ${trip.featured ? 'ring-2 ring-gold-500 border-gold-500' : 'border-earth-200'} hover:shadow-lg transition-shadow duration-300`}
              >
                {trip.featured && (
                  <div className="bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 text-earth-900 text-center py-2 text-sm font-semibold tracking-wide">
                    <Star className="inline h-4 w-4 mr-1" />
                    Most Popular
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 text-gold-600 text-sm font-medium mb-1">
                        <MapPin className="h-4 w-4" />
                        {trip.river}
                      </div>
                      <h3 className="font-display text-xl font-medium text-earth-800">
                        {trip.name}
                      </h3>
                      <p className="text-earth-500 text-sm">{trip.subtitle}</p>
                    </div>
                    <div className={`p-2 ${trip.featured ? 'bg-gold-100' : 'bg-earth-100'}`}>
                      <trip.icon className={`h-5 w-5 ${trip.featured ? 'text-gold-600' : 'text-earth-600'}`} />
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mb-4 text-earth-500 text-sm">
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {trip.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {trip.guests} {trip.guests === 1 ? 'Person' : 'People'}
                    </span>
                  </div>

                  <p className="text-earth-600 text-sm mb-4">{trip.description}</p>

                  <div className="mb-4">
                    <h4 className="text-xs font-semibold text-earth-700 uppercase tracking-wide mb-2">
                      What&apos;s Included
                    </h4>
                    <ul className="grid grid-cols-1 gap-1">
                      {trip.includes.slice(0, 4).map((item) => (
                        <li key={item} className="flex items-center gap-2 text-xs text-earth-600">
                          <CheckCircle className="h-3 w-3 text-gold-500 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                      {trip.includes.length > 4 && (
                        <li className="text-xs text-earth-500 italic">
                          + {trip.includes.length - 4} more included
                        </li>
                      )}
                    </ul>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-earth-200">
                    <div>
                      <span className="text-xs text-earth-500">Starting at</span>
                      <p className="text-2xl font-display font-semibold text-earth-800">
                        ${trip.price}
                      </p>
                    </div>
                    <Link
                      href="/book"
                      className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                        trip.featured
                          ? 'bg-gold-500 text-earth-900 hover:bg-gold-400'
                          : 'bg-earth-800 text-white hover:bg-earth-700'
                      }`}
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* New River Section */}
      <section id="new-river" className="section-padding bg-white">
        <div className="container-luxury">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
            className="text-center mb-12"
          >
            <motion.div variants={fadeInUp} className="flex items-center justify-center gap-3 mb-4">
              <span className="w-12 h-px bg-river-500" />
              <Waves className="h-5 w-5 text-river-500" />
              <span className="w-12 h-px bg-river-500" />
            </motion.div>
            <motion.span variants={fadeInUp} className="text-overline text-river-600">
              World-Class Smallmouth Fishery
            </motion.span>
            <motion.h2 variants={fadeInUp} className="heading-editorial text-earth-800 mt-2 mb-4">
              New River Smallmouth Trips
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-earth-600 max-w-3xl mx-auto">
              One of the oldest rivers in the world, the New River offers exceptional
              smallmouth bass fishing. Experience explosive topwater action and
              hard-fighting fish in stunning mountain scenery.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {newRiverTrips.map((trip, index) => (
              <motion.div
                key={trip.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className={`bg-white border ${trip.featured ? 'ring-2 ring-river-500 border-river-500' : 'border-earth-200'} hover:shadow-lg transition-shadow duration-300`}
              >
                {trip.featured && (
                  <div className="bg-gradient-to-r from-river-600 via-river-500 to-river-600 text-white text-center py-2 text-sm font-semibold tracking-wide">
                    <Star className="inline h-4 w-4 mr-1" />
                    Best Value
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 text-river-600 text-sm font-medium mb-1">
                        <MapPin className="h-4 w-4" />
                        {trip.river}
                      </div>
                      <h3 className="font-display text-xl font-medium text-earth-800">
                        {trip.name}
                      </h3>
                      <p className="text-earth-500 text-sm">{trip.subtitle}</p>
                    </div>
                    <div className={`p-2 ${trip.featured ? 'bg-river-100' : 'bg-earth-100'}`}>
                      <trip.icon className={`h-5 w-5 ${trip.featured ? 'text-river-600' : 'text-earth-600'}`} />
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mb-4 text-earth-500 text-sm">
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {trip.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {trip.guests} {trip.guests === 1 ? 'Person' : 'People'}
                    </span>
                  </div>

                  <p className="text-earth-600 text-sm mb-4">{trip.description}</p>

                  <div className="mb-4">
                    <h4 className="text-xs font-semibold text-earth-700 uppercase tracking-wide mb-2">
                      What&apos;s Included
                    </h4>
                    <ul className="grid grid-cols-1 gap-1">
                      {trip.includes.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-xs text-earth-600">
                          <CheckCircle className="h-3 w-3 text-river-500 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-earth-200">
                    <div>
                      <span className="text-xs text-earth-500">Starting at</span>
                      <p className="text-2xl font-display font-semibold text-earth-800">
                        ${trip.price}
                      </p>
                    </div>
                    <Link
                      href="/book"
                      className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                        trip.featured
                          ? 'bg-river-600 text-white hover:bg-river-500'
                          : 'bg-earth-800 text-white hover:bg-earth-700'
                      }`}
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Casting Instruction */}
      <section className="section-padding bg-earth-800">
        <div className="container-luxury">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-earth-900/50 border border-earth-700 p-6 md:p-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div>
                  <div className="flex items-center gap-2 text-gold-400 text-sm font-medium mb-3">
                    <Target className="h-5 w-5" />
                    Perfect Your Technique
                  </div>
                  <h3 className="font-display text-2xl font-medium text-white mb-3">
                    Casting Instruction
                  </h3>
                  <p className="text-earth-300 text-sm mb-4">
                    {castingInstruction.description}
                  </p>
                  <ul className="space-y-2">
                    {castingInstruction.includes.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-earth-300 text-sm">
                        <CheckCircle className="h-4 w-4 text-gold-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="text-center">
                  <div className="inline-block bg-earth-800 p-6 border border-gold-500/30">
                    <span className="text-earth-400 text-sm">1 Hour Session</span>
                    <p className="text-4xl font-display font-semibold text-gold-400 my-2">
                      ${castingInstruction.price}
                    </p>
                    <Link href="/book" className="btn-gold mt-3">
                      Schedule Session
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="section-padding bg-earth-100">
        <div className="container-luxury">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
            className="text-center mb-12"
          >
            <motion.span variants={fadeInUp} className="text-overline text-gold-600">
              Your Experience
            </motion.span>
            <motion.h2 variants={fadeInUp} className="heading-section text-earth-800 mt-2">
              What to Expect
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: "01",
                title: "Meet & Gear Up",
                description: "Meet at the designated put-in location. We'll get you fitted with waders, boots, and all the fly fishing gear you need for the day."
              },
              {
                step: "02",
                title: "Learn & Fish",
                description: "Whether you're a beginner or expert, receive personalized instruction as we float the river targeting fish in the best spots."
              },
              {
                step: "03",
                title: "Memories Made",
                description: "End the day with photos of your catches, new skills learned, and memories of an incredible day on Virginia's finest waters."
              }
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gold-500 text-earth-900 font-display text-xl font-semibold mb-4">
                  {item.step}
                </div>
                <h3 className="font-display text-lg font-medium text-earth-800 mb-2">
                  {item.title}
                </h3>
                <p className="text-earth-600 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="section-padding bg-white">
        <div className="container-luxury max-w-3xl">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
            className="text-center mb-10"
          >
            <motion.span variants={fadeInUp} className="text-overline text-gold-600">
              Questions?
            </motion.span>
            <motion.h2 variants={fadeInUp} className="heading-section text-earth-800 mt-2">
              Frequently Asked Questions
            </motion.h2>
          </motion.div>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-earth-200 bg-earth-50/50"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full px-5 py-4 text-left flex justify-between items-center hover:bg-earth-100 transition-colors"
                >
                  <span className="font-display font-medium text-earth-800 text-sm pr-4">{faq.question}</span>
                  <ChevronDown className={`h-5 w-5 text-gold-500 flex-shrink-0 transition-transform duration-200 ${expandedFaq === index ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {expandedFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-4 text-earth-600 text-sm border-t border-earth-200 pt-3">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-earth-900">
        <div className="container-luxury text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-overline text-gold-400 mb-4 block">Ready to Fish?</span>
            <h2 className="heading-editorial text-white mb-4">
              Book Your Trip Today
            </h2>
            <p className="text-earth-300 max-w-2xl mx-auto mb-8">
              Contact us to check availability and reserve your spot on Virginia&apos;s finest waters.
              We&apos;re happy to help you choose the perfect trip for your experience level.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href="tel:+12767320517" className="btn-gold">
                <Phone className="mr-2 h-5 w-5" />
                (276) 732-0517
              </a>
              <a
                href="mailto:luckystripsflyco@gmail.com"
                className="btn-outline border-gold-500 text-gold-400 hover:bg-gold-500 hover:text-earth-900"
              >
                <Mail className="mr-2 h-5 w-5" />
                Email Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
