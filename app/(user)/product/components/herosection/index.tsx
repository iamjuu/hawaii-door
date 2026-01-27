import Image, { StaticImageData } from "next/image";

interface Feature {
  text?: string;
  iconType?: string | StaticImageData;
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
  // duplicate features for seamless loop
  const loopFeatures = [...features, ...features];

  // Use CSS background for string URLs (local /assets/ or remote); Image can fail for local public paths
  const bgUrl =
    typeof bgImage === "string"
      ? bgImage
      : (bgImage as StaticImageData).src;
  // Encode so paths with spaces (e.g. "interior door hero image 3.svg") work in url()
  const bgUrlEncoded = encodeURI(bgUrl);

  return (
    <section className="relative mt-5 md:mt-20 w-full h-[750px] font-roboto overflow-hidden">
      {/* Background: div + CSS so /assets/... and any URL loads reliably */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${bgUrlEncoded}')` }}
        aria-hidden
      />

      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/20 z-[1]" />

      {/* HERO CONTENT */}
      <div className="gap-3 md:gap-6 max-w-[650px] z-10 relative flex flex-col items-start justify-center px-6 md:px-16 h-full">
        <h1 className="text-white text-nowrap text-3xl md:text-[58px] font-[600] drop-shadow-lg">
          {contant}
        </h1>

        <p className="text-[#C6C6C6] text-base md:text-[18px] font-[400]">
          {para}
        </p>
      </div>

      {/* FEATURE CAROUSEL */}
      <div className="absolute bottom-3 md:bottom-8 left-0 right-0 z-20 px-6 md:px-1">
        <div className="carousel-wrapper">
          <div className="carousel-track gap-6 md:gap-12">
            {loopFeatures.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-3 text-gray-200 flex-shrink-0"
              >
                {feature.iconType && (
                  <div className="relative w-6 h-6">
                    <Image
                      src={feature.iconType}
                      alt={feature.text || "Feature"}
                      width={24}
                      height={24}
                      className="object-contain"
                    />
                  </div>
                )}

                <span className="text-sm md:text-[24px] font-roboto font-[400] whitespace-nowrap">
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
