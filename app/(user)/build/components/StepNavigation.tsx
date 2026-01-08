// components/user/build-door/StepNavigation.tsx
import { GoChevronRight, GoChevronLeft } from "react-icons/go";

interface StepNavigationProps {
  onBack: () => void;
  onNext: () => void;
  showBack: boolean;
  percentage: number;
  isFirstStep?: boolean;
  isNextDisabled?: boolean;
}

const StepNavigation = ({ onBack, onNext, showBack, percentage, isFirstStep = false, isNextDisabled = false }: StepNavigationProps) => {
  const isBackDisabled = isFirstStep;
  
  return (
    <div className="relative flex flex-col md:flex-row items-center gap-3 md:gap-0 md:pt-[29px] md:pb-[25px]">
      {/* Mobile: Progress Bar (smaller height) at top */}
      <div className="flex md:hidden items-center justify-center w-full">
        <div 
          className="h-[28px] w-full rounded-[10px] relative overflow-hidden flex items-center justify-center shadow-inner"
          style={{ backgroundColor: '#F6F6F6' }}
        >
          <div
            className="h-full rounded-[10px] transition-all duration-300 absolute left-0 top-0"
            style={{ 
              width: `${percentage}%`,
              background: `linear-gradient(to right, #B6D78A 0%, #CFEDA7 50%, #B6D78A 100%)`
            }}
          />
          <span className="relative z-10 text-[#9D9D9D] text-xs font-medium">
            {percentage} %
          </span>
        </div>
      </div>

      {/* Desktop: Original Layout */}
      <div className="hidden md:flex items-center gap-0 w-full">
        {/* Left: Go Back Button */}
        <div className="w-32">
          {showBack && (
            <button
              onClick={onBack}
              className={`
                flex items-center justify-center gap-[5px] px-4 h-[37px] w-[143.97px] bg-white border-2 border-[#EAEAEA] rounded-[10px] text-black hover:text-gray-900 transition-colors shadow-md font-roboto
                ${isBackDisabled 
                  ? 'hover:cursor-not-allowed cursor-not-allowed' 
                  : 'hover:cursor-pointer cursor-pointer'
                }
              `}
            >
              <GoChevronLeft className="text-black text-[20px]" />
              <span className="text-[16px] font-roboto text-black">GO BACK</span>
            </button>
          )}
        </div>

        {/* Center: Progress */}
        <div className="flex items-center flex-1 justify-center gap-4 ml-[29px]">
          <div 
            className="h-[35px] w-full max-w-[800px] rounded-[12px] relative overflow-hidden flex items-center justify-center shadow-inner"
            style={{ backgroundColor: '#F6F6F6' }}
          >
            <div
              className="h-full rounded-[12px] transition-all duration-300 absolute left-0 top-0"
              style={{ 
                width: `${percentage}%`,
                background: `linear-gradient(to right, #B6D78A 0%, #CFEDA7 50%, #B6D78A 100%)`
              }}
            />
            <span className="relative z-10 text-[#9D9D9D] text-sm font-medium">
              {percentage} %
            </span>
          </div>
        </div>

        {/* Right: Next Button */}
        <div className="w-32 flex justify-end">
          <button
            onClick={onNext}
            className={`
              flex items-center justify-center gap-[5px] w-[110px] px-4 h-[37px] bg-[#FF6E4A] text-white rounded-l-[10px] hover:opacity-90 transition-opacity font-roboto
              ${isNextDisabled 
                ? 'hover:cursor-not-allowed cursor-not-allowed' 
                : 'hover:cursor-pointer cursor-pointer'
              }
            `}
          >
            <span className="text-[16px] font-roboto">NEXT</span>
            <GoChevronRight className="text-white text-[20px]" />
          </button>
        </div>
      </div>

      {/* Mobile: Buttons row at bottom */}
      <div className="flex md:hidden items-center justify-between w-full gap-2">
        {/* Left: Go Back Button */}
        {showBack && (
          <button
            onClick={onBack}
            className={`
              flex items-center justify-center gap-[3px] px-2 h-[32px] w-[100px] bg-white border-2 border-[#EAEAEA] rounded-[8px] text-black hover:text-gray-900 transition-colors shadow-md font-roboto
              ${isBackDisabled 
                ? 'hover:cursor-not-allowed cursor-not-allowed' 
                : 'hover:cursor-pointer cursor-pointer'
              }
            `}
          >
            <GoChevronLeft className="text-black text-[16px]" />
            <span className="text-[12px] font-roboto text-black">GO BACK</span>
          </button>
        )}

        {/* Right: Next Button */}
        <button
          onClick={onNext}
          className={`
            flex items-center justify-center gap-[3px] w-[90px] px-2 h-[32px] bg-[#FF6E4A] text-white rounded-[8px] hover:opacity-90 transition-opacity font-roboto
            ${isNextDisabled 
              ? 'hover:cursor-not-allowed cursor-not-allowed' 
              : 'hover:cursor-pointer cursor-pointer'
            }
          `}
        >
          <span className="text-[12px] font-roboto">NEXT</span>
          <GoChevronRight className="text-white text-[16px]" />
        </button>
      </div>
    </div>
  );
};

export default StepNavigation;