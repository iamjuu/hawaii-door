"use client";

import { ReactNode } from "react";
import { MdOutlineArrowOutward } from "react-icons/md";

type PillCTAButtonProps = {
  label: string;
  icon?: ReactNode;
  onClick?: () => void;
  className?: string;
};

export default function PillCTAButton({
  label,
  icon,
  onClick,
  className = "",
}: PillCTAButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        inline-flex items-center justify-center
        gap-2 sm:gap-3
        rounded-full
        bg-[#FF6E4A]

        /* Responsive padding (safe) */
        px-6 sm:px-8 md:px-[40px]
        py-3

        text-white
        text-[22px]      
        font-normal
        leading-none
        whitespace-nowrap

        transition-all duration-300 ease-in-out
        hover:brightness-110
        active:scale-[0.98]

        ${className}
      `}
      style={{ fontFamily: "'Roboto', sans-serif" }}
    >
      <span>{label}</span>

      {icon && (
        <span
          className="
            flex items-center justify-center
            pl-1
            text-[22px] sm:text-[26px] md:text-[28px]
            shrink-0
          "
        >
          <MdOutlineArrowOutward />
        </span>
      )}
    </button>
  );
}
