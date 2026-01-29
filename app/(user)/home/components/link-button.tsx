// "use client";

// import { ReactNode } from "react";
// import { MdOutlineArrowOutward } from "react-icons/md";

// type PillCTAButtonProps = {
//   label: string;
//   icon?: ReactNode;
//   onClick?: () => void;
//   className?: string;
// };

// export default function PillCTAButton({
//   label,
//   icon,
//   onClick,
//   className = "",
// }: PillCTAButtonProps) {
//   return (
//     <button
//       onClick={onClick}
//       className={`
//         group
//         relative
//         inline-flex items-center justify-center
//         gap-2 sm:gap-3
//         rounded-full
//         bg-[#FF6E4A]
//         overflow-hidden
//         /* Responsive padding (safe) */
//         px-6 sm:px-8 md:px-[40px]
//         py-3
//         text-[22px]      
//         font-normal
//         leading-none
//         whitespace-nowrap
//         transition-none

//         active:scale-[0.98]

//         ${className}
//       `}
//       style={{ fontFamily: "'Roboto', sans-serif" }}
//     >
//       {/* Hover overlay */}
//       <span
//         className="
//           absolute
//           left-1/2 -translate-x-1/2
//           top-full
//           w-[125%] aspect-square
//           rounded-full
//           bg-white
//           text-black
//           group-hover:-translate-y-[60%]
//           transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
//         "
//       />

//       {/* Content */}
//       <span className="relative z-10 flex items-center gap-2 sm:gap-3 text-white">
//         <span >{label}</span>

//         {icon && (
//           <span
//             className="
//               flex items-center justify-center
//               pl-1
//               text-[22px] sm:text-[26px] md:text-[28px]
//               shrink-0
//               transition-all duration-500 ease-in-out
//               rotate-0 translate-x-1.5
//               group-hover:rotate-45 group-hover:translate-x-0
//             "
//           >
//             <MdOutlineArrowOutward />
//           </span>
//         )}
//       </span>
//     </button>
//   );
// }
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
        group
        relative
        inline-flex items-center justify-center
        gap-2 sm:gap-3
        rounded-full
        bg-[#FF6E4A]
        overflow-hidden
        px-6 sm:px-8 md:px-[40px]
        py-3
        text-[22px]
        font-normal
        leading-none
        whitespace-nowrap
        transition-none
        active:scale-[0.98]
        ${className}
      `}
      style={{ fontFamily: "'Roboto', sans-serif" }}
    >
      {/* Hover overlay */}
      <span
        className="
          absolute inset-0
          bg-white
          rounded-full
          w-[140%]
          aspect-square
          left-1/2 -translate-x-1/2
          translate-y-[60%]
          scale-0
          origin-bottom
          transition-transform
          duration-[700ms]
          ease-[cubic-bezier(0.65,0,0.35,1)]
          group-hover:scale-102
          group-hover:translate-y-[-10%]
        "
      />
      {/* Content */}
      <span
        className="
          relative z-10
          flex items-center gap-2 sm:gap-3
          text-white
          group-hover:text-black
          transition-colors duration-[700ms]
          ease-[cubic-bezier(0.65,0,0.35,1)]
        "
      >
        <span>{label}</span>
        {icon && (
          <span
            className="
              flex items-center justify-center
              pl-1
              text-[22px] sm:text-[26px] md:text-[28px]
              shrink-0
              transition-transform duration-800 ease-in-out
              rotate-0 translate-x-1.5
              group-hover:rotate-45 group-hover:translate-x-0
            "
          >
            <MdOutlineArrowOutward />
          </span>
        )}
      </span>
    </button>
  );
}