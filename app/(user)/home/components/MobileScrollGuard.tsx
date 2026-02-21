"use client";

import { useState, useEffect, type ReactNode } from "react";

/**
  const scrollTimeoutRef = useState<ReturnType<typeof setTimeout> | null>(null)[0];
  const scrollTimeoutRef = useState<ReturnType<typeof setTimeout> | null>(null)[0];
  const scrollTimeoutRef = useState<ReturnType<typeof setTimeout> | null>(null)[0];
  const scrollTimeoutRef = useState<ReturnType<typeof setTimeout> | null>(null)[0];
  const clearScrollState = useCallback(() => {
    if (scrollTimeoutRef) clearTimeout(scrollTimeoutRef);
  const clearScrollState = useCallback(() => {
    if (scrollTimeoutRef) clearTimeout(scrollTimeoutRef);
    const t = setTimeout(() => setIsScrolling(false), 150);
    return () => clearTimeout(t);
  }, []);

    const t = setTimeout(() => setIsScrolling(false), 150);
    return () => clearTimeout(t);
  }, []);

 * On mobile: while the user is touch-scrolling, we set pointer-events: none on
  const clearScrollState = useCallback(() => {
    if (scrollTimeoutRef) clearTimeout(scrollTimeoutRef);
    const t = setTimeout(() => setIsScrolling(false), 150);
    return () => clearTimeout(t);
  }, []);

 * the content so :hover and :active don't fire on elements under the finger.
  const clearScrollState = useCallback(() => {
    if (scrollTimeoutRef) clearTimeout(scrollTimeoutRef);
    const t = setTimeout(() => setIsScrolling(false), 150);
    return () => clearTimeout(t);
  }, []);

 * This prevents hover/active effects from showing while scrolling.
 */
export default function MobileScrollGuard({ children }: { children: ReactNode }) {
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const handleTouchMove = () => {
      setIsScrolling(true);
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsScrolling(false);
        timeoutId = null;
      }, 150);
    };

    const handleTouchEnd = () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsScrolling(false);
        timeoutId = null;
      }, 150);
    };

    document.addEventListener("touchmove", handleTouchMove, { passive: true });
    document.addEventListener("touchend", handleTouchEnd, { passive: true });
    document.addEventListener("touchcancel", handleTouchEnd, { passive: true });

    return () => {
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
      document.removeEventListener("touchcancel", handleTouchEnd);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className={isScrolling ? "pointer-events-none" : ""}>
      {children}
    </div>
  );
}
