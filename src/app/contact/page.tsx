"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
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
} from "lucide-react";
import { cn } from "@/lib/utils";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
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
      // In production, this would send to an API endpoint
      // For now, we'll simulate a successful submission
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Here you would typically send to your backend:
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formState),
      // });

      setIsSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again or call us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-primary-900">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image
            src="/images/river-1.jpg"
            alt="Smith River"
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
              Get in Touch
            </span>
            <h1 className="heading-1 max-w-3xl mx-auto mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-primary-100 max-w-2xl mx-auto">
              Questions about trips, availability, or anything else? We&apos;re here to help you plan your Smith River adventure.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-1"
            >
              <h2 className="heading-3 text-gray-900 mb-6">
                Let&apos;s Talk Fishing
              </h2>
              <p className="text-gray-600 mb-8">
                Reach out by phone, email, or fill out the form. We typically respond within 24 hours.
              </p>

              <div className="space-y-6">
                <a
                  href="tel:+12767320517"
                  className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-primary-50 transition-colors group"
                >
                  <div className="p-3 bg-primary-100 rounded-lg group-hover:bg-primary-200 transition-colors">
                    <Phone className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Phone</p>
                    <p className="text-primary-600">(276) 732-0517</p>
                    <p className="text-sm text-gray-500 mt-1">Call or text anytime</p>
                  </div>
                </a>

                <a
                  href="mailto:luckystripsflyco@gmail.com"
                  className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-primary-50 transition-colors group"
                >
                  <div className="p-3 bg-primary-100 rounded-lg group-hover:bg-primary-200 transition-colors">
                    <Mail className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Email</p>
                    <p className="text-primary-600">luckystripsflyco@gmail.com</p>
                    <p className="text-sm text-gray-500 mt-1">We reply within 24 hours</p>
                  </div>
                </a>

                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="p-3 bg-primary-100 rounded-lg">
                    <MapPin className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Location</p>
                    <p className="text-gray-600">Smith River</p>
                    <p className="text-gray-600">Bassett, Virginia</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="p-3 bg-primary-100 rounded-lg">
                    <Clock className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Availability</p>
                    <p className="text-gray-600">Year-round by appointment</p>
                    <p className="text-sm text-gray-500 mt-1">Book in advance for best dates</p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <p className="font-semibold text-gray-900 mb-4">Follow Us</p>
                <div className="flex gap-3">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-gray-100 rounded-lg hover:bg-primary-100 hover:text-primary-600 transition-colors"
                  >
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-gray-100 rounded-lg hover:bg-primary-100 hover:text-primary-600 transition-colors"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              <div className="bg-gray-50 rounded-2xl p-8 md:p-10">
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-6">
                      <CheckCircle className="h-8 w-8 text-primary-600" />
                    </div>
                    <h3 className="heading-3 text-gray-900 mb-4">Message Sent!</h3>
                    <p className="text-gray-600 max-w-md mx-auto mb-8">
                      Thanks for reaching out! We&apos;ll get back to you within 24 hours. In the meantime, feel free to give us a call.
                    </p>
                    <a href="tel:+12767320517" className="btn-primary">
                      <Phone className="mr-2 h-5 w-5 inline" />
                      (276) 732-0517
                    </a>
                  </motion.div>
                ) : (
                  <>
                    <h3 className="heading-3 text-gray-900 mb-2">Send Us a Message</h3>
                    <p className="text-gray-600 mb-8">
                      Fill out the form below and we&apos;ll be in touch soon.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            value={formState.name}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                            placeholder="John Smith"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={formState.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                            placeholder="john@example.com"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formState.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                            placeholder="(555) 123-4567"
                          />
                        </div>
                        <div>
                          <label htmlFor="tripType" className="block text-sm font-medium text-gray-700 mb-2">
                            Trip Type
                          </label>
                          <select
                            id="tripType"
                            name="tripType"
                            value={formState.tripType}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                          >
                            <option value="">Select a trip type</option>
                            <option value="half-day">Half Day Trip</option>
                            <option value="full-day">Full Day Trip</option>
                            <option value="not-sure">Not sure yet</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <label htmlFor="preferredDates" className="block text-sm font-medium text-gray-700 mb-2">
                            Preferred Dates
                          </label>
                          <input
                            type="text"
                            id="preferredDates"
                            name="preferredDates"
                            value={formState.preferredDates}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                            placeholder="e.g., April 15-20"
                          />
                        </div>
                        <div>
                          <label htmlFor="partySize" className="block text-sm font-medium text-gray-700 mb-2">
                            Party Size
                          </label>
                          <select
                            id="partySize"
                            name="partySize"
                            value={formState.partySize}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                          >
                            <option value="">Select size</option>
                            <option value="1">1 Person</option>
                            <option value="2">2 People</option>
                          </select>
                        </div>
                        <div>
                          <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-2">
                            Experience Level
                          </label>
                          <select
                            id="experience"
                            name="experience"
                            value={formState.experience}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                          >
                            <option value="">Select level</option>
                            <option value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advanced">Advanced</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                          Message *
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          required
                          rows={5}
                          value={formState.message}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors resize-none"
                          placeholder="Tell us about your trip plans, any questions you have, or special requests..."
                        />
                      </div>

                      {error && (
                        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                          {error}
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={cn(
                          "btn-primary w-full md:w-auto",
                          isSubmitting && "opacity-70 cursor-not-allowed"
                        )}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin inline" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="mr-2 h-5 w-5 inline" />
                            Send Message
                          </>
                        )}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-96 relative">
        <div className="absolute inset-0 bg-gray-200">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d100797.90849862398!2d-80.0!3d36.75!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88521f1d5e90ea47%3A0x64f6e8f82c7c1b2a!2sSmith%20River%2C%20Virginia!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Lucky Strips Fly Co Location"
          />
        </div>
      </section>
    </>
  );
}
