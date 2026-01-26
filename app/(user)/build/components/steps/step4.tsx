"use client";

interface StepProps {
  quoteData: any;
  setQuoteData: (data: any) => void;
  onNext?: () => void;
}

const Step4 = ({ quoteData, setQuoteData, onNext }: StepProps) => {
  const selectedOption = (quoteData.wallBuilt as "yes" | "no" | undefined) || null;

  const handleSelect = (value: "yes" | "no") => {
    setQuoteData({
      ...quoteData,
      wallBuilt: value,
    });

    // Auto-advance to next step after selection (like Step 2)
    if (onNext) {
      setTimeout(() => {
        onNext();
      }, 300);
    }
  };

  return (
    <div className="mt-[50px] mb-[50px] max-w-[700px] mx-auto">
      <h2 className="text-[20px] md:text-[32px] font-roboto font-[500] mb-5 md:mb-8 text-black text-center">Has the wall been built yet?</h2>

      <div>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => handleSelect("yes")}
            className={`px-1 md:px-4 py-1 md:py-3 border font-medium transition-all text-center hover:shadow-lg hover:cursor-pointer ${
              selectedOption === "yes"
                ? " border-2 border-orange-500  text-orange-600"
                : "border-gray-300 "
            }`}
          >
            <div className="text-[16px] md:text-[22px] font-roboto font-light text-[#1C1C1C]">Yes</div>
          </button>

          <button
            onClick={() => handleSelect("no")}
            className={`px-1 md:px-4 py-1 md:py-3 border font-medium transition-all text-center hover:shadow-lg hover:cursor-pointer ${
              selectedOption === "no"
                ? "border-2 border-orange-500  text-orange-600"
                : "border-gray-300 "
            }`}
          >
            <div className="text-[16px] md:text-[22px] font-roboto font-light text-[#1C1C1C]">No</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step4;