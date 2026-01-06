// app/build/page.tsx
"use client";

import { useState } from "react";
import Navbar from "@/components/user/Navbar";
import Footer from "@/components/user/Footer";
import StepContainer from "./components/StepContainer"
import StepNavigation from "./components/StepNavigation"
import InfoBanner from "./components/InfoBanner";
import QuoteSummary from "./components/QuoteSummary";
import usaimg from "../../../public/assets/images/landing/usa.png"
import vector56 from "../../../public/assets/images/dummy/vector56.png"
import vector57 from "../../../public/assets/images/dummy/vector57.png"
// Import all step components
import Step1SelectCategory from "./components/steps/Step1SelectCategory";
import Step2SingleOrDouble from "./components/steps/Step2SingleOrDouble";
import Step3DoorSize from "./components/steps/Step3DoorSize";
import Step4 from "./components/steps/step4"
const BuildDoor = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [quoteData, setQuoteData] = useState({
    doorType: "",
    category: "",
    doorConfig: "",
    width: "",
    height: "",
    thickness: "",
    quantity: 1,
  });

  // Define all steps with their info banners
  const steps = [
    {
      component: Step1SelectCategory,
      infoBanner: {
        icon: usaimg,
        text: "Manufactured in the US, precision-machined in Hawaii",
      },
      percentage: 0,
    },
    {
      component: Step2SingleOrDouble,
      infoBanner: {
        icon: vector57,
        text: "Choose the right opening for a clean, balanced entry",
      },
      percentage: 7,
    },
    {
      component: Step3DoorSize,
      infoBanner: {
        icon: vector56,
        text: "Built to fit: fully custom door sizes",
      },
      percentage: 14,
    },
    {
      component: Step4,
      infoBanner: {
        icon: vector56,
        text: "Built to fit: fully custom door sizes",
      },
      percentage: 14,
    },
    // Add more steps here
  ];

  const CurrentStepComponent = steps[currentStep].component;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setQuoteData({
      doorType: "",
      category: "",
      doorConfig: "",
      width: "",
      height: "",
      thickness: "",
      quantity: 1,
    });
  };

  return (
    <>
      <Navbar />
      
      <InfoBanner
        icon={steps[currentStep].infoBanner.icon}
        text={steps[currentStep].infoBanner.text}
      />

      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content Area */}
            <div className="flex-1">
              <StepContainer>                
                <StepNavigation
                  onBack={handleBack}
                  onNext={handleNext}
                  showBack={currentStep > 0}
                  percentage={steps[currentStep].percentage}
                />

                <CurrentStepComponent
                  quoteData={quoteData}
                  setQuoteData={setQuoteData}
                />
              </StepContainer>
            </div>

            {/* Quote Summary Sidebar */}
            <QuoteSummary
              quoteData={quoteData}
              onRestart={handleRestart}
            />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default BuildDoor;