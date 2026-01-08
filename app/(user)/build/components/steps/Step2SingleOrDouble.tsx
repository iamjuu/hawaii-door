// components/user/build-door/steps/Step2SingleOrDouble.tsx (with Next.js Image)
import Image from "next/image";
import SingleDoorimg from "../../../../../public/assets/images/dummy/single1.png"
import Doubledoorimg from "../../../../../public/assets/images/dummy/double1.png"
interface StepProps {
  quoteData: any;
  setQuoteData: (data: any) => void;
  onNext?: (doorConfig?: string) => void;
}

const Step2SingleOrDouble = ({ quoteData, setQuoteData, onNext }: StepProps) => {
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
      category: doorConfig,
    });
    if (onNext) {
      setTimeout(() => {
        onNext(doorConfig);
      }, 300);
    }
  };
  

  return (
    <div className="mt-[50px] mb-[50px]  md:pr-[90px] ">
      <h2 className="text-[20px] md:text-[32px] font-roboto font-[500] mb-8 text-black">Single or Double Door</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {doorOptions.map((option) => (
          <div
            key={option.id}
            onClick={() => handleSelection(option.name)}
            className={`
              relative border-2 p-3 cursor-pointer transition-all
              w-full h-auto min-h-[140px] md:min-h-[180px]
              hover:border-orange-500 hover:shadow-lg
              border-gray-200 bg-white
            `}
            style={{
              borderColor: '#A3A3A3'
            }}
          >
            {/* Selected Badge */}
            {quoteData.doorConfig === option.name && (
              <div className="absolute top-4 right-4 z-10">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center shadow-lg">
                  <svg
                    className="w-5 h-5 text-black"
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
            <div className="relative w-full aspect-[2/3] max-h-[150px] md:max-h-[210px] bg-white mb-4 overflow-hidden mx-auto">

              <Image
                src={option.image}
                alt={option.name}
                fill
                className="object-contain p-4"
                priority
              />
            </div>

            {/* Door Name */}
            <h3 className="text-[14px] md:text-[18px] font-[300] font-roboto text-center text-black">
              {option.name}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Step2SingleOrDouble;