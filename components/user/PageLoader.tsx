"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface PageLoaderProps {
  isLoading?: boolean;
}

export default function PageLoader({ isLoading = true }: PageLoaderProps) {
  const [showLoader, setShowLoader] = useState(isLoading);

  useEffect(() => {
    if (isLoading) {
      setShowLoader(true);
    } else {
      // Add a small delay before hiding to ensure smooth transition
      const timer = setTimeout(() => {
        setShowLoader(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  if (!showLoader) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-zinc-900/95">
      <div className="flex flex-col items-center justify-center">
        <div className="relative">
          <div className="absolute inset-0 bg-[#b7d7a8]/20 blur-3xl rounded-full"></div>
          <Image
            src="/assets/loader/door.gif"
            alt="Loading..."
            width={200}
            height={200}
            className="object-contain relative z-10"
            unoptimized
          />
        </div>
      </div>
    </div>
  );
}
