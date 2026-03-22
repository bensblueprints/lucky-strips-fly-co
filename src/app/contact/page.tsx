"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Send,
  CheckCircle,
  Loader2,
  Facebook,
  Instagram,
  Clock,
  Fish,
  MessageSquare,
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

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    tripType: "",
    preferredDates: "",
    partySize: "",
    experience: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again or call us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = "w-full px-4 py-4 bg-white border border-earth-200 text-earth-800 placeholder:text-earth-400 focus:ring-2 focus:ring-gold-500 focus:border-gold-500 transition-all duration-300";
  const labelClasses = "block text-sm font-semibold text-earth-700 mb-2 tracking-wide uppercase";

  return (
    <>
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
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
            <MessageSquare className="h-5 w-5 text-gold-400" />
            <span className="w-12 h-px bg-gold-400" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="heading-display text-white mb-6"
          >
            Get in
            <span className="block text-gold-400">Touch</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-earth-200 max-w-2xl mx-auto"
          >
            Ready to plan your fishing adventure? We&apos;re here to help.
          </motion.p>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section className="section-padding bg-earth-100">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={stagger}
              className="lg:col-span-1"
            >
              <motion.div variants={fadeInUp}>
                <span className="text-overline text-gold-600">Contact Info</span>
                <h2 className="heading-section text-earth-800 mt-2 mb-6">
                  Let&apos;s Talk Fishing
                </h2>
                <p className="text-earth-600 mb-8">
                  Reach out by phone, email, or fill out the form. We typically respond within 24 hours.
                </p>
              </motion.div>

              <motion.div variants={fadeInUp} className="space-y-4">
                {/* Phone */}
                <a
                  href="tel:+12767320517"
                  className="flex items-start gap-4 p-5 bg-white border border-earth-200 hover:border-gold-500 transition-colors group"
                >
                  <div className="p-3 bg-gold-100 group-hover:bg-gold-500 transition-colors">
                    <Phone className="h-5 w-5 text-gold-600 group-hover:text-earth-900" />
                  </div>
                  <div>
                    <p className="font-display font-medium text-earth-800">Phone</p>
                    <p className="text-gold-600 font-semibold">(276) 732-0517</p>
                    <p className="text-sm text-earth-500 mt-1">Call or text anytime</p>
                  </div>
                </a>

                {/* Email */}
                <a
                  href="mailto:luckystripsflyco@gmail.com"
                  className="flex items-start gap-4 p-5 bg-white border border-earth-200 hover:border-gold-500 transition-colors group"
                >
                  <div className="p-3 bg-gold-100 group-hover:bg-gold-500 transition-colors">
                    <Mail className="h-5 w-5 text-gold-600 group-hover:text-earth-900" />
                  </div>
                  <div>
                    <p className="font-display font-medium text-earth-800">Email</p>
                    <p className="text-gold-600 font-semibold text-sm">luckystripsflyco@gmail.com</p>
                    <p className="text-sm text-earth-500 mt-1">We reply within 24 hours</p>
                  </div>
                </a>

                {/* Location */}
                <div className="flex items-start gap-4 p-5 bg-white border border-earth-200">
                  <div className="p-3 bg-gold-100">
                    <MapPin className="h-5 w-5 text-gold-600" />
                  </div>
                  <div>
                    <p className="font-display font-medium text-earth-800">Location</p>
                    <p className="text-earth-600">Smith River</p>
                    <p className="text-earth-600">Bassett, Virginia</p>
                  </div>
                </div>

                {/* Availability */}
                <div className="flex items-start gap-4 p-5 bg-white border border-earth-200">
                  <div className="p-3 bg-gold-100">
                    <Clock className="h-5 w-5 text-gold-600" />
                  </div>
                  <div>
                    <p className="font-display font-medium text-earth-800">Availability</p>
                    <p className="text-earth-600">Year-round by appointment</p>
                    <p className="text-sm text-earth-500 mt-1">Book in advance for best dates</p>
                  </div>
                </div>
              </motion.div>

              {/* Social Links */}
              <motion.div variants={fadeInUp} className="mt-8 pt-8 border-t border-earth-200">
                <p className="font-display font-medium text-earth-800 mb-4">Follow Us</p>
                <div className="flex gap-3">
                  <a
                    href="https://facebook.com/luckystripsflyco"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white border border-earth-200 hover:bg-gold-500 hover:border-gold-500 hover:text-earth-900 transition-all duration-300"
                  >
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a
                    href="https://instagram.com/luckystripsflyco"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white border border-earth-200 hover:bg-gold-500 hover:border-gold-500 hover:text-earth-900 transition-all duration-300"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                </div>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              <div className="bg-white border border-earth-200 p-8 md:p-10">
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gold-100 mb-6">
                      <CheckCircle className="h-10 w-10 text-gold-600" />
                    </div>
                    <h3 className="heading-section text-earth-800 mb-4">Message Sent!</h3>
                    <p className="text-earth-600 max-w-md mx-auto mb-8">
                      Thanks for reaching out! We&apos;ll get back to you within 24 hours.
                      In the meantime, feel free to give us a call.
                    </p>
                    <a href="tel:+12767320517" className="btn-gold">
                      <Phone className="mr-2 h-5 w-5" />
                      (276) 732-0517
                    </a>
                  </motion.div>
                ) : (
                  <>
                    <div className="mb-8">
                      <span className="text-overline text-gold-600">Send a Message</span>
                      <h3 className="heading-section text-earth-800 mt-2">
                        Plan Your Trip
                      </h3>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="name" className={labelClasses}>
                            Full Name *
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            value={formState.name}
                            onChange={handleChange}
                            className={inputClasses}
                            placeholder="John Smith"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className={labelClasses}>
                            Email Address *
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={formState.email}
                            onChange={handleChange}
                            className={inputClasses}
                            placeholder="john@example.com"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="phone" className={labelClasses}>
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formState.phone}
                            onChange={handleChange}
                            className={inputClasses}
                            placeholder="(555) 123-4567"
                          />
                        </div>
                        <div>
                          <label htmlFor="tripType" className={labelClasses}>
                            Trip Type
                          </label>
                          <select
                            id="tripType"
                            name="tripType"
                            value={formState.tripType}
                            onChange={handleChange}
                            className={inputClasses}
                          >
                            <option value="">Select a trip type</option>
                            <option value="smith-half-day">Smith River - Half Day</option>
                            <option value="smith-full-day">Smith River - Full Day</option>
                            <option value="new-river">New River - Smallmouth</option>
                            <option value="casting">Casting Instruction</option>
                            <option value="not-sure">Not sure yet</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <label htmlFor="preferredDates" className={labelClasses}>
                            Preferred Dates
                          </label>
                          <input
                            type="text"
                            id="preferredDates"
                            name="preferredDates"
                            value={formState.preferredDates}
                            onChange={handleChange}
                            className={inputClasses}
                            placeholder="e.g., April 15-20"
                          />
                        </div>
                        <div>
                          <label htmlFor="partySize" className={labelClasses}>
                            Party Size
                          </label>
                          <select
                            id="partySize"
                            name="partySize"
                            value={formState.partySize}
                            onChange={handleChange}
                            className={inputClasses}
                          >
                            <option value="">Select size</option>
                            <option value="1">1 Person</option>
                            <option value="2">2 People</option>
                          </select>
                        </div>
                        <div>
                          <label htmlFor="experience" className={labelClasses}>
                            Experience Level
                          </label>
                          <select
                            id="experience"
                            name="experience"
                            value={formState.experience}
                            onChange={handleChange}
                            className={inputClasses}
                          >
                            <option value="">Select level</option>
                            <option value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advanced">Advanced</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label htmlFor="message" className={labelClasses}>
                          Message *
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          required
                          rows={5}
                          value={formState.message}
                          onChange={handleChange}
                          className={`${inputClasses} resize-none`}
                          placeholder="Tell us about your trip plans, any questions you have, or special requests..."
                        />
                      </div>

                      {error && (
                        <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-sm">
                          {error}
                        </div>
                      )}

                      <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className={`btn-gold ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                              Sending...
                            </>
                          ) : (
                            <>
                              <Send className="mr-2 h-5 w-5" />
                              Send Message
                            </>
                          )}
                        </button>
                        <span className="text-earth-500 text-sm self-center">
                          or call us at{" "}
                          <a href="tel:+12767320517" className="text-gold-600 font-semibold hover:underline">
                            (276) 732-0517
                          </a>
                        </span>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="relative h-[450px] bg-earth-200">
        {/* Map Overlay Header */}
        <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-earth-900/80 to-transparent p-6">
          <div className="container-luxury flex items-center gap-3">
            <MapPin className="h-5 w-5 text-gold-400" />
            <span className="text-white font-display">Smith River, Bassett, Virginia</span>
          </div>
        </div>

        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d100797.90849862398!2d-80.0!3d36.75!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88521f1d5e90ea47%3A0x64f6e8f82c7c1b2a!2sSmith%20River%2C%20Virginia!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Lucky Strips Fly Co Location"
          className="grayscale contrast-125"
        />

        {/* Map Overlay Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="absolute bottom-8 left-8 bg-earth-900 text-white p-6 shadow-elevated max-w-sm hidden md:block"
        >
          <div className="flex items-center gap-3 mb-3">
            <Fish className="h-6 w-6 text-gold-400" />
            <span className="font-display text-lg">Lucky Strips Fly Co.</span>
          </div>
          <p className="text-earth-300 text-sm mb-4">
            Meeting location details provided upon booking confirmation.
          </p>
          <a
            href="tel:+12767320517"
            className="inline-flex items-center gap-2 text-gold-400 hover:text-gold-300 text-sm font-semibold"
          >
            <Phone className="h-4 w-4" />
            (276) 732-0517
          </a>
        </motion.div>
      </section>

      {/* Bottom CTA */}
      <section className="section-padding bg-earth-900 text-center">
        <div className="container-luxury">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Fish className="h-10 w-10 text-gold-500 mx-auto mb-6" />
            <h2 className="heading-section text-white mb-4">
              Ready When You Are
            </h2>
            <p className="text-earth-300 max-w-xl mx-auto mb-8">
              We look forward to sharing the beauty of Virginia&apos;s waters with you.
              Contact us today to start planning your adventure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+12767320517" className="btn-gold">
                <Phone className="mr-2 h-5 w-5" />
                Call Now
              </a>
              <a
                href="mailto:luckystripsflyco@gmail.com"
                className="btn-outline border-earth-600 text-earth-300 hover:bg-earth-700 hover:border-earth-600"
              >
                <Mail className="mr-2 h-5 w-5" />
                Send Email
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
