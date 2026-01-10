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
import Step15 from "./components/steps/step15"
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
    wallBuilt: "",
    wallThickness: "",
    customDiameter: "",
    doorHandling: "",
    hingeRadius: "",
    hingeType: "",
    hingeLocation1: "",
    hingeLocation2: "",
    hingeLocation3: "",
    backset: "",
    louver: "",
    lockType: "",
    lockBoreDiameter: "",
    lockBackset: "",
    lockCenterline: "",
    latchBoreDiameter: "",
    faceplateDimension: "",
    faceplateRadius: "",
    driveInDiameter: "",
    jambType: "",
    jambSize: "",
    dbStrikeType: "",
    lockStrikeType: "",
    undercutMeasurement: "",
    weatherstripping: "",
    thresholdType: "",
    hangDoorOption: "",
    protectDoorOption: "",
    addOnOption: "",
    doorFinishOption: "",
    specialInstructions: "",
    uploadedFiles: [],
    firstName: "",
    companyName: "",
    phone: "",
    email: "",
    poNumber: "",
  });

  // Define all steps with their info banners
  const steps = [
    {
      component: Step1SelectCategory,
      infoBanner: {
        icon: usaimg,
        text: "Manufactured in the US, precision-machined in Hawaii",
        width: { mobile: 24, desktop: 28 },
        height: { mobile: 24, desktop: 28 },
      },
      percentage: 0,
    },
    {
      component: Step2SingleOrDouble,
      infoBanner: {
        icon: vector57,
        text: "Choose the right opening for a clean, balanced entry",
        width: { mobile: 24, desktop: 28 },
        height: { mobile: 24, desktop: 28 },
      },
      percentage: 7,
    },
    {
      component: Step3DoorSize,
      infoBanner: {
        icon: vector56,
        text: "Built to fit: fully custom door sizes",
        width: { mobile: 24, desktop: 25 },
        height: { mobile: 24, desktop: 25 },
      },
      percentage: 14,
    },
    {
      component: Step4,
      infoBanner: {
        icon: vector99,
        text: "Confirm wall status to lock accurate sizing",
        width: { mobile: 24, desktop: 26 },
        height: { mobile: 24, desktop: 26 },
      },
      percentage: 21,
    },
    {
      component: Step5,
      infoBanner: {
        icon: vector98,
        text: "Select wall thickness to ensure a precise fit and clean installation.",
        width: { mobile: 24, desktop: 24 },
        height: { mobile: 24, desktop: 24 },
      },
      percentage: 28,
    },
    {
      component: Step6,
      infoBanner: {
        icon: vector44,
        text: "Perfect swing: choose your handing and hinges",
        width: { mobile: 24, desktop: 28 },
        height: { mobile: 24, desktop: 28 },
      },
      percentage: 35,
    },
    
    {
      component: Step7,
      infoBanner: {
        icon: vector88,
        text: "Choose louver option to control airflow",
        width: { mobile: 24, desktop: 28 },
        height: { mobile: 24, desktop: 28 },
      },
      percentage: 42,
    },
    {
      component: Step8,
      infoBanner: {
        icon: lock,
        text: "Lock-ready doors for your preferred hardware",
        width: { mobile: 24, desktop: 28 },
        height: { mobile: 24, desktop: 28 },
      },
      percentage: 49,
    },
    {
      component: Step9,
      infoBanner: {
        icon: vector33,
        text: "Custom jambs for a ready-to-install package",
        width: { mobile: 24, desktop: 28 },
        height: { mobile: 24, desktop: 28 },
      },
      percentage: 56,
    },
    {
      component: Step10,
      infoBanner: {
        icon: vector56,
        text: "Choose how your door will be hung",
        width: { mobile: 24, desktop: 28 },
        height: { mobile: 24, desktop: 28 },
      },
      percentage: 63,
    },
    {
      component: Step11,
      infoBanner: {
        icon: vector56,
        text: "Choose how your door will be hung",
        width: { mobile: 24, desktop: 28 },
        height: { mobile: 24, desktop: 28 },
      },
      percentage: 70,
    },
    {
      component: Step12,
      infoBanner: {
        icon: vector56,
        text: "Choose how your door will be hung",
        width: { mobile: 24, desktop: 28 },
        height: { mobile: 24, desktop: 28 },
      },
      percentage: 77,
    },
    {
      component: Step13,
      infoBanner: {
        icon: vector56,
        text: "Choose how your door will be hung",
        width: { mobile: 24, desktop: 28 },
        height: { mobile: 24, desktop: 28 },
      },
      percentage: 84,
    },
    {
      component: Step14,
      infoBanner: {
        icon: vector56,
        text: "Choose how your door will be hung",
        width: { mobile: 24, desktop: 28 },
        height: { mobile: 24, desktop: 28 },
      },
      percentage: 91,
    },
    {
      component: Step15,
      infoBanner: {
        icon: vector56,
        text: "Choose how your door will be hung",
        width: { mobile: 24, desktop: 28 },
        height: { mobile: 24, desktop: 28 },
      },
      percentage:100,
    },
  ];

  const CurrentStepComponent = steps[currentStep].component;

  const handleNext = (doorType?: string, doorConfig?: string) => {
    // If doorType is provided (and it's actually a string, not an event), update the quoteData first
    if (doorType !== undefined && typeof doorType === 'string') {
      setQuoteData((prev) => ({ ...prev, doorType }));
    }
    
    // If doorConfig is provided (and it's actually a string, not an event), update the quoteData first
    if (doorConfig !== undefined && typeof doorConfig === 'string') {
      setQuoteData((prev) => ({ ...prev, doorConfig, category: doorConfig }));
    }
    
    // Prevent moving to next step if on step 1 and no door is selected
    const currentDoorType = (doorType !== undefined && typeof doorType === 'string') ? doorType : quoteData.doorType;
    if (currentStep === 0 && !currentDoorType) {
      return;
    }
    
    // Prevent moving to next step if on step 2 and no door config is selected
    const currentDoorConfig = (doorConfig !== undefined && typeof doorConfig === 'string') ? doorConfig : quoteData.doorConfig;
    if (currentStep === 1 && !currentDoorConfig) {
      return;
    }
    
    // Prevent moving to next step if on step 3 (index 2) and width or height is not selected
    if (currentStep === 2 && (!quoteData.width || !quoteData.height)) {
      return;
    }

    // Prevent moving to next step if on step 4 (index 3) and wallBuilt is not selected
    if (currentStep === 3 && !quoteData.wallBuilt) {
      return;
    }

    // Prevent moving to next step if on step 5 (index 4) and neither preset option nor custom diameter is selected
    if (currentStep === 4 && !quoteData.wallThickness && !quoteData.customDiameter) {
      return;
    }

    // Prevent moving to next step if on step 6 (index 5) and doorHandling, hingeRadius, or hingeType is not selected
    if (currentStep === 5 && (!quoteData.doorHandling || !quoteData.hingeRadius || !quoteData.hingeType)) {
      return;
    }

    // Prevent moving to next step if on step 7 (index 6) and louver is not selected
    if (currentStep === 6 && !quoteData.louver) {
      return;
    }

    // Prevent moving to next step if on step 8 (index 7) and required fields are not selected
    if (currentStep === 7 && (
      !quoteData.lockType ||
      !quoteData.lockBoreDiameter ||
      !quoteData.lockBackset ||
      !quoteData.lockCenterline ||
      !quoteData.faceplateDimension ||
      !quoteData.faceplateRadius ||
      !quoteData.driveInDiameter ||
      !quoteData.latchBoreDiameter
    )) {
      return;
    }

    // Prevent moving to next step if on step 9 (index 8) and required fields are not selected (Undercut Measurement is optional)
    if (currentStep === 8 && (
      !quoteData.jambType ||
      !quoteData.jambSize ||
      !quoteData.dbStrikeType ||
      !quoteData.lockStrikeType ||
      !quoteData.weatherstripping ||
      !quoteData.thresholdType
    )) {
      return;
    }

    // Prevent moving to next step if on step 10 (index 9) and hangDoorOption is not selected
    if (currentStep === 9 && !quoteData.hangDoorOption) {
      return;
    }

    // Prevent moving to next step if on step 11 (index 10) and protectDoorOption is not selected
    if (currentStep === 10 && !quoteData.protectDoorOption) {
      return;
    }

    // Prevent moving to next step if on step 12 (index 11) and addOnOption is not selected
    if (currentStep === 11 && !quoteData.addOnOption) {
      return;
    }

    // Prevent moving to next step if on step 13 (index 12) and doorFinishOption is not selected (specialInstructions is optional)
    if (currentStep === 12 && !quoteData.doorFinishOption) {
      return;
    }

    // Prevent moving to next step if on step 14 (index 13) and any required field is not filled
    if (currentStep === 13 && (
      !quoteData.firstName ||
      !quoteData.companyName ||
      !quoteData.phone ||
      !quoteData.email ||
      !quoteData.poNumber
    )) {
      return;
    }
    
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
    // Prevent going back from step 1
    if (currentStep === 0) {
      return;
    }
    
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
      wallBuilt: "",
      wallThickness: "",
      customDiameter: "",
      doorHandling: "",
      hingeRadius: "",
      hingeType: "",
      hingeLocation1: "",
      hingeLocation2: "",
      hingeLocation3: "",
      backset: "",
      louver: "",
      lockType: "",
      lockBoreDiameter: "",
      lockBackset: "",
      lockCenterline: "",
      latchBoreDiameter: "",
      faceplateDimension: "",
      faceplateRadius: "",
      driveInDiameter: "",
      jambType: "",
      jambSize: "",
      dbStrikeType: "",
      lockStrikeType: "",
      undercutMeasurement: "",
      weatherstripping: "",
      thresholdType: "",
      hangDoorOption: "",
      protectDoorOption: "",
      addOnOption: "",
      doorFinishOption: "",
      specialInstructions: "",
      uploadedFiles: [],
      firstName: "",
      companyName: "",
      phone: "",
      email: "",
      poNumber: "",
    });
  };

  return (
    <>
      <Navbar />
      
      <InfoBanner
        icon={steps[currentStep].infoBanner.icon}
        text={steps[currentStep].infoBanner.text}
        width={steps[currentStep].infoBanner.width}
        height={steps[currentStep].infoBanner.height}
      />

      <div className="min-h-screen bg-white">
        <div className="pl-6 pr-4 md:px-15 mx-auto  py-8 ">
          <div className="flex flex-col lg:flex-row gap-0">
            {/* Main Content Area */}
            <div className="flex-1">
              <StepContainer>                
                <StepNavigation
                  onBack={handleBack}
                  onNext={() => handleNext()}
                  showBack={true}
                  percentage={steps[currentStep].percentage}
                  isFirstStep={currentStep === 0}
                  isNextDisabled={
                    (currentStep === 0 && !quoteData.doorType) ||
                    (currentStep === 1 && !quoteData.doorConfig) ||
                    (currentStep === 2 && (!quoteData.width || !quoteData.height)) ||
                    (currentStep === 3 && !quoteData.wallBuilt) ||
                    (currentStep === 4 && !quoteData.wallThickness && !quoteData.customDiameter) ||
                    (currentStep === 5 && (!quoteData.doorHandling || !quoteData.hingeRadius || !quoteData.hingeType)) ||
                    (currentStep === 6 && !quoteData.louver) ||
                    (currentStep === 7 && (
                      !quoteData.lockType ||
                      !quoteData.lockBoreDiameter ||
                      !quoteData.lockBackset ||
                      !quoteData.lockCenterline ||
                      !quoteData.faceplateDimension ||
                      !quoteData.faceplateRadius ||
                      !quoteData.driveInDiameter ||
                      !quoteData.latchBoreDiameter
                    )) ||
                    (currentStep === 8 && (
                      !quoteData.jambType ||
                      !quoteData.jambSize ||
                      !quoteData.dbStrikeType ||
                      !quoteData.lockStrikeType ||
                      !quoteData.weatherstripping ||
                      !quoteData.thresholdType
                    )) ||
                    (currentStep === 9 && !quoteData.hangDoorOption) ||
                    (currentStep === 10 && !quoteData.protectDoorOption) ||
                    (currentStep === 11 && !quoteData.addOnOption) ||
                    (currentStep === 12 && !quoteData.doorFinishOption) ||
                    (currentStep === 13 && (
                      !quoteData.firstName ||
                      !quoteData.companyName ||
                      !quoteData.phone ||
                      !quoteData.email ||
                      !quoteData.poNumber
                    ))
                  }
                />

                <CurrentStepComponent
                  quoteData={quoteData}
                  setQuoteData={setQuoteData}
                  onNext={
                    currentStep === 0
                      ? (doorType?: string) => handleNext(doorType)
                      : currentStep === 1
                      ? (doorConfig?: string) => handleNext(undefined, doorConfig)
                      : currentStep === 3
                      ? () => setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev))
                      : currentStep === 4
                      ? () => setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev))
                      : currentStep === 5
                      ? () => setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev))
                      : currentStep === 6
                      ? () => setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev))
                      : currentStep === 7
                      ? () => setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev))
                      : currentStep === 8
                      ? () => setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev))
                      : currentStep === 9
                      ? () => setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev))
                      : currentStep === 10
                      ? () => setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev))
                      : currentStep === 11
                      ? () => setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev))
                      : currentStep === 12
                      ? () => setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev))
                      : currentStep === 13
                      ? () => setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev))
                      : undefined
                  }
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