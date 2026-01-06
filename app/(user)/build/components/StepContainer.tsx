// components/user/build-door/StepContainer.tsx
interface StepContainerProps {
    children: React.ReactNode;
  }
  
  const StepContainer = ({ children }: StepContainerProps) => {
    return (
      <div className="bg-white rounded-lg">
        {children}
      </div>
    );
  };
  
  export default StepContainer;