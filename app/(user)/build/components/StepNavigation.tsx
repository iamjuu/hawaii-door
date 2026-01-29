// components/user/build-door/StepNavigation.tsx
import { GoChevronRight, GoChevronLeft } from "react-icons/go";

interface StepNavigationProps {
  onBack: () => void;
  onNext: () => void;
  showBack: boolean;
  percentage: number;
  isFirstStep?: boolean;
  isNextDisabled?: boolean;
  currentStep?: number;
  isSubmitting?: boolean;
}

const StepNavigation = ({ onBack, onNext, showBack, percentage, isFirstStep = false, isNextDisabled = false, currentStep, isSubmitting = false }: StepNavigationProps) => {
  const isBackDisabled = isFirstStep;
  const isStep15 = currentStep === 14;

  return (
    <div className={`relative flex flex-col md:flex-row items-center gap-3 md:gap-0 md:pt-[29px] md:pb-[25px] ${isStep15 ? 'max-w-[1100px] mx-auto' : ''}`}>
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
      <div className={`hidden md:flex items-center w-full ${isStep15 ? 'gap-4' : 'gap-0'}`}>
        {/* Left: Go Back Button */}
        <div className={`${isStep15 ? 'w-28' : 'w-auto shrink-0'}`}>
          {showBack && (
            <button
              onClick={isBackDisabled ? undefined : onBack}
              disabled={isBackDisabled}
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
        <div className={`flex items-center flex-1 justify-center gap-4 ${isStep15 ? 'mx-[10px]' : 'mx-[10px]'}`}>
          <div
            className={`h-[35px] w-full rounded-[12px] relative overflow-hidden flex items-center justify-center shadow-inner ${isStep15 ? 'max-w-full ml-[30px]' : 'max-w-[500px] xl:max-w-[1000px]'}`}
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
        <div className={`${isStep15 ? 'w-28' : 'w-auto shrink-0'} flex justify-end`}>
          <button
            onClick={isNextDisabled || isSubmitting ? undefined : onNext}
            disabled={isNextDisabled || isSubmitting}
            className={`
              flex items-center justify-center gap-[5px] w-[110px] px-4 h-[37px] bg-[#FF6E4A] text-white ${isStep15 ? 'rounded-[10px]' : 'rounded-l-[10px]'} transition-opacity font-roboto
              ${isNextDisabled || isSubmitting
                ? 'hover:cursor-not-allowed cursor-not-allowed opacity-70'
                : 'hover:opacity-90 hover:cursor-pointer cursor-pointer'
              }
            `}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="text-[16px] font-roboto">SENDING...</span>
              </>
            ) : (
              <>
                <span className="text-[16px] font-roboto">{isStep15 ? 'SUBMIT' : 'NEXT'}</span>
                <GoChevronRight className="text-white text-[20px]" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Mobile: Buttons row at top - Sticky */}
      <div className="flex md:hidden items-center justify-between w-full gap-2 fixed top-0 left-0 right-0 bg-white p-4 shadow-[0_2px_10px_rgba(0,0,0,0.1)] z-50">
        {/* Left: Go Back Button */}
        {showBack && (
          <button
            onClick={isBackDisabled ? undefined : onBack}
            disabled={isBackDisabled}
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
          onClick={isNextDisabled || isSubmitting ? undefined : onNext}
          disabled={isNextDisabled || isSubmitting}
          className={`
            flex items-center justify-center gap-[3px] w-[90px] px-2 h-[32px] bg-[#FF6E4A] text-white rounded-[8px] transition-opacity font-roboto
            ${isNextDisabled || isSubmitting
              ? 'hover:cursor-not-allowed cursor-not-allowed opacity-70'
              : 'hover:opacity-90 hover:cursor-pointer cursor-pointer'
            }
          `}
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin h-3 w-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="text-[12px] font-roboto">SENDING...</span>
            </>
          ) : (
            <>
              <span className="text-[12px] font-roboto">{isStep15 ? 'SUBMIT' : 'NEXT'}</span>
              <GoChevronRight className="text-white text-[16px]" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default StepNavigation;