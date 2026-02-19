"use client";
import { useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { motion } from "motion/react";
import { ImageLightbox } from "./image-lightbox";

import { cn } from "../../../(user)/home/components/utils/utils";

interface Door {
  id: string;
  image: string;
  product: string;
  type: string;
  glass: string;
}

export const ParallaxScroll = ({
  images,
  className,
}: {
  images: Door[];
  className?: string;
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const gridRef = useRef<any>(null);
  const { scrollYProgress } = useScroll({
    target: gridRef,
    offset: ["start start", "end start"],
  });

  const translateFirst = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const translateSecond = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const translateThird = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const third = Math.ceil(images.length / 3);

  const firstPart = images.slice(0, third);
  const secondPart = images.slice(third, 2 * third);
  const thirdPart = images.slice(2 * third);


  return (
    <>
      <div
        className={cn("w-full", className)}
        ref={gridRef}
      >
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start w-full gap-4 md:gap-6 py-0 px-0 pb-20"
        >
          <div className="grid gap-[25px] md:gap-6">
            {firstPart.map((el, idx) => (
              <motion.div
                style={{ y: translateFirst }} // Apply the translateY motion value here
                key={"grid-1" + idx}
                onClick={() => setSelectedImageIndex(idx)}
                className="cursor-pointer group"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <img
                  src={el.image}
                  className="h-80 w-full object-cover rounded-lg group-hover:shadow-xl transition-shadow duration-300"
                  alt={el.product}
                />
              </motion.div>
            ))}
          </div>
          <div className="grid gap-4 md:gap-6">
            {secondPart.map((el, idx) => (
              <motion.div
                style={{ y: translateSecond }}
                key={"grid-2" + idx}
                onClick={() => setSelectedImageIndex(third + idx)}
                className="cursor-pointer group"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <img
                  src={el.image}
                  className="h-80 w-full object-cover object-left-top rounded-lg !m-0 !p-0 group-hover:shadow-xl transition-shadow duration-300"
                  height="400"
                  width="400"
                  alt="thumbnail"
                />
              </motion.div>
            ))}
          </div>
          <div className="grid gap-4 md:gap-6">
            {thirdPart.map((el, idx) => (
              <motion.div
                style={{ y: translateThird }}
                key={"grid-3" + idx}
                onClick={() => setSelectedImageIndex(2 * third + idx)}
                className="cursor-pointer group"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <img
                  src={el.image}
                  className="h-80 w-full object-cover object-left-top rounded-lg !m-0 !p-0 group-hover:shadow-xl transition-shadow duration-300"
                  height="400"
                  width="400"
                  alt="thumbnail"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {selectedImageIndex !== null && (
        <ImageLightbox
          images={images}
          selectedIndex={selectedImageIndex}
          onClose={() => setSelectedImageIndex(null)}
        />
      )}
    </>
  );
};
