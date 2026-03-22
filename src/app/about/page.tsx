"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  MapPin,
  Fish,
  GraduationCap,
  Heart,
  Award,
  ArrowRight,
  CheckCircle,
  Droplets,
  Thermometer,
  Calendar,
  Shield,
  Users,
  Compass,
} from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
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
  "Conservation Practices",
  "Freshwater Ecology",
  "Drift Boat Handling",
  "Reading the Water",
  "Fly Selection & Matching",
  "Catch & Release Techniques",
];

const riverStats = [
  {
    icon: Fish,
    value: "Wild",
    label: "Brown Trout Population",
    description: "Self-sustaining wild brown trout"
  },
  {
    icon: Thermometer,
    value: "48-54°F",
    label: "Year-Round Water Temp",
    description: "Cold tailwater from Philpott Dam"
  },
  {
    icon: Calendar,
    value: "365",
    label: "Days of Fishing",
    description: "Fish year-round in all conditions"
  },
  {
    icon: Droplets,
    value: "20+",
    label: "Miles of Water",
    description: "From dam to Dan River confluence"
  },
];

export default function AboutPage() {
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <>
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-[60vh] min-h-[450px] flex items-center justify-center overflow-hidden">
        <motion.div
          style={{ y: heroY }}
          className="absolute inset-0 z-0"
        >
          <Image
            src="/images/river-1.jpg"
            alt="Smith River landscape"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-earth-900/60 via-earth-900/40 to-earth-900/70" />
        </motion.div>

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 text-center text-white px-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <span className="w-12 h-px bg-gold-400" />
            <span className="text-overline text-gold-400">Our Story</span>
            <span className="w-12 h-px bg-gold-400" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="heading-display text-white mb-6"
          >
            Lucky Strips
            <span className="block text-gold-400">Fly Company</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-earth-200 max-w-2xl mx-auto"
          >
            Local expertise, lifelong passion, and a commitment to sharing
            the magic of Virginia&apos;s finest waters.
          </motion.p>
        </motion.div>
      </section>

      {/* Story Section */}
      <section className="section-padding bg-white">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-overline text-gold-600">The Beginning</span>
              <h2 className="heading-editorial text-earth-800 mt-2 mb-6">
                Born on the Smith River
              </h2>
              <div className="space-y-5 text-earth-600 leading-relaxed">
                <p>
                  Lucky Strips Fly Co. was born from a lifelong connection to Virginia&apos;s
                  Smith River. Growing up in Bassett, Virginia, the river wasn&apos;t just a
                  place to fish—it was a classroom, a playground, and eventually, a calling.
                </p>
                <p>
                  As a Biology and Ecology teacher, the passion for understanding and
                  protecting freshwater ecosystems runs deep. Every guided trip is an
                  opportunity to share not just fishing techniques, but a deeper appreciation
                  for these incredible resources.
                </p>
                <p>
                  Whether you&apos;re picking up a fly rod for the first time or you&apos;ve
                  been chasing trout for decades, Lucky Strips Fly Co. offers an authentic
                  Smith River experience. We believe in education, conservation, and creating
                  memories that last a lifetime.
                </p>
              </div>

              <div className="mt-8 flex items-center gap-6">
                <div className="flex items-center gap-2 text-gold-600">
                  <MapPin className="h-5 w-5" />
                  <span className="font-medium">Bassett, Virginia</span>
                </div>
                <div className="w-px h-6 bg-earth-300" />
                <div className="flex items-center gap-2 text-earth-600">
                  <GraduationCap className="h-5 w-5 text-gold-500" />
                  <span>Biology & Ecology Educator</span>
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
              <div className="aspect-[4/5] relative overflow-hidden">
                <Image
                  src="/images/fish-2.jpg"
                  alt="Fly fishing guide with caught trout"
                  fill
                  className="object-cover"
                />
                {/* Decorative Frame */}
                <div className="absolute inset-4 border-2 border-gold-500/30 pointer-events-none" />
              </div>

              {/* Stats Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="absolute -bottom-8 -left-8 bg-earth-900 text-white p-8 shadow-elevated hidden md:block"
              >
                <p className="text-4xl font-display font-semibold text-gold-400">20+</p>
                <p className="text-earth-300 text-sm mt-1">Years on the Smith River</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Fishery Section */}
      <section className="section-padding bg-earth-100">
        <div className="container-luxury">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.div variants={fadeInUp} className="flex items-center justify-center gap-3 mb-4">
              <span className="w-12 h-px bg-gold-500" />
              <Droplets className="h-6 w-6 text-gold-500" />
              <span className="w-12 h-px bg-gold-500" />
            </motion.div>
            <motion.span variants={fadeInUp} className="text-overline text-gold-600">
              The Fishery
            </motion.span>
            <motion.h2 variants={fadeInUp} className="heading-editorial text-earth-800 mt-2 mb-4">
              The Smith River
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-body-lg max-w-3xl mx-auto">
              Virginia&apos;s premier tailwater fishery, fed by the cold releases from
              Philpott Dam. Home to wild brown trout and stocked rainbows, offering
              exceptional year-round fly fishing.
            </motion.p>
          </motion.div>

          {/* River Stats */}
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          >
            {riverStats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={fadeInUp}
                whileHover={{ y: -4 }}
                className="bg-white p-6 border border-earth-200 text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gold-100 mb-4">
                  <stat.icon className="h-6 w-6 text-gold-600" />
                </div>
                <p className="text-3xl font-display font-semibold text-earth-800">{stat.value}</p>
                <p className="text-sm font-medium text-gold-600 mt-1">{stat.label}</p>
                <p className="text-xs text-earth-500 mt-2">{stat.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Two Column Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="aspect-video relative overflow-hidden"
            >
              <Image
                src="/images/river-2.jpg"
                alt="Smith River Virginia"
                fill
                className="object-cover"
              />
              <div className="absolute inset-4 border-2 border-white/20 pointer-events-none" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="heading-section text-earth-800 mb-6">
                A Year-Round Destination
              </h3>
              <div className="space-y-4 text-earth-600 leading-relaxed">
                <p>
                  The Smith River is a tailwater created by discharge flows from Philpott
                  Dam and Philpott Lake. This unique fishery maintains cold, habitable
                  water temperatures year-round, creating ideal conditions for trout.
                </p>
                <p>
                  The river is home to a wild population of brown trout, in addition to
                  stocked rainbow and brook trout. The diverse insect hatches and scenic
                  beauty make it one of Virginia&apos;s premier fly fishing destinations.
                </p>
                <p>
                  From technical dry fly fishing during hatches to streamer fishing for
                  aggressive browns, the Smith River offers something for every angler.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-white">
        <div className="container-luxury">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.span variants={fadeInUp} className="text-overline text-gold-600">
              Our Philosophy
            </motion.span>
            <motion.h2 variants={fadeInUp} className="heading-editorial text-earth-800 mt-2">
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
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                variants={fadeInUp}
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="text-center p-8 bg-earth-50 border border-earth-200 hover:border-gold-500 transition-colors duration-300"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gold-100 mb-6">
                  <value.icon className="h-8 w-8 text-gold-600" />
                </div>
                <h3 className="font-display text-xl font-medium text-earth-800 mb-3">
                  {value.title}
                </h3>
                <p className="text-earth-600 text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="section-padding bg-earth-900 text-white overflow-hidden">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-overline text-gold-400">Guide Expertise</span>
              <h2 className="heading-editorial text-white mt-2 mb-6">
                What You&apos;ll Learn
              </h2>
              <p className="text-earth-300 leading-relaxed mb-10 text-lg">
                Every trip with Lucky Strips Fly Co. is more than just fishing—it&apos;s an
                education. Whether you&apos;re a beginner or experienced angler, you&apos;ll
                gain valuable knowledge and skills.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {expertise.map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle className="h-5 w-5 text-gold-500 flex-shrink-0" />
                    <span className="text-earth-200">{item}</span>
                  </motion.div>
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
              <div className="aspect-[4/3] relative overflow-hidden">
                <Image
                  src="/images/boat-1.jpg"
                  alt="Fly fishing instruction on drift boat"
                  fill
                  className="object-cover"
                />
                {/* Gold Border */}
                <div className="absolute inset-4 border-2 border-gold-500/30 pointer-events-none" />
              </div>

              {/* Decorative Element */}
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gold-500/10 border border-gold-500/30" />
            </motion.div>
          </div>
        </div>

        {/* Decorative Fish */}
        <div className="absolute right-0 bottom-0 opacity-5">
          <Fish className="w-64 h-64" />
        </div>
      </section>

      {/* New River Section */}
      <section className="section-padding bg-earth-100">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-2 lg:order-1"
            >
              <div className="aspect-video relative overflow-hidden">
                <Image
                  src="/images/fish-3.jpg"
                  alt="Smallmouth bass on the New River"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-4 border-2 border-river-500/30 pointer-events-none" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-1 lg:order-2"
            >
              <span className="text-overline text-river-600">Also Available</span>
              <h2 className="heading-editorial text-earth-800 mt-2 mb-6">
                The New River
              </h2>
              <div className="space-y-4 text-earth-600 leading-relaxed mb-8">
                <p>
                  Beyond the Smith River, we also offer guided trips on Virginia&apos;s
                  legendary New River. One of the oldest rivers in the world, the New
                  River is a world-class smallmouth bass fishery.
                </p>
                <p>
                  Experience explosive topwater action, hard-fighting fish, and stunning
                  mountain scenery. The New River offers a different but equally exciting
                  fly fishing experience.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-white px-4 py-2 border border-earth-200">
                  <Fish className="h-4 w-4 text-river-500" />
                  <span className="text-sm text-earth-700">Smallmouth Bass</span>
                </div>
                <div className="flex items-center gap-2 bg-white px-4 py-2 border border-earth-200">
                  <Compass className="h-4 w-4 text-river-500" />
                  <span className="text-sm text-earth-700">Ancient River</span>
                </div>
                <div className="flex items-center gap-2 bg-white px-4 py-2 border border-earth-200">
                  <Users className="h-4 w-4 text-river-500" />
                  <span className="text-sm text-earth-700">Full Day Trips</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative section-padding bg-earth-800 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="about-cta-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                <circle cx="30" cy="30" r="1" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#about-cta-pattern)" />
          </svg>
        </div>

        <div className="relative container-luxury text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-overline text-gold-400 mb-4 block">Start Your Journey</span>
            <h2 className="heading-editorial text-white mb-6">
              Ready to Experience Virginia&apos;s
              <span className="block text-gold-400">Finest Waters?</span>
            </h2>
            <p className="text-earth-300 max-w-2xl mx-auto mb-10 text-lg">
              Book your guided fly fishing trip today and discover why the Smith River
              is Virginia&apos;s premier trout destination.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/trips" className="btn-gold">
                View Our Trips
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/contact"
                className="btn-outline border-earth-600 text-earth-300 hover:bg-earth-700 hover:border-earth-600"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Decorative Corners */}
        <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-gold-500/20" />
        <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-gold-500/20" />
      </section>
    </>
  );
}
