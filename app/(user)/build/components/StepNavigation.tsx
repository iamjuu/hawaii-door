// components/user/build-door/StepNavigation.tsx
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
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors"
          >
            <span>←</span>
            <span>GO BACK</span>
          </button>
        )}
      </div>

      {/* Center: Progress */}
      <div className="flex items-center gap-3">
        <div className="w-32 md:w-48 bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-green-400 h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <span className="text-gray-600 text-sm font-medium min-w-[3rem]">
          {percentage}%
        </span>
      </div>

      {/* Right: Next Button */}
      <div className="w-32 flex justify-end">
        <button
          onClick={onNext}
          className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors"
        >
          <span>NEXT</span>
          <span>→</span>
        </button>
      </div>
    </div>
  );
};

export default StepNavigation;