"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Camera, Fish, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.05
    }
  }
};

// Gallery images from Lucky Strips Fly Co
const galleryImages = [
  {
    id: 1,
    src: "/images/gallery-1.png",
    alt: "Angler with brown trout",
    category: "catches",
    caption: "Beautiful brown trout from the Smith River",
  },
  {
    id: 2,
    src: "/images/gallery-2.jpg",
    alt: "Fly fishing on the Smith River",
    category: "fishing",
    caption: "Guided trip on the water",
  },
  {
    id: 3,
    src: "/images/gallery-3.jpg",
    alt: "Happy angler with catch",
    category: "catches",
    caption: "Another successful day on the Smith",
  },
  {
    id: 4,
    src: "/images/gallery-4.jpg",
    alt: "Trout catch close-up",
    category: "catches",
    caption: "Wild brown trout",
  },
  {
    id: 5,
    src: "/images/gallery-5.jpg",
    alt: "Smith River scenery",
    category: "scenery",
    caption: "Scenic views along the float",
  },
  {
    id: 6,
    src: "/images/gallery-6.jpg",
    alt: "Drift boat fishing",
    category: "fishing",
    caption: "Drift boat on the Smith River",
  },
  {
    id: 7,
    src: "/images/gallery-7.jpg",
    alt: "River landscape",
    category: "scenery",
    caption: "Virginia's beautiful Smith River valley",
  },
  {
    id: 8,
    src: "/images/gallery-8.jpg",
    alt: "Fly fishing action",
    category: "fishing",
    caption: "Tight lines on the Smith",
  },
  {
    id: 9,
    src: "/images/gallery-9.jpg",
    alt: "Angler with trout",
    category: "catches",
    caption: "Great catch of the day",
  },
  {
    id: 10,
    src: "/images/gallery-10.jpg",
    alt: "Smith River water",
    category: "scenery",
    caption: "Crystal clear tailwater",
  },
  {
    id: 11,
    src: "/images/gallery-11.jpg",
    alt: "Fish release",
    category: "catches",
    caption: "Catch and release on the Smith",
  },
  {
    id: 12,
    src: "/images/gallery-12.jpg",
    alt: "River at sunset",
    category: "scenery",
    caption: "Golden hour on the water",
  },
];

const categories = [
  { id: "all", name: "All Photos" },
  { id: "catches", name: "Catches" },
  { id: "fishing", name: "On the Water" },
  { id: "scenery", name: "Scenery" },
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null);

  const filteredImages = activeCategory === "all"
    ? galleryImages
    : galleryImages.filter(img => img.category === activeCategory);

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-primary-900">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image
            src="/images/hero.jpg"
            alt="Fly fishing scenery"
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
              <Camera className="h-4 w-4 inline mr-2" />
              Photo Gallery
            </span>
            <h1 className="heading-1 max-w-3xl mx-auto mb-6">
              Moments on the Smith River
            </h1>
            <p className="text-xl text-primary-100 max-w-2xl mx-auto">
              Browse photos from our guided trips and see what awaits you on Virginia&apos;s premier tailwater.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={cn(
                  "px-5 py-2 rounded-full font-medium text-sm transition-all",
                  activeCategory === category.id
                    ? "bg-primary-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                )}
              >
                {category.name}
              </button>
            ))}
          </motion.div>

          {/* Image Grid */}
          <motion.div
            initial="initial"
            animate="animate"
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            <AnimatePresence mode="popLayout">
              {filteredImages.map((image) => (
                <motion.div
                  key={image.id}
                  variants={fadeInUp}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer group"
                  onClick={() => setSelectedImage(image)}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-white text-sm font-medium">{image.caption}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty State */}
          {filteredImages.length === 0 && (
            <div className="text-center py-12">
              <Fish className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No photos in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-4 right-4 p-2 text-white hover:bg-white/10 rounded-full transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X className="h-8 w-8" />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-5xl max-h-[85vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="mt-4 text-center">
                <p className="text-white font-medium">{selectedImage.caption}</p>
                <p className="text-gray-400 text-sm flex items-center justify-center gap-2 mt-1">
                  <MapPin className="h-4 w-4" />
                  Smith River, Virginia
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="heading-2 text-gray-900 mb-4">
              Ready to Create Your Own Memories?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              Book a guided trip and experience the beauty of the Smith River for yourself. We&apos;ll capture your catches along the way!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/trips" className="btn-primary">
                Book Your Trip
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
