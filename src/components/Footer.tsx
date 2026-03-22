"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Facebook, Instagram, Fish } from "lucide-react";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "Guided Trips", href: "/trips" },
  { name: "About", href: "/about" },
  { name: "Gallery", href: "/gallery" },
  { name: "Contact", href: "/contact" },
];

const services = [
  { name: "Smith River Trout", href: "/trips#smith-river" },
  { name: "New River Smallmouth", href: "/trips#new-river" },
  { name: "Half Day Trips", href: "/trips" },
  { name: "Full Day Trips", href: "/trips" },
  { name: "Casting Instruction", href: "/trips" },
];

export function Footer() {
  return (
    <footer className="relative bg-earth-900 text-white overflow-hidden">
      {/* Decorative Top Border */}
      <div className="h-1 bg-gradient-to-r from-gold-600 via-gold-400 to-gold-600" />

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="footer-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="30" cy="30" r="1" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#footer-pattern)" />
        </svg>
      </div>

      <div className="relative container-luxury section-padding">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-3"
              >
                <div className="relative w-14 h-14">
                  <Image
                    src="/images/logo.png"
                    alt="Lucky Strips Fly Co"
                    fill
                    className="object-contain brightness-0 invert"
                  />
                </div>
                <div>
                  <span className="block font-display text-xl font-medium">
                    Lucky Strips
                  </span>
                  <span className="block text-xs tracking-ultra-wide uppercase text-gold-400">
                    Fly Company
                  </span>
                </div>
              </motion.div>
            </Link>
            <p className="text-earth-300 text-sm leading-relaxed mb-6">
              Experience world-class fly fishing on Virginia&apos;s pristine waters.
              Expert guided trips on the Smith River and New River for anglers of all skill levels.
            </p>
            <div className="flex gap-3">
              <a
                href="https://facebook.com/luckystripsflyco"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-earth-800 hover:bg-gold-500 hover:text-earth-900 rounded-none transition-all duration-300"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com/luckystripsflyco"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-earth-800 hover:bg-gold-500 hover:text-earth-900 rounded-none transition-all duration-300"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display text-lg font-medium mb-6 flex items-center gap-2">
              <span className="w-8 h-px bg-gold-500" />
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-earth-300 hover:text-gold-400 transition-colors text-sm inline-flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-px bg-gold-500 transition-all duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-display text-lg font-medium mb-6 flex items-center gap-2">
              <span className="w-8 h-px bg-gold-500" />
              Our Services
            </h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    href={service.href}
                    className="text-earth-300 hover:text-gold-400 transition-colors text-sm inline-flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-px bg-gold-500 transition-all duration-300" />
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-display text-lg font-medium mb-6 flex items-center gap-2">
              <span className="w-8 h-px bg-gold-500" />
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+12767320517"
                  className="flex items-start gap-3 text-earth-300 hover:text-gold-400 transition-colors group"
                >
                  <Phone className="h-5 w-5 mt-0.5 text-gold-500 group-hover:text-gold-400" />
                  <div>
                    <span className="block text-sm">(276) 732-0517</span>
                    <span className="block text-xs text-earth-500">Call or Text</span>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="mailto:luckystripsflyco@gmail.com"
                  className="flex items-start gap-3 text-earth-300 hover:text-gold-400 transition-colors group"
                >
                  <Mail className="h-5 w-5 mt-0.5 text-gold-500 group-hover:text-gold-400" />
                  <div>
                    <span className="block text-sm">luckystripsflyco@gmail.com</span>
                    <span className="block text-xs text-earth-500">Email Us</span>
                  </div>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-earth-300">
                  <MapPin className="h-5 w-5 mt-0.5 text-gold-500" />
                  <div>
                    <span className="block text-sm">Smith River</span>
                    <span className="block text-xs text-earth-500">Bassett, Virginia</span>
                  </div>
                </div>
              </li>
            </ul>

            {/* Availability */}
            <div className="mt-6 p-4 bg-earth-800/50 border border-earth-700">
              <div className="flex items-center gap-2 text-gold-400 text-sm font-medium mb-1">
                <Fish className="h-4 w-4" />
                Trips Available
              </div>
              <p className="text-earth-400 text-xs">Year Round by Appointment</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-earth-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-earth-500 text-sm">
              &copy; {new Date().getFullYear()} Lucky Strips Fly Co. LLC. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <Link
                href="/privacy"
                className="text-earth-500 hover:text-gold-400 transition-colors"
              >
                Privacy Policy
              </Link>
              <span className="text-earth-700">|</span>
              <Link
                href="/terms"
                className="text-earth-500 hover:text-gold-400 transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Fish Icon */}
      <div className="absolute bottom-20 right-10 opacity-5">
        <Fish className="w-40 h-40" />
      </div>
    </footer>
  );
}
