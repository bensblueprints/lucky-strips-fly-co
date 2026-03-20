import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Facebook, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary-900 text-white">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Image
                src="/images/logo.png"
                alt="Lucky Strips Fly Co"
                width={120}
                height={48}
                className="h-12 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-primary-200 text-sm leading-relaxed">
              Experience world-class fly fishing on Virginia&apos;s Smith River. Expert guided trips for anglers of all skill levels.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { name: "Home", href: "/" },
                { name: "About", href: "/about" },
                { name: "Guided Trips", href: "/trips" },
                { name: "Gallery", href: "/gallery" },
                { name: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-primary-200 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:+12767320517"
                  className="flex items-center gap-3 text-primary-200 hover:text-white transition-colors text-sm"
                >
                  <Phone className="h-4 w-4 flex-shrink-0" />
                  (276) 732-0517
                </a>
              </li>
              <li>
                <a
                  href="mailto:luckystripsflyco@gmail.com"
                  className="flex items-center gap-3 text-primary-200 hover:text-white transition-colors text-sm"
                >
                  <Mail className="h-4 w-4 flex-shrink-0" />
                  luckystripsflyco@gmail.com
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-primary-200 text-sm">
                  <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5" />
                  Smith River, Bassett, Virginia
                </div>
              </li>
            </ul>
          </div>

          {/* Social & Hours */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex gap-4 mb-6">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-primary-800 rounded-lg hover:bg-primary-700 transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-primary-800 rounded-lg hover:bg-primary-700 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
            <p className="text-primary-200 text-sm">
              <span className="font-semibold text-white">Trips Available:</span>
              <br />
              Year Round by Appointment
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-primary-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-primary-300 text-sm">
            &copy; {new Date().getFullYear()} Lucky Strips Fly Co. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link href="/privacy" className="text-primary-300 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-primary-300 hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
