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
        inline-flex items-center gap-3
        rounded-full
        bg-[#FF6E4A]
         px-[40px] py-3
        text-white
        text-[22px]
        font-normal
        leading-none
        transition-all duration-300 ease-in-out
        hover:brightness-110
        ${className}
      `}
      style={{ fontFamily: "'Roboto', sans-serif" }}
    >
      <span>{label}</span>

      {icon && (
  <span className="flex items-center justify-center pl-1 text-[28px]">
    {/* {icon} */} <MdOutlineArrowOutward/>
  </span>
)}

    </button>
  );
}
