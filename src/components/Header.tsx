"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, MapPin } from "lucide-react";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Guided Trips", href: "/trips" },
  { name: "About", href: "/about" },
  { name: "Gallery", href: "/gallery" },
  { name: "Contact", href: "/contact" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-earth-100/95 backdrop-blur-md shadow-soft py-3"
            : "bg-transparent py-6"
        }`}
      >
        {/* Top Bar - Hidden on scroll */}
        <AnimatePresence>
          {!scrolled && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="hidden lg:block border-b border-white/10 pb-3 mb-3"
            >
              <div className="container-luxury flex justify-between items-center text-sm px-6">
                <div className="flex items-center gap-6 text-earth-100/80">
                  <span className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 text-gold-400" />
                    Smith River, Bassett, Virginia
                  </span>
                </div>
                <a
                  href="tel:+12767320517"
                  className="flex items-center gap-2 text-gold-400 hover:text-gold-300 transition-colors"
                >
                  <Phone className="h-3.5 w-3.5" />
                  (276) 732-0517
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <nav className="container-luxury flex items-center justify-between px-6">
          {/* Logo */}
          <Link href="/" className="relative z-10">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-3"
            >
              <div className="relative w-12 h-12 md:w-14 md:h-14">
                <Image
                  src="/images/logo.png"
                  alt="Lucky Strips Fly Co"
                  fill
                  className={`object-contain transition-all duration-300 ${
                    scrolled ? "" : "brightness-0 invert"
                  }`}
                />
              </div>
              <div className={`hidden sm:block transition-colors duration-300 ${
                scrolled ? "text-earth-800" : "text-white"
              }`}>
                <span className="block font-display text-lg font-medium tracking-tight">
                  Lucky Strips
                </span>
                <span className="block text-xs tracking-ultra-wide uppercase text-gold-500">
                  Fly Company
                </span>
              </div>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-10">
            {navigation.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={item.href}
                  className={`relative font-medium tracking-wide transition-colors duration-300 group ${
                    scrolled
                      ? "text-earth-600 hover:text-gold-600"
                      : "text-white/90 hover:text-gold-400"
                  }`}
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold-500 transition-all duration-300 group-hover:w-full" />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/trips"
              className={`relative overflow-hidden px-6 py-3 font-semibold tracking-wide transition-all duration-300 ${
                scrolled
                  ? "bg-gold-500 text-earth-950 hover:bg-gold-400"
                  : "bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-gold-500 hover:border-gold-500 hover:text-earth-950"
              }`}
            >
              Book a Trip
            </Link>
          </div>

          {/* Mobile menu button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            type="button"
            className={`lg:hidden p-2 transition-colors ${
              scrolled ? "text-earth-800" : "text-white"
            }`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </motion.button>
        </nav>
      </header>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-earth-900/95 backdrop-blur-md"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Menu Content */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 h-full w-full max-w-sm bg-earth-900 shadow-elevated"
            >
              <div className="flex flex-col h-full pt-24 pb-8 px-8">
                {/* Nav Links */}
                <nav className="flex-1">
                  <ul className="space-y-1">
                    {navigation.map((item, index) => (
                      <motion.li
                        key={item.name}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + 0.2 }}
                      >
                        <Link
                          href={item.href}
                          className="block py-4 text-2xl font-display text-white/90 hover:text-gold-400 transition-colors border-b border-white/10"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </nav>

                {/* Bottom Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-6 pt-8 border-t border-white/10"
                >
                  <a
                    href="tel:+12767320517"
                    className="flex items-center gap-3 text-gold-400"
                  >
                    <Phone className="h-5 w-5" />
                    <span className="font-medium">(276) 732-0517</span>
                  </a>
                  <div className="flex items-center gap-3 text-white/60 text-sm">
                    <MapPin className="h-4 w-4 text-gold-500" />
                    Smith River, Bassett, Virginia
                  </div>
                  <Link
                    href="/trips"
                    className="btn-gold w-full text-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Book a Trip
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
