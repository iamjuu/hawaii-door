import Image from "next/image";
import { StaticImageData } from "next/image";
interface InfoBannerProps {
  icon: StaticImageData;
  hoverIcon?: StaticImageData;
  text: string;
  width?: number | { mobile: number; desktop: number };
  height?: number | { mobile: number; desktop: number };
}

const InfoBanner = ({
  icon,
  hoverIcon,
  text,
  width = 28,
  height = 28,
}: InfoBannerProps) => {
  // Extract mobile and desktop dimensions
  const desktopWidth = typeof width === "number" ? width : width.desktop;
  const desktopHeight = typeof height === "number" ? height : height.desktop;
  const mobileWidth = typeof width === "number" ? width : width.mobile;
  const mobileHeight = typeof height === "number" ? height : height.mobile;

  return (
    <div className="relative w-full min-h-[60px] md:h-[60px] flex flex-col md:flex-row justify-center items-center gap-4 md:gap-16 py-3 md:py-0 bg-[#F6F5F1] group   mt-18 md:mt-20 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-[60px]">
      <div className="flex items-center md:flex-row gap-3 md:gap-3">
        <div
          className="relative shrink-0"
          style={{
            width: `${mobileWidth}px`,
            height: `${mobileHeight}px`,
          }}
        >
          {hoverIcon ? (
            <>
              <Image
                src={icon}
                alt="Info icon"
                fill
                className="object-contain md:hidden transition-opacity duration-300 group-hover:opacity-0"
              />
              <Image
                src={hoverIcon}
                alt="Info icon hover"
                fill
                className="object-contain md:hidden absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
            </>
          ) : (
            <Image
              src={icon}
              alt="Info icon"
              fill
              className="object-contain md:hidden"
            />
          )}
        </div>
        <div
          className="relative hidden md:block shrink-0"
          style={{
            width: `${desktopWidth}px`,
            height: `${desktopHeight}px`,
          }}
        >
          {hoverIcon ? (
            <>
              <Image
                src={icon}
                alt="Info icon"
                fill
                className="object-contain transition-all duration-300 md:grayscale group-hover:opacity-0"
              />
              <Image
                src={hoverIcon}
                alt="Info icon hover"
                fill
                className="object-contain absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-all duration-300"
              />
            </>
          ) : (
            <Image
              src={icon}
              alt="Info icon"
              fill
              className="object-contain transition-all duration-500 md:grayscale md:group-hover:grayscale-0"
            />
          )}
        </div>
        <span className="text-[#585858] font-roboto text-[12px] md:text-[18px]">
          {text}
        </span>
      </div>
    </div>
  );
};

export default InfoBanner;
