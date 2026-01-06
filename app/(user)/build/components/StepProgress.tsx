// components/user/build-door/StepProgress.tsx
interface StepProgressProps {
  percentage: number;
}

const StepProgress = ({ percentage }: StepProgressProps) => {
  return (
    <div className="w-full bg-gray-200 rounded-full h-3 mb-8">
      <div
        className="bg-green-400 h-3 rounded-full transition-all duration-300"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};

export default StepProgress;