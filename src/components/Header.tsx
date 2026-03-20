"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Phone, Fish } from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Guided Trips", href: "/trips" },
  { name: "Gallery", href: "/gallery" },
  { name: "Contact", href: "/contact" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <nav className="container-custom flex items-center justify-between py-4 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Fish className="h-8 w-8 text-primary-600" />
          <div>
            <span className="font-display text-xl font-bold text-primary-800">Lucky Strips</span>
            <span className="block text-xs text-gray-500 -mt-1">Fly Co.</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* CTA & Phone */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="tel:+12767320517"
            className="flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-colors"
          >
            <Phone className="h-4 w-4" />
            <span className="text-sm font-medium">(276) 732-0517</span>
          </a>
          <Link href="/trips" className="btn-primary text-sm">
            Book a Trip
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="md:hidden p-2 text-gray-700"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-100 transition-all duration-300",
          mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        )}
      >
        <div className="py-4 px-4 space-y-3">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="block py-2 text-gray-700 hover:text-primary-600 font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <a
            href="tel:+12767320517"
            className="flex items-center gap-2 py-2 text-gray-600"
          >
            <Phone className="h-4 w-4" />
            <span className="font-medium">(276) 732-0517</span>
          </a>
          <Link
            href="/trips"
            className="btn-primary w-full text-center mt-4"
            onClick={() => setMobileMenuOpen(false)}
          >
            Book a Trip
          </Link>
        </div>
      </div>
    </header>
  );
}
