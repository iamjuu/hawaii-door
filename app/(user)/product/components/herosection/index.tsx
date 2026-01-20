import Image, { StaticImageData } from 'next/image';

interface Feature {
  text?: string;
  iconType?: string | StaticImageData; // Path to image or SVG (imported module)
}

interface HeroSectionProps {
  contant: string;
  bgImage: string;
  features: Feature[];
  para: string;
}

export default function HeroSection({ contant, para, bgImage, features }: HeroSectionProps) {
  // const bgImage = '/assets/product/Exterior%20Wood%20Stile%20%26%20Rail.svg';
  return (
    <section
      style={{
        backgroundImage: `url('${bgImage}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      className="relative  mt-5 md:mt-20 w-full h-[750px] font-roboto"
    >
      <div className="gap-3 md:gap-6 max-w-[650px] z-10 flex flex-col items-start justify-center px-6 md:px-16 h-full">
        <h1 className="text-white text-3xl md:text-[58px] font-[600] drop-shadow-lg">
          {contant}
        </h1>
        <p className="text-[#C6C6C6] text-base md:text-[18px] font-[400] font-roboto">{para}</p>
      </div>

      <div className="absolute bottom-3 md:bottom-8 left-0  flex justify-center right-0 z-10 px-16">
        <div className="flex flex-col md:flex-row gap-6 md:gap-12">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-3 text-gray-200">
              {feature.iconType && (
                <div className="relative w-6 h-6">
                  <Image
                    src={feature.iconType}
                    alt={feature.text || 'Feature'}
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                </div>
              )}
              <span className="text-sm md:text-[24px] font-[400]">
                {feature.text || 'Feature'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
