"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { X, ArrowRight, Camera, Fish, MapPin, ChevronLeft, ChevronRight } from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
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
    river: "Smith River"
  },
  {
    id: 2,
    src: "/images/gallery-2.jpg",
    alt: "Fly fishing on the Smith River",
    category: "fishing",
    caption: "Guided trip on the water",
    river: "Smith River"
  },
  {
    id: 3,
    src: "/images/gallery-3.jpg",
    alt: "Happy angler with catch",
    category: "catches",
    caption: "Another successful day on the Smith",
    river: "Smith River"
  },
  {
    id: 4,
    src: "/images/gallery-4.jpg",
    alt: "Trout catch close-up",
    category: "catches",
    caption: "Wild brown trout",
    river: "Smith River"
  },
  {
    id: 5,
    src: "/images/gallery-5.jpg",
    alt: "Smith River scenery",
    category: "scenery",
    caption: "Scenic views along the float",
    river: "Smith River"
  },
  {
    id: 6,
    src: "/images/gallery-6.jpg",
    alt: "Drift boat fishing",
    category: "fishing",
    caption: "Drift boat on the Smith River",
    river: "Smith River"
  },
  {
    id: 7,
    src: "/images/gallery-7.jpg",
    alt: "River landscape",
    category: "scenery",
    caption: "Virginia's beautiful Smith River valley",
    river: "Smith River"
  },
  {
    id: 8,
    src: "/images/gallery-8.jpg",
    alt: "Fly fishing action",
    category: "fishing",
    caption: "Tight lines on the Smith",
    river: "Smith River"
  },
  {
    id: 9,
    src: "/images/gallery-9.jpg",
    alt: "Angler with trout",
    category: "catches",
    caption: "Great catch of the day",
    river: "Smith River"
  },
  {
    id: 10,
    src: "/images/gallery-10.jpg",
    alt: "Smith River water",
    category: "scenery",
    caption: "Crystal clear tailwater",
    river: "Smith River"
  },
  {
    id: 11,
    src: "/images/gallery-11.jpg",
    alt: "Fish release",
    category: "catches",
    caption: "Catch and release on the Smith",
    river: "Smith River"
  },
  {
    id: 12,
    src: "/images/gallery-12.jpg",
    alt: "River at sunset",
    category: "scenery",
    caption: "Golden hour on the water",
    river: "Smith River"
  },
];

const categories = [
  { id: "all", name: "All Photos", icon: Camera },
  { id: "catches", name: "Catches", icon: Fish },
  { id: "fishing", name: "On the Water", icon: Fish },
  { id: "scenery", name: "Scenery", icon: MapPin },
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const filteredImages = activeCategory === "all"
    ? galleryImages
    : galleryImages.filter(img => img.category === activeCategory);

  const openLightbox = (image: typeof galleryImages[0]) => {
    const index = filteredImages.findIndex(img => img.id === image.id);
    setSelectedIndex(index);
    setSelectedImage(image);
  };

  const nextImage = () => {
    const nextIndex = (selectedIndex + 1) % filteredImages.length;
    setSelectedIndex(nextIndex);
    setSelectedImage(filteredImages[nextIndex]);
  };

  const prevImage = () => {
    const prevIndex = (selectedIndex - 1 + filteredImages.length) % filteredImages.length;
    setSelectedIndex(prevIndex);
    setSelectedImage(filteredImages[prevIndex]);
  };

  return (
    <>
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <motion.div
          style={{ y: heroY }}
          className="absolute inset-0 z-0"
        >
          <Image
            src="/images/hero.jpg"
            alt="Fly fishing on the Smith River"
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
            <Camera className="h-5 w-5 text-gold-400" />
            <span className="w-12 h-px bg-gold-400" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="heading-display text-white mb-6"
          >
            Photo
            <span className="block text-gold-400">Gallery</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-earth-200 max-w-2xl mx-auto"
          >
            Moments captured on Virginia&apos;s pristine waters
          </motion.p>
        </motion.div>
      </section>

      {/* Gallery Section */}
      <section className="section-padding bg-earth-100">
        <div className="container-luxury">
          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-wrap justify-center gap-3 mb-16"
          >
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`
                  inline-flex items-center gap-2 px-6 py-3 font-medium text-sm tracking-wide transition-all duration-300
                  ${activeCategory === category.id
                    ? "bg-gold-500 text-earth-900"
                    : "bg-white text-earth-600 border border-earth-200 hover:border-gold-500 hover:text-gold-600"
                  }
                `}
              >
                <category.icon className="h-4 w-4" />
                {category.name}
              </button>
            ))}
          </motion.div>

          {/* Image Grid */}
          <motion.div
            initial="initial"
            animate="animate"
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  variants={fadeInUp}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ y: -8 }}
                  className="relative aspect-[4/3] overflow-hidden cursor-pointer group bg-earth-200"
                  onClick={() => openLightbox(image)}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-earth-900/80 via-earth-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Gold Border on Hover */}
                  <div className="absolute inset-3 border-2 border-gold-500/0 group-hover:border-gold-500/60 transition-all duration-500 pointer-events-none" />

                  {/* Caption */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-white font-medium text-sm">{image.caption}</p>
                    <p className="text-gold-400 text-xs flex items-center gap-1 mt-1">
                      <MapPin className="h-3 w-3" />
                      {image.river}
                    </p>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="bg-gold-500 text-earth-900 text-xs font-semibold px-2 py-1 uppercase tracking-wide">
                      {image.category}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty State */}
          {filteredImages.length === 0 && (
            <div className="text-center py-16">
              <Fish className="h-16 w-16 text-earth-300 mx-auto mb-4" />
              <p className="text-earth-500 text-lg">No photos in this category yet.</p>
            </div>
          )}

          {/* Photo Count */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-12"
          >
            <p className="text-earth-500 text-sm">
              Showing {filteredImages.length} of {galleryImages.length} photos
            </p>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-earth-950/95 backdrop-blur-md flex items-center justify-center"
            onClick={() => setSelectedImage(null)}
          >
            {/* Close Button */}
            <button
              className="absolute top-6 right-6 p-3 text-white/70 hover:text-white hover:bg-white/10 transition-colors z-50"
              onClick={() => setSelectedImage(null)}
            >
              <X className="h-8 w-8" />
            </button>

            {/* Navigation Arrows */}
            <button
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-3 text-white/70 hover:text-white hover:bg-white/10 transition-colors z-50"
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
            >
              <ChevronLeft className="h-10 w-10" />
            </button>

            <button
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-3 text-white/70 hover:text-white hover:bg-white/10 transition-colors z-50"
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
            >
              <ChevronRight className="h-10 w-10" />
            </button>

            {/* Image Container */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-6xl max-h-[85vh] w-full mx-4 md:mx-16"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  fill
                  className="object-contain"
                />
                {/* Gold Frame */}
                <div className="absolute inset-4 border-2 border-gold-500/30 pointer-events-none" />
              </div>

              {/* Caption */}
              <div className="mt-6 text-center">
                <p className="text-white font-display text-xl">{selectedImage.caption}</p>
                <p className="text-gold-400 text-sm flex items-center justify-center gap-2 mt-2">
                  <MapPin className="h-4 w-4" />
                  {selectedImage.river}, Virginia
                </p>
                <p className="text-earth-500 text-xs mt-4">
                  {selectedIndex + 1} of {filteredImages.length}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA Section */}
      <section className="relative section-padding bg-earth-900 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="gallery-cta-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                <circle cx="30" cy="30" r="1" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#gallery-cta-pattern)" />
          </svg>
        </div>

        <div className="relative container-luxury text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-overline text-gold-400 mb-4 block">Your Story Awaits</span>
            <h2 className="heading-editorial text-white mb-6">
              Ready to Create
              <span className="block text-gold-400">Your Own Memories?</span>
            </h2>
            <p className="text-earth-300 max-w-2xl mx-auto mb-10 text-lg">
              Book a guided trip and experience the beauty of Virginia&apos;s waters for yourself.
              We&apos;ll capture your catches along the way.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/trips" className="btn-gold">
                Book Your Trip
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

        {/* Decorative Elements */}
        <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-gold-500/20" />
        <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-gold-500/20" />
      </section>
    </>
  );
}
