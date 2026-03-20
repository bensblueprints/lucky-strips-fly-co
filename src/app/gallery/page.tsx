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

// Gallery images with placeholder Unsplash photos
const galleryImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1504309092620-4d0ec726efa4?q=80&w=2070",
    alt: "Fly fishing on the Smith River",
    category: "fishing",
    caption: "Early morning casting on the Smith River",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1531218150217-54595bc2b934?q=80&w=2028",
    alt: "Beautiful brown trout catch",
    category: "catches",
    caption: "Wild brown trout from the Smith River",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=2069",
    alt: "Smith River scenery",
    category: "scenery",
    caption: "Scenic views along the float",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1583375478223-1b847c4c5cdf?q=80&w=2070",
    alt: "Sunset on the river",
    category: "scenery",
    caption: "Golden hour on the water",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1551524559-8af4e6624178?q=80&w=2026",
    alt: "Drift boat on the river",
    category: "fishing",
    caption: "Our drift boat ready for the day",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1485452499676-62ab02571a7c?q=80&w=1974",
    alt: "Fly fishing guide instruction",
    category: "fishing",
    caption: "Expert instruction for all skill levels",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?q=80&w=2070",
    alt: "Mountain river view",
    category: "scenery",
    caption: "Virginia's beautiful Smith River valley",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1552413538-f42b12b20b0a?q=80&w=2070",
    alt: "Landing a fish",
    category: "catches",
    caption: "Net ready for a nice brown",
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1517027630787-8d0c80bc2d5b?q=80&w=2070",
    alt: "Fly selection",
    category: "fishing",
    caption: "Matching the hatch",
  },
  {
    id: 10,
    src: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?q=80&w=2070",
    alt: "River rapids",
    category: "scenery",
    caption: "Crystal clear Smith River water",
  },
  {
    id: 11,
    src: "https://images.unsplash.com/photo-1551524559-8af4e6624178?q=80&w=2026",
    alt: "Happy angler with catch",
    category: "catches",
    caption: "All smiles with a beautiful trout",
  },
  {
    id: 12,
    src: "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?q=80&w=2070",
    alt: "Autumn on the river",
    category: "scenery",
    caption: "Fall colors along the Smith",
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
            src="https://images.unsplash.com/photo-1504309092620-4d0ec726efa4?q=80&w=2070"
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
