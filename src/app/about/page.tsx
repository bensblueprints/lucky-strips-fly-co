"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  MapPin,
  Fish,
  GraduationCap,
  Heart,
  Award,
  ArrowRight,
  CheckCircle,
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

const values = [
  {
    icon: GraduationCap,
    title: "Education First",
    description: "Every trip is an opportunity to learn about fly casting, entomology, and freshwater ecosystems."
  },
  {
    icon: Heart,
    title: "Conservation",
    description: "We practice and teach catch-and-release techniques to protect the Smith River's wild trout population."
  },
  {
    icon: Fish,
    title: "Local Expertise",
    description: "Born and raised on the Smith River, bringing decades of local knowledge to every guided trip."
  },
  {
    icon: Award,
    title: "Quality Experience",
    description: "Premium gear, patient instruction, and a commitment to creating memorable fishing experiences."
  },
];

const expertise = [
  "Fly Casting Instruction",
  "Entomology Education",
  "Conservation & Restoration",
  "Freshwater Exploration",
  "Drift Boat Handling",
  "Reading the Water",
  "Fly Selection & Matching",
  "Catch & Release Techniques",
];

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-primary-900">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image
            src="/images/river-1.jpg"
            alt="Smith River landscape"
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
              About Lucky Strips Fly Co.
            </span>
            <h1 className="heading-1 max-w-3xl mx-auto mb-6">
              Your Guide to Virginia&apos;s Premier Tailwater
            </h1>
            <p className="text-xl text-primary-100 max-w-2xl mx-auto">
              Local expertise, lifelong passion, and a commitment to sharing the magic of the Smith River.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-primary-600 font-medium">Our Story</span>
              <h2 className="heading-2 text-gray-900 mt-2 mb-6">
                Born on the Smith River
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Lucky Strips Fly Co. was born from a lifelong connection to Virginia&apos;s Smith River. Growing up in Bassett, Virginia, the river wasn&apos;t just a place to fish—it was a classroom, a playground, and eventually, a calling.
                </p>
                <p>
                  As a Biology and Ecology teacher, the passion for understanding and protecting freshwater ecosystems runs deep. Every guided trip is an opportunity to share not just fishing techniques, but a deeper appreciation for these incredible resources.
                </p>
                <p>
                  Whether you&apos;re picking up a fly rod for the first time or you&apos;ve been chasing trout for decades, Lucky Strips Fly Co. offers an authentic Smith River experience. We believe in education, conservation, and creating memories that last a lifetime.
                </p>
              </div>
              <div className="mt-8 flex items-center gap-4">
                <div className="flex items-center gap-2 text-primary-600">
                  <MapPin className="h-5 w-5" />
                  <span className="font-medium">Bassett, Virginia</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="aspect-[4/5] relative rounded-2xl overflow-hidden">
                <Image
                  src="/images/fish-2.jpg"
                  alt="Fly fishing guide"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-xl shadow-xl hidden md:block">
                <p className="text-3xl font-bold text-primary-600">20+</p>
                <p className="text-gray-600">Years on the Smith River</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Fishery Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-2 lg:order-1"
            >
              <div className="aspect-video relative rounded-2xl overflow-hidden">
                <Image
                  src="/images/river-2.jpg"
                  alt="Smith River Virginia"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-1 lg:order-2"
            >
              <span className="text-primary-600 font-medium">The Fishery</span>
              <h2 className="heading-2 text-gray-900 mt-2 mb-6">
                The Smith River
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  The Smith River is a tailwater created by discharge flows from Philpott Dam and Philpott Lake. This unique fishery maintains cold, habitable water temperatures year-round, creating ideal conditions for trout.
                </p>
                <p>
                  The river is home to a wild population of brown trout, in addition to stocked rainbow and brook trout. The diverse insect hatches and scenic beauty make it one of Virginia&apos;s premier fly fishing destinations.
                </p>
                <p>
                  From technical dry fly fishing during hatches to streamer fishing for aggressive browns, the Smith River offers something for every angler.
                </p>
              </div>
              <div className="mt-8 grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-white rounded-xl">
                  <p className="text-2xl font-bold text-primary-600">Wild</p>
                  <p className="text-sm text-gray-600">Brown Trout</p>
                </div>
                <div className="text-center p-4 bg-white rounded-xl">
                  <p className="text-2xl font-bold text-primary-600">50°F</p>
                  <p className="text-sm text-gray-600">Avg Water Temp</p>
                </div>
                <div className="text-center p-4 bg-white rounded-xl">
                  <p className="text-2xl font-bold text-primary-600">365</p>
                  <p className="text-sm text-gray-600">Days a Year</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
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
              Our Values
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="heading-2 text-gray-900 mt-2"
            >
              What We Stand For
            </motion.h2>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {values.map((value) => (
              <motion.div
                key={value.title}
                variants={fadeInUp}
                className="text-center p-6"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 text-primary-600 mb-4">
                  <value.icon className="h-8 w-8" />
                </div>
                <h3 className="font-display text-lg font-semibold text-gray-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="section-padding bg-primary-900 text-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-primary-300 font-medium">Guide Expertise</span>
              <h2 className="heading-2 mt-2 mb-6">
                What You&apos;ll Learn
              </h2>
              <p className="text-primary-100 leading-relaxed mb-8">
                Every trip with Lucky Strips Fly Co. is more than just fishing—it&apos;s an education. Whether you&apos;re a beginner or experienced angler, you&apos;ll gain valuable knowledge and skills.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {expertise.map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary-300 flex-shrink-0" />
                    <span className="text-primary-100">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="aspect-[4/3] relative rounded-2xl overflow-hidden">
                <Image
                  src="/images/boat-1.jpg"
                  alt="Fly fishing instruction"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-white">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="heading-2 text-gray-900 mb-4">
              Ready to Experience the Smith River?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              Book your guided fly fishing trip today and discover why the Smith River is Virginia&apos;s premier trout destination.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/trips" className="btn-primary">
                View Our Trips
                <ArrowRight className="ml-2 h-5 w-5 inline" />
              </Link>
              <Link href="/contact" className="btn-secondary">
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
