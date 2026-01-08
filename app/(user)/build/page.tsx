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
import vector99 from "../../../public/assets/images/dummy/vector99.png"
import vector98 from "../../../public/assets/images/dummy/vector98.png"
import vector44 from "../../../public/assets/images/dummy/vector44.png"
import vector88 from "../../../public/assets/images/dummy/vector88.png"
import lock from "../../../public/assets/images/dummy/lockk.png"
import vector33 from "../../../public/assets/images/dummy/vector33.png"
// Import all step components
import Step1SelectCategory from "./components/steps/Step1SelectCategory";
import Step2SingleOrDouble from "./components/steps/Step2SingleOrDouble";
import Step3DoorSize from "./components/steps/Step3DoorSize";
import Step4 from "./components/steps/step4"
import Step5 from "./components/steps/step5"
import Step6 from "./components/steps/step6"
import Step7 from "./components/steps/step7"
import Step8 from "./components/steps/step8"
import Step9 from "./components/steps/step9"
import Step10 from "./components/steps/step10"
import Step11 from "./components/steps/step11"
import Step12 from "./components/steps/step12"
import Step13 from "./components/steps/step13"
import Step14 from "./components/steps/step14"
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
        icon: vector99,
        text: "Confirm wall status to lock accurate sizing",
      },
      percentage: 21,
    },
    {
      component: Step5,
      infoBanner: {
        icon: vector98,
        text: "Select wall thickness to ensure a precise fit and clean installation.",
      },
      percentage: 28,
    },
    {
      component: Step6,
      infoBanner: {
        icon: vector44,
        text: "Perfect swing: choose your handing and hinges",
      },
      percentage: 35,
    },
    
    {
      component: Step7,
      infoBanner: {
        icon: vector88,
        text: "Choose louver option to control airflow",
      },
      percentage: 42,
    },
    {
      component: Step8,
      infoBanner: {
        icon: lock,
        text: "Lock-ready doors for your preferred hardware",
      },
      percentage: 49,
    },
    {
      component: Step9,
      infoBanner: {
        icon: vector33,
        text: "Custom jambs for a ready-to-install package",
      },
      percentage: 56,
    },
    {
      component: Step10,
      infoBanner: {
        icon: vector56,
        text: "Choose how your door will be hung",
      },
      percentage: 63,
    },
    {
      component: Step11,
      infoBanner: {
        icon: vector56,
        text: "Choose how your door will be hung",
      },
      percentage: 70,
    },
    {
      component: Step12,
      infoBanner: {
        icon: vector56,
        text: "Choose how your door will be hung",
      },
      percentage: 77,
    },
    {
      component: Step13,
      infoBanner: {
        icon: vector56,
        text: "Choose how your door will be hung",
      },
      percentage: 84,
    },
    {
      component: Step14,
      infoBanner: {
        icon: vector56,
        text: "Choose how your door will be hung",
      },
      percentage: 91,
    },
  ];

  const CurrentStepComponent = steps[currentStep].component;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      // When leaving Step 3 (index 2), ensure a default thickness is saved
      if (currentStep === 2) {
        setQuoteData((prev) => ({
          ...prev,
          thickness: prev.thickness || '1 3/8"',
        }));
      }

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
        <div className="px-15 mx-auto  py-8 border border-amber-800">
          <div className="flex flex-col lg:flex-row gap-0">
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
              currentStep={currentStep}
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