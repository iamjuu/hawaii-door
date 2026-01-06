"use client";

import { useState } from "react";

interface StepProps {
  quoteData: any;
  setQuoteData: (data: any) => void;
}

const Step4 = ({}: StepProps) => {
  const [selectedOption, setSelectedOption] = useState<"yes" | "no" | null>(
    null
  );

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8">Has the wall been built yet?</h2>

      <div>
       
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setSelectedOption("yes")}
            className={`px-6 py-4 rounded-lg border-2 font-medium transition-all text-left ${
              selectedOption === "yes"
                ? "border-orange-500 bg-orange-50 text-orange-600"
                : "border-gray-300 hover:border-orange-300"
            }`}
          >
            <div className="text-xl">Yes</div>
          </button>

          <button
            onClick={() => setSelectedOption("no")}
            className={`px-6 py-4 rounded-lg border-2 font-medium transition-all text-left ${
              selectedOption === "no"
                ? "border-orange-500 bg-orange-50 text-orange-600"
                : "border-gray-300 hover:border-orange-300"
            }`}
          >
            <div className="text-xl">No</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step4;