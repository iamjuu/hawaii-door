interface Feature {
  text?: string;
  iconType?: 'star' | 'check';
  image?: string; // Path to image or SVG
}

interface HeroSectionProps {
  contant: string;
  bgImage: string;
  features: Feature[];
  para: string;
}

export default function HeroSection({ contant ,para, bgImage, features }: HeroSectionProps) {
    // const bgImage = '/assets/product/Exterior%20Wood%20Stile%20%26%20Rail.svg';
    return (
      <section
        style={{
          backgroundImage: `url('${bgImage}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        className="relative  mt-20 w-full h-[500px]"
      >
        <div className="gap-2  max-w-[700px] z-10 flex flex-col items-start justify-center px-16 h-full">
          <h1 className="text-white text-4xl md:text-5xl font-bold drop-shadow-lg">
            {contant}
          </h1>
          <p  className="text-[#C6C6C6] text-sm md:text-base font-medium">{para}</p>
        </div>

        <div className="absolute bottom-8 left-0  flex justify-center right-0 z-10 px-16">
          <div className="flex flex-col md:flex-row gap-6 md:gap-12">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3 text-gray-200">
                <div className="relative w-6 h-6">
                  {feature.image ? (
                    // Render custom image or SVG
                    <img 
                      src={feature.image} 
                      alt={feature.text || 'Feature'} 
                      className="w-6 h-6 object-contain"
                    />
                  ) : (
                    // Render default icon with star or check
                    <>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-gray-300"
                      >
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      </svg>
                      {feature.iconType === 'star' ? (
                        <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[10px] leading-none text-gray-300">
                          ★
                        </span>
                      ) : feature.iconType === 'check' ? (
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 10 10"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-300"
                        >
                          <path d="M1.5 5l2.5 2.5 4.5-4.5" />
                        </svg>
                      ) : null}
                    </>
                  )}
                </div>
                <span className="text-sm md:text-base font-medium">
                  {feature.text || 'Feature'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
