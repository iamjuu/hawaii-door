// components/user/build-door/StepNavigation.tsx
import { GoChevronRight, GoChevronLeft } from "react-icons/go";

interface StepNavigationProps {
  onBack: () => void;
  onNext: () => void;
  showBack: boolean;
  percentage: number;
}

const StepNavigation = ({ onBack, onNext, showBack, percentage }: StepNavigationProps) => {
  return (
    <div className="relative flex items-center justify-between mb-8 px-4">
      {/* Left: Go Back Button */}
      <div className="w-32">
        {showBack && (
          <button
            onClick={onBack}
            className="flex items-center gap-[10px] px-4 h-[41px] w-[149.97px] bg-white border-2 border-[#EAEAEA] rounded-[10px] text-black hover:text-gray-900 transition-colors shadow-md font-roboto"
          >
            <GoChevronLeft className="text-black text-base" />
            <span className="text-[18px] font-roboto text-black">GO BACK</span>
          </button>
        )}
      </div>

      {/* Center: Progress */}
      <div className="flex items-center flex-1 justify-center">
        <div 
          className="h-[35px] w-full max-w-[645px] rounded-[12px] relative overflow-hidden flex items-center justify-center"
          style={{ backgroundColor: '#F6F6F6' }}
        >
          <div
            className="h-full rounded-[12px] transition-all duration-300 absolute left-0 top-0"
            style={{ 
              width: `${percentage}%`,
              background: `linear-gradient(to right, #B6D78A 0%, #CFEDA7 50%, #B6D78A 100%)`
            }}
          />
          <span className="relative z-10 text-gray-600 text-sm font-medium">
            {percentage}%
          </span>
        </div>
      </div>

      {/* Right: Next Button */}
      <div className="w-32 flex justify-end">
        <button
          onClick={onNext}
          className="flex items-center gap-[10px] px-4 h-[41px] bg-[#FF6E4A] text-white rounded-l-[10px] hover:opacity-90 transition-opacity font-roboto"
        >
          <span className="text-[18px] font-roboto">NEXT</span>
          <GoChevronRight className="text-white text-base" />
        </button>
      </div>
    </div>
  );
};

export default StepNavigation;