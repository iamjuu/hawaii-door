// components/user/build-door/steps/Step2SingleOrDouble.tsx (with Next.js Image)
import Image from "next/image";
import SingleDoorimg from "../../../../../public/assets/images/dummy/single1.png"
import Doubledoorimg from "../../../../../public/assets/images/dummy/double1.png"
interface StepProps {
  quoteData: any;
  setQuoteData: (data: any) => void;
}

const Step2SingleOrDouble = ({ quoteData, setQuoteData }: StepProps) => {
  const doorOptions = [
    {
      id: "single",
      name: "Single Door",
      image: SingleDoorimg,
    },
    {
      id: "double",
      name: "Double Door",
      image: Doubledoorimg,
    },
  ];

  const handleSelection = (doorConfig: string) => {
    setQuoteData({
      ...quoteData,
      doorConfig,
      category: doorConfig, // 👈 this is the key change
    });
  };
  

  return (
    <div className="mt-[50px] mb-[50px]">
      <h2 className="text-[32px] font-[500] mb-8 text-black">Single or Double Door</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {doorOptions.map((option) => (
          <div
            key={option.id}
            onClick={() => handleSelection(option.name)}
            className={`
              relative border-2 rounded-lg p-6 cursor-pointer transition-all
              hover:border-orange-500 hover:shadow-2xl hover:scale-105
              ${
                quoteData.doorConfig === option.name
                  ? "border-orange-500 shadow-2xl bg-orange-50"
                  : "border-gray-200 bg-white"
              }
            `}
          >
            {/* Selected Badge */}
            {quoteData.doorConfig === option.name && (
              <div className="absolute top-4 right-4 z-10">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center shadow-lg">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
              </div>
            )}

            {/* Door Image */}
            <div className="relative w-full aspect-[2/3] max-h-[260px] bg-gray-50 rounded-lg mb-4 overflow-hidden mx-auto">

              <Image
                src={option.image}
                alt={option.name}
                fill
                className="object-contain p-8"
                priority
              />
            </div>

            {/* Door Name */}
            <h3 className="text-[18px] font-[300] text-center text-black">
              {option.name}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Step2SingleOrDouble;