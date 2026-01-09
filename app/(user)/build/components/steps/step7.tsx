import Image from "next/image";
import nolouver from "../../../../../public/assets/images/dummy/nolouver.png";
import louver12 from "../../../../../public/assets/images/dummy/louver12.png";
import louver2412 from "../../../../../public/assets/images/dummy/louver2412.png";
import louver2418 from "../../../../../public/assets/images/dummy/louver2418.png";
import toptobottom from "../../../../../public/assets/images/dummy/topb.png";
import full from "../../../../../public/assets/images/dummy/fulllouver.png";

interface StepProps {
  quoteData: any;
  setQuoteData: (data: any) => void;
  onNext?: () => void;
}

const Step7 = ({ quoteData, setQuoteData, onNext }: StepProps) => {
  const louverOptions = [
    {
      id: "no_louver",
      name: "No Louver",
      image: nolouver,
      label: "No Louver",
    },
    {
      id: "12x12",
      name: `12"x12"`,
      image: louver12,
      label: `12"x12"`,
    },
    {
      id: "24x12",
      name: `24"x12"`,
      image: louver2412,
      label: `24"x12"`,
    },
    {
      id: "24x18",
      name: `24"x18"`,
      image: louver2418,
      label: `24"x18"`,
    },
    {
      id: "ll_top_bottom",
      name: "LL- Top and Bottom",
      image: toptobottom,
      label: "LL- Top and Bottom",
    },
    {
      id: "full_louver",
      name: "Full Louver",
      image: full,
      label: "Full Louver",
    },
  ];

  const handleSelection = (louver: string) => {
    // Save selected louver value to state
    setQuoteData({
      ...quoteData,
      louver,
    });

    // Auto-advance to next step after selecting an option (like Step 5)
    if (onNext) {
      setTimeout(() => {
        onNext();
      }, 300);
    }
  };

  return (
    <div className="mt-[50px] mb-[50px]">
      <h2 className="text-[20px] md:text-[32px] font-roboto font-[500] mb-5 md:mb-8 text-black">Does this door need a Louver?</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-[900px]">
        {louverOptions.map((option) => (
          <div
            key={option.id}
            onClick={() => handleSelection(option.name)}
            className={`relative border   pb-3 cursor-pointer transition-all
               hover:shadow-2xl hover:scale-105
              ${
                quoteData.louver === option.name
                  ? " shadow-2xl border border-[#A3A3A3] bg-white"
                  : "border border-[#A3A3A3] bg-white"
              }`}
          >
            {/* Selected Badge (same style as Step 2) */}
            {quoteData.louver === option.name && (
              <div className="absolute top-2 right-2 z-10">
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

            {/* Image */}
            <div className="relative w-full max-h-[180px] aspect-[4/3] bg-gray-50 rounded-lg mb-2 overflow-hidden mx-auto">
              <Image
                src={option.image}
                alt={option.label}
                fill
                className="object-contain pt-2"
              />
            </div>

            {/* Label */}
            <p className="text-center text-sm font-semibold text-gray-800">
              {option.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Step7;