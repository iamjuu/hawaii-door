import Image, { StaticImageData } from "next/image";
import PillCTAButton from "../../../home/components/link-button";
import { MdFileDownload } from "react-icons/md";

interface Feature {
  text?: string;
  iconGray?: string | StaticImageData;
  iconColor?: string | StaticImageData;
}

interface HeroSectionProps {
  contant: string;
  bgImage: string | StaticImageData;
  features: Feature[];
  para: string;
}

export default function HeroSection({
  contant,
  para,
  bgImage,
  features,
}: HeroSectionProps) {
  // Calculate dynamic duration based on content length to maintain consistent speed
  const totalChars = features.reduce(
    (acc, f) => acc + (f.text?.length || 0),
    0,
  );
  // Factor 0.44 selected to match the main product page's 90s speed for ~205 chars
  const duration = Math.max(totalChars * 0.44, 30); // Minimum 30s to avoid ultra-fast small sets

  // duplicate features for seamless loop
  const loopFeatures = Array(10).fill(features).flat();

  // Use CSS background for string URLs (local /assets/ or remote); Image can fail for local public paths
  const bgUrl =
    typeof bgImage === "string" ? bgImage : (bgImage as StaticImageData).src;
  // Encode so paths with spaces (e.g. "interior door hero image 3.svg") work in url()
  const bgUrlEncoded = encodeURI(bgUrl);

  return (
    <section className="relative mt-5 md:mt-20 w-full h-[750px] font-roboto overflow-hidden">
      {/* Background: div + CSS so /assets/... and any URL loads reliably */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-no-repeat bg-[position:42%_50%] md:bg-center"
        style={{ backgroundImage: `url('${bgUrlEncoded}')` }}
        aria-hidden
      />

      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/20 z-[1]" />

      {/* HERO CONTENT */}
      <div className="gap-3 md:gap-6 max-w-[650px] z-10 relative flex flex-col items-start justify-center px-6 md:px-16 h-full">
        <h1 className="text-white  text-wrap md:text-nowrap text-3xl md:text-[58px] font-[600] drop-shadow-lg">
          {contant}
        </h1>

        <p className="text-[#C6C6C6] text-base md:text-[18px] font-[400]">
          {para}
        </p>

        {/* CTA Button */}
        <div className="mt-8">
          <a
            href={
              process.env.NEXT_PUBLIC_PRODUCTION === "true"
                ? `${process.env.NEXT_PUBLIC_URL}/uploads/brochure/Hawaii_Door_Brochure.pdf`
                : "https://navajowhite-ostrich-413154.hostingersite.com/uploads/brochure/Hawaii_Door_Brochure.pdf"
            }
            download
            target="_blank"
            rel="noopener noreferrer"
          >
            <PillCTAButton
              label="Download our Brochure"
              icon={<MdFileDownload className="text-2xl" />}
              hoverVariant="white"
              className="cursor-pointer !w-fit !h-auto !px-6 !py-3"
            />
          </a>
        </div>
      </div>

      {/* FEATURE CAROUSEL */}
      <div className="absolute bottom-3 md:bottom-8 left-0 right-0 z-30 px-6 md:px-1 group/bar">
        <div className="carousel-wrapper py-2">
          <div
            className="carousel-track"
            style={{
              // @ts-ignore - custom CSS property
              "--carousel-duration": `${duration}s`,
            }}
          >
            {loopFeatures.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-3 text-gray-200 flex-shrink-0 pr-6 md:pr-12"
              >
                {(feature.iconGray || feature.iconColor) && (
                  <div className="relative w-6 h-6 md:w-8 md:h-8">
                    {feature.iconGray && (
                      <Image
                        src={feature.iconGray}
                        alt={feature.text || "Feature"}
                        width={32}
                        height={32}
                        className="object-contain group-hover/bar:opacity-0 transition-opacity duration-300"
                      />
                    )}
                    {feature.iconColor && (
                      <Image
                        src={feature.iconColor}
                        alt={feature.text || "Feature"}
                        width={32}
                        height={32}
                        className="absolute top-0 left-0 object-contain opacity-0 group-hover/bar:opacity-100 transition-opacity duration-300"
                      />
                    )}
                  </div>
                )}

                <span className="text-sm md:text-[20px] font-roboto font-[400] whitespace-nowrap group-hover/bar:text-[#FFFFFF] transition-colors duration-300">
                  {feature.text || "Feature"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
