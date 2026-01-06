import Image from "next/image";
import nolouver from "../../../../../public/assets/images/dummy/nolouver.png";
import louver12 from "../../../../../public/assets/images/dummy/louver12.png";
import louver2412 from "../../../../../public/assets/images/dummy/louver2412.png";
import louver2418 from "../../../../../public/assets/images/dummy/louver2418.png";
import toptobottom from "../../../../../public/assets/images/dummy/toptobottom.png";
import full from "../../../../../public/assets/images/dummy/fulllouver.png";

interface StepProps {
  quoteData: any;
  setQuoteData: (data: any) => void;
}

const Step7 = ({ quoteData, setQuoteData }: StepProps) => {
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
    setQuoteData({
      ...quoteData,
      louver,
    });
  };

  return (
    <div className="mt-[50px] mb-[50px]">
      <h2 className="text-3xl font-bold mb-8">Does this door need a Louver?</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {louverOptions.map((option) => (
          <div
            key={option.id}
            onClick={() => handleSelection(option.name)}
            className={`relative border-2 rounded-lg p-4 cursor-pointer transition-all
              hover:border-orange-500 hover:shadow-2xl hover:scale-105
              ${
                quoteData.louver === option.name
                  ? "border-orange-500 shadow-2xl bg-orange-50"
                  : "border-gray-200 bg-white"
              }`}
          >
            {/* Selected Badge (same style as Step 2) */}
            {quoteData.louver === option.name && (
              <div className="absolute top-3 right-3 z-10">
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
            <div className="relative w-full aspect-[4/3] bg-gray-50 rounded-lg mb-4 overflow-hidden mx-auto">
              <Image
                src={option.image}
                alt={option.label}
                fill
                className="object-contain p-4"
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