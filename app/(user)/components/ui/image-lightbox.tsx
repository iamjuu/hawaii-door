"use client";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";

interface Door {
  id: string;
  image: string;
  product: string;
  type: string;
  glass: string;
}

interface ImageLightboxProps {
  images: Door[];
  selectedIndex: number;
  onClose: () => void;
}

export const ImageLightbox = ({
  images,
  selectedIndex,
  onClose,
}: ImageLightboxProps) => {
  const [currentIndex, setCurrentIndex] = useState(selectedIndex);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    setCurrentIndex(selectedIndex);
  }, [selectedIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
  };

  const currentImage = images[currentIndex];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[9999] flex items-center justify-center"
        onClick={onClose}
      >
        {/* Backdrop with blur */}
        <motion.div
          initial={{ backdropFilter: "blur(0px)", backgroundColor: "rgba(0, 0, 0, 0)" }}
          animate={{ backdropFilter: "blur(8px)", backgroundColor: "rgba(0, 0, 0, 0.85)" }}
          exit={{ backdropFilter: "blur(0px)", backgroundColor: "rgba(0, 0, 0, 0)" }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0"
        />

        {/* Close button */}
        <motion.button
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onClick={onClose}
          className="absolute top-6 right-6 z-50 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-200 hover:scale-110"
        >
          <IoClose className="text-3xl" />
        </motion.button>

        {/* Image counter */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="absolute top-6 left-6 z-50 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium"
        >
          {currentIndex + 1} / {images.length}
        </motion.div>

        {/* Image info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-full"
        >
          <div className="flex items-center gap-4 text-sm">
            <span className="font-semibold">{currentImage?.product}</span>
            {currentImage?.type && (
              <>
                <span className="w-1 h-1 bg-white/50 rounded-full" />
                <span>{currentImage.type}</span>
              </>
            )}
            {currentImage?.glass && (
              <>
                <span className="w-1 h-1 bg-white/50 rounded-full" />
                <span>{currentImage.glass}</span>
              </>
            )}
          </div>
        </motion.div>

        {/* Previous button */}
        {images.length > 1 && (
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="absolute left-6 top-1/2 -translate-y-1/2 z-50 bg-white/10 text-white p-4 rounded-full transition-all duration-200 hover:scale-110 shadow-lg hover:shadow-xl"
          >
            <MdNavigateBefore className="text-3xl" />
          </motion.button>
        )}

        {/* Next button */}
        {images.length > 1 && (
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-6 top-1/2 -translate-y-1/2 z-50 bg-white/10 text-white p-4 rounded-full transition-all duration-200 hover:scale-110 shadow-lg hover:shadow-xl"
          >
            <MdNavigateNext className="text-3xl" />
          </motion.button>
        )}

        {/* Image container */}
        <div
          className="relative w-full h-full flex items-center justify-center p-20"
          onClick={(e) => e.stopPropagation()}
        >
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.3 },
                scale: { duration: 0.3 },
              }}
              className="relative max-w-7xl max-h-full"
            >
              <img
                src={currentImage?.image}
                alt={currentImage?.product}
                className="max-w-full max-h-[80vh] w-auto h-auto object-contain rounded-lg shadow-2xl"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

