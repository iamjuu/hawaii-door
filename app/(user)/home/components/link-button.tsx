"use client";

import { ReactNode, useState } from "react";

type PillCTAButtonProps = {
  label: string;
  icon?: ReactNode;
  onClick?: () => void;
  className?: string;
  hoverVariant?: "black" | "white";
};

export default function PillCTAButton({
  label,
  icon,
  onClick,
  className = "",
  hoverVariant = "black",
}: PillCTAButtonProps) {
  const [touched, setTouched] = useState(false);

  // Mobile/tablet only: trigger the same overlay animation as desktop hover on tap
  const handleTouchStart = () => {
    setTouched(true);
    setTimeout(() => setTouched(false), 400);
  };

  return (
    <button
      onClick={onClick}
      onTouchStart={handleTouchStart}
      className={`
        group relative inline-flex items-center justify-center
        gap-1.5 sm:gap-3 rounded-full overflow-hidden
        w-full max-w-[min(100%,420px)] sm:w-[320px] md:w-[420px]
        min-h-[50px] h-auto py-3 px-4 sm:px-5
        text-sm sm:text-base md:text-lg lg:text-[20px] xl:text-[22px]
        font-normal leading-tight sm:leading-none
        whitespace-normal sm:whitespace-nowrap text-center
        active:scale-[0.96] transition-transform duration-150
        ${className}
      `}
      style={{ fontFamily: "'Roboto', sans-serif" }}
    >
      {/* Base Orange */}
      <span className="absolute inset-0 bg-[#FF6E4A] rounded-[inherit]" />

      {/* Hover / Touch Overlay — same animation, triggered by hover on desktop, touch state on mobile */}
      <span
        className={`
          absolute inset-0
          rounded-full
          w-[160%] aspect-square
          left-1/2 -translate-x-1/2
          translate-y-[80%]
          scale-0
          origin-bottom
          transition-transform duration-[650ms]
          ease-[cubic-bezier(0.65,0,0.35,1)]
          group-hover:scale-102
          group-hover:translate-y-[-10%]
          ${touched ? "!scale-[1.02] !translate-y-[-10%]" : ""}
          ${hoverVariant === "white" ? "bg-white" : "bg-black"}
        `}
      />

      {/* Content */}
      <span
        className={`
          relative z-10 flex items-center justify-center gap-1.5 sm:gap-2
          text-white
          transition-colors duration-300 ease-in-out
          ${
            hoverVariant === "white"
              ? `group-hover:text-black group-hover:delay-[500ms] ${touched ? "!text-black transition-colors duration-[300ms] delay-[100ms]" : ""}`
              : ""
          }
        `}
      >
        <span className="min-w-0 break-words text-center">{label}</span>

        {icon && (
          <span
            className={`
              transition-all duration-500 ease-in-out
              rotate-0 translate-x-1.5
              group-hover:rotate-45 group-hover:translate-x-0
              ${touched ? "!rotate-45 !translate-x-0" : ""}
              ${
                hoverVariant === "white"
                  ? `group-hover:delay-[500ms] ${touched ? "delay-[100ms]" : ""}`
                  : ""
              }
            `}
          >
            {icon}
          </span>
        )}
      </span>
    </button>
  );
}
