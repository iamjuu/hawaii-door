// app/build/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { message } from "antd";
import Navbar from "@/components/user/Navbar";
import Footer from "@/components/user/Footer";
import PageLoader from "@/components/user/PageLoader";
import StepContainer from "./components/StepContainer";
import StepNavigation from "./components/StepNavigation";
import InfoBanner from "./components/InfoBanner";
import QuoteSummary from "./components/QuoteSummary";
import usaimg from "../../../public/assets/images/landing/usa.png";
import vector56 from "../../../public/assets/images/dummy/vector56.png";
import vector57 from "../../../public/assets/images/dummy/vector57.png";
import vector99 from "../../../public/assets/images/dummy/vector99.png";
import vector98 from "../../../public/assets/images/dummy/vector98.png";
import vector44 from "../../../public/assets/images/dummy/vector44.png";
import vector88 from "../../../public/assets/images/dummy/vector88.png";
import lock from "../../../public/assets/images/dummy/lockk.png";
import vector33 from "../../../public/assets/images/dummy/vector33.png";
import vector20 from "../../../public/assets/images/dummy/vector20.png";
import vector21 from "../../../public/assets/images/dummy/vector21.png";
import vector22 from "../../../public/assets/images/dummy/vector22.png";
import vector23 from "../../../public/assets/images/dummy/vector23.png";
import vector24 from "../../../public/assets/images/dummy/vector24.png";
// Import all builder hover icons
import doorHalf from "../../../public/assets/builder/door half.png";
import holeBigDoor from "../../../public/assets/builder/hole big door.png";
import buildDoorHalf from "../../../public/assets/builder/build a door half.png";
import brick from "../../../public/assets/builder/brick.png";
import seetings from "../../../public/assets/builder/seetings.png";
import zzaaa from "../../../public/assets/builder/zzaaa.png";
import builderLock from "../../../public/assets/builder/lock.png";
import builderVector5 from "../../../public/assets/builder/Vector-5.png";
import doorPwoli from "../../../public/assets/builder/door pwoli.png";
import shields from "../../../public/assets/builder/shields.png";
import builderPaint from "../../../public/assets/builder/paint.png";
import builderDocument from "../../../public/assets/builder/document.png";
import builderTick from "../../../public/assets/builder/tick.png";
import tickGray from "../../../public/assets/icons/tick-gray.png";
import tickColor from "../../../public/assets/icons/tick-color.png";

// Import all step components
import Step0ChooseCategory from "./components/steps/Step0ChooseCategory";
import Step1SelectCategory from "./components/steps/Step1SelectCategory";
import Step2SingleOrDouble from "./components/steps/Step2SingleOrDouble";
import Step3DoorSize from "./components/steps/Step3DoorSize";
import Step4 from "./components/steps/step4";
import Step5 from "./components/steps/step5";
import Step6 from "./components/steps/step6";
import Step7 from "./components/steps/step7";
import Step8 from "./components/steps/step8";
import Step9 from "./components/steps/step9";
import Step10 from "./components/steps/step10";
import Step11 from "./components/steps/step11";
import Step12 from "./components/steps/step12";
import Step13 from "./components/steps/step13";
import Step14 from "./components/steps/step14";
import Step15 from "./components/steps/step15";
// Helper to validate email format
const isValidEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const BuildDoor = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentStep]);
  const [quoteData, setQuoteData] = useState({
    productCategory: "",
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
    lockType: [] as string[],
    lockBoreDiameter: "",
    lockBackset: "",
    lockCenterline: "",
    latchBoreDiameter: "",
    faceplateDimension: "",
    faceplateRadius: "",
    driveInDiameter: "",
    needsJambPreHanging: null as string | null,
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
    doorCategory: "",
    selectedDoorId: "",
    selectedDoorName: "",
    specialInstructions: "",
    uploadedFiles: [],
    firstName: "",
    companyName: "",
    phone: "+1",
    email: "",
    poNumber: "",
  });

  // Define all steps with their info banners
  const steps = [
    {
      component: Step0ChooseCategory,
      infoBanner: {
        icon: usaimg,
        text: "Manufactured in the US",
        width: { mobile: 24, desktop: 28 },
        height: { mobile: 24, desktop: 28 },
      },
      percentage: 0,
    },
    {
      component: Step1SelectCategory,
      infoBanner: {
        icon: tickGray,
        hoverIcon: tickColor,
        text: "Precision-machined in Hawaii",
        width: { mobile: 24, desktop: 28 },
        height: { mobile: 24, desktop: 28 },
      },
      percentage: 6,
    },
    {
      component: Step2SingleOrDouble,
      infoBanner: {
        icon: vector57,
        hoverIcon: doorHalf,
        text: "Choose the right opening for a clean, balanced entry",
        width: { mobile: 24, desktop: 28 },
        height: { mobile: 24, desktop: 28 },
      },
      percentage: 13,
    },
    {
      component: Step3DoorSize,
      infoBanner: {
        icon: vector56,
        hoverIcon: holeBigDoor,
        text: "Built to fit: fully custom door sizes",
        width: { mobile: 24, desktop: 25 },
        height: { mobile: 24, desktop: 25 },
      },
      percentage: 20,
    },
    {
      component: Step4,
      infoBanner: {
        icon: vector99,
        hoverIcon: buildDoorHalf,
        text: "Confirm wall status to lock accurate sizing",
        width: { mobile: 24, desktop: 26 },
        height: { mobile: 24, desktop: 26 },
      },
      percentage: 26,
    },
    {
      component: Step5,
      infoBanner: {
        icon: vector98,
        hoverIcon: brick,
        text: "Select wall thickness to ensure a precise fit and clean installation.",
        width: { mobile: 24, desktop: 24 },
        height: { mobile: 24, desktop: 24 },
      },
      percentage: 33,
    },
    {
      component: Step6,
      infoBanner: {
        icon: vector44,
        hoverIcon: seetings,
        text: "Perfect swing: choose your handing and hinges",
        width: { mobile: 24, desktop: 24 },
        height: { mobile: 24, desktop: 24 },
      },
      percentage: 40,
    },
    {
      component: Step7,
      infoBanner: {
        icon: vector88,
        hoverIcon: zzaaa,
        text: "Choose louver option to control airflow",
        width: { mobile: 24, desktop: 25 },
        height: { mobile: 24, desktop: 25 },
      },
      percentage: 46,
    },
    {
      component: Step8,
      infoBanner: {
        icon: lock,
        hoverIcon: builderLock,
        text: "Lock-ready doors for your preferred hardware",
        width: { mobile: 23, desktop: 25 },
        height: { mobile: 23, desktop: 25 },
      },
      percentage: 53,
    },
    {
      component: Step9,
      infoBanner: {
        icon: vector33,
        hoverIcon: builderVector5,
        text: "Custom jambs for a ready-to-install package",
        width: { mobile: 24, desktop: 24 },
        height: { mobile: 24, desktop: 24 },
      },
      percentage: 60,
    },
    {
      component: Step10,
      infoBanner: {
        icon: vector20,
        hoverIcon: doorPwoli,
        text: "Select door handing to ensure correct swing and smooth daily use",
        width: { mobile: 24, desktop: 27 },
        height: { mobile: 24, desktop: 27 },
      },
      percentage: 66,
    },
    {
      component: Step11,
      infoBanner: {
        icon: vector21,
        hoverIcon: shields,
        text: "Choose protection options to keep the door safe",
        width: { mobile: 24, desktop: 26 },
        height: { mobile: 24, desktop: 26 },
      },
      percentage: 73,
    },
    {
      component: Step12,
      infoBanner: {
        icon: vector33,
        hoverIcon: builderVector5,
        text: "Add upgrades to match perfomance, hardware",
        width: { mobile: 24, desktop: 24 },
        height: { mobile: 24, desktop: 24 },
      },
      percentage: 80,
    },
    {
      component: Step13,
      infoBanner: {
        icon: vector22,
        hoverIcon: builderPaint,
        text: "Tell us your finish, we'll handle the rest",
        width: { mobile: 24, desktop: 24 },
        height: { mobile: 24, desktop: 24 },
      },
      percentage: 86,
    },
    {
      component: Step14,
      infoBanner: {
        icon: vector23,
        hoverIcon: builderDocument,
        text: "One last step: add your deatils",
        width: { mobile: 24, desktop: 24 },
        height: { mobile: 24, desktop: 24 },
      },
      percentage: 93,
    },
    {
      component: Step15,
      infoBanner: {
        icon: vector24,
        hoverIcon: builderTick,
        text: "Review, submit, and download your specs",
        width: { mobile: 24, desktop: 24 },
        height: { mobile: 24, desktop: 24 },
      },
      percentage: 100,
    },
  ];

  const CurrentStepComponent = steps[currentStep].component;

  const handleNext = async (doorType?: string, doorConfig?: string, productCategory?: string) => {
    if (productCategory !== undefined && typeof productCategory === "string") {
      setQuoteData((prev) => ({ ...prev, productCategory }));
    }
    if (doorType !== undefined && typeof doorType === "string") {
      setQuoteData((prev) => ({ ...prev, doorType }));
    }
    if (doorConfig !== undefined && typeof doorConfig === "string") {
      setQuoteData((prev) => ({ ...prev, doorConfig, category: doorConfig }));
    }

    const currentProductCategory = productCategory ?? quoteData.productCategory;
    if (currentStep === 0 && !currentProductCategory) {
      return;
    }

    const currentDoorType =
      doorType !== undefined && typeof doorType === "string"
        ? doorType
        : quoteData.doorType;
    if (currentStep === 1 && !currentDoorType) {
      return;
    }

    const currentDoorConfig =
      doorConfig !== undefined && typeof doorConfig === "string"
        ? doorConfig
        : quoteData.doorConfig;
    if (currentStep === 2 && !currentDoorConfig) {
      return;
    }

    if (currentStep === 3 && (!quoteData.width || !quoteData.height)) {
      return;
    }

    if (currentStep === 4 && !quoteData.wallBuilt) {
      return;
    }

    if (
      currentStep === 5 &&
      !quoteData.wallThickness &&
      !quoteData.customDiameter
    ) {
      return;
    }

    if (
      currentStep === 6 &&
      (!quoteData.doorHandling ||
        !quoteData.hingeRadius ||
        !quoteData.hingeType)
    ) {
      return;
    }

    if (currentStep === 7 && !quoteData.louver) {
      return;
    }

    if (
      currentStep === 8 &&
      (!Array.isArray(quoteData.lockType) || quoteData.lockType.length === 0 ||
        !quoteData.lockBoreDiameter ||
        !quoteData.lockBackset ||
        !quoteData.lockCenterline ||
        !quoteData.faceplateDimension ||
        !quoteData.faceplateRadius ||
        !quoteData.driveInDiameter ||
        !quoteData.latchBoreDiameter)
    ) {
      return;
    }

    if (currentStep === 9) {
      if (quoteData.needsJambPreHanging === null) return;
      if (
        quoteData.needsJambPreHanging === "yes" &&
        (!quoteData.jambType ||
          !quoteData.jambSize ||
          !quoteData.dbStrikeType ||
          !quoteData.lockStrikeType ||
          !quoteData.weatherstripping ||
          !quoteData.thresholdType)
      )
        return;
    }

    if (currentStep === 10 && !quoteData.hangDoorOption) {
      return;
    }

    if (currentStep === 11 && !quoteData.protectDoorOption) {
      return;
    }

    if (currentStep === 12 && !quoteData.addOnOption) {
      return;
    }

    if (
      currentStep === 13 &&
      (!quoteData.doorFinishOption || !quoteData.doorCategory)
    ) {
      return;
    }

    if (
      currentStep === 14 &&
      (!quoteData.firstName ||
        !quoteData.companyName ||
        !quoteData.phone ||
        !quoteData.email ||
        !isValidEmail(quoteData.email))
    ) {
      return;
    }

    if (currentStep === 15) {
      setIsSubmitting(true);

      // Convert uploaded files to base64 if they are File objects
      const convertFileToBase64 = (
        file: File,
      ): Promise<{ name: string; base64: string; type: string }> => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            const base64String = (reader.result as string).split(",")[1]; // Remove data:type;base64, prefix
            resolve({
              name: file.name,
              base64: base64String,
              type: file.type || "application/octet-stream",
            });
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      };

      // Send quote submission email
      try {
        // Prepare uploaded files as base64
        let uploadedFilesBase64: {
          name: string;
          base64: string;
          type: string;
        }[] = [];
        if (
          quoteData.uploadedFiles &&
          Array.isArray(quoteData.uploadedFiles) &&
          quoteData.uploadedFiles.length > 0
        ) {
          // Check if files are File objects or already base64
          const filePromises = quoteData.uploadedFiles
            .map((file: any) => {
              if (file instanceof File) {
                return convertFileToBase64(file);
              } else if (file && typeof file === "object" && file.base64) {
                // Already converted to base64 format
                return Promise.resolve(file);
              }
              return null;
            })
            .filter(Boolean);

          uploadedFilesBase64 = await Promise.all(filePromises);
        }

        // Prepare quote data without File objects
        const quoteDataToSend = {
          ...quoteData,
          uploadedFiles: undefined, // Remove File objects, we'll send base64 separately
        };

        const response = await fetch("/api/quote/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            quoteData: quoteDataToSend,
            uploadedFiles: uploadedFilesBase64,
          }),
        });

        const result = await response.json();

        if (result.success) {
          message.success("Successfully submitted your quote! ");
        } else {
          message.warning(
            "Quote submitted, but email could not be sent. Please contact us directly.",
          );
        }
      } catch (error) {
        console.error("Error submitting quote:", error);
        message.warning(
          "Quote submitted, but email could not be sent. Please contact us directly.",
        );
      } finally {
        setIsSubmitting(false);
      }

      // Navigate to home page after showing success message
      setTimeout(() => {
        router.push("/build");
      }, 1500);
      return;
    }

    if (currentStep < steps.length - 1) {
      if (currentStep === 3) {
        setQuoteData((prev) => ({
          ...prev,
          thickness: prev.thickness || '1 3/8"',
        }));
      }

      setCurrentStep(currentStep + 1);
    }
    // Prevent going back from step 1
    // Prevent going back from step 1
  };

  const handleBack = () => {
    if (currentStep === 0) {
      router.back();
      return;
    }

    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setQuoteData({
      productCategory: "",
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
      lockType: [] as string[],
      lockBoreDiameter: "",
      lockBackset: "",
      lockCenterline: "",
      latchBoreDiameter: "",
      faceplateDimension: "",
      faceplateRadius: "",
      driveInDiameter: "",
      needsJambPreHanging: null,
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
      doorCategory: "",
      selectedDoorId: "",
      selectedDoorName: "",
      specialInstructions: "",
      uploadedFiles: [],
      firstName: "",
      companyName: "",
      phone: "+1",
      email: "",
      poNumber: "",
    });
  };

  return (
    <>
      <PageLoader isLoading={isLoading} />
      <Navbar />

      <InfoBanner
        icon={steps[currentStep].infoBanner.icon}
        hoverIcon={steps[currentStep].infoBanner.hoverIcon}
        text={steps[currentStep].infoBanner.text}
        width={steps[currentStep].infoBanner.width}
        height={steps[currentStep].infoBanner.height}
      />

      <div className="min-h-screen bg-white text-black">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-6 xl:px-12 2xl:px-[60px] md:py-8">
          <div className="max-w-[1400px] 2xl:mx-auto">
            <div className="flex flex-col lg:flex-row gap-0 overflow-x-hidden">
              {/* Main Content Area */}
              <div className="flex-1 min-w-0 w-full">
                <StepContainer>
                  <StepNavigation
                    onBack={handleBack}
                    onNext={() => handleNext()}
                    showBack={true}
                    percentage={steps[currentStep].percentage}
                    isFirstStep={false}
                    currentStep={currentStep}
                    isSubmitting={isSubmitting}
                    isNextDisabled={
                      (currentStep === 0 && !quoteData.productCategory) ||
                      (currentStep === 1 && !quoteData.doorType) ||
                      (currentStep === 2 && !quoteData.doorConfig) ||
                      (currentStep === 3 &&
                        (!quoteData.width || !quoteData.height)) ||
                      (currentStep === 4 && !quoteData.wallBuilt) ||
                      (currentStep === 5 &&
                        !quoteData.wallThickness &&
                        !quoteData.customDiameter) ||
                      (currentStep === 6 &&
                        (!quoteData.doorHandling ||
                          !quoteData.hingeRadius ||
                          !quoteData.hingeType)) ||
                      (currentStep === 7 && !quoteData.louver) ||
                      (currentStep === 8 &&
                        (!Array.isArray(quoteData.lockType) || quoteData.lockType.length === 0 ||
                          !quoteData.lockBoreDiameter ||
                          !quoteData.lockBackset ||
                          !quoteData.lockCenterline ||
                          !quoteData.faceplateDimension ||
                          !quoteData.faceplateRadius ||
                          !quoteData.driveInDiameter ||
                          !quoteData.latchBoreDiameter)) ||
                      (currentStep === 9 &&
                        (quoteData.needsJambPreHanging === null ||
                          (quoteData.needsJambPreHanging === "yes" &&
                            (!quoteData.jambType ||
                              !quoteData.jambSize ||
                              !quoteData.dbStrikeType ||
                              !quoteData.lockStrikeType ||
                              !quoteData.weatherstripping ||
                              !quoteData.thresholdType)))) ||
                      (currentStep === 10 && !quoteData.hangDoorOption) ||
                      (currentStep === 11 && !quoteData.protectDoorOption) ||
                      (currentStep === 12 && !quoteData.addOnOption) ||
                      (currentStep === 13 &&
                        (!quoteData.doorFinishOption ||
                          !quoteData.doorCategory)) ||
                      (currentStep === 14 &&
                        (!quoteData.firstName ||
                          !quoteData.companyName ||
                          !quoteData.phone ||
                          !quoteData.email ||
                          !isValidEmail(quoteData.email)))
                    }
                  />

                  <CurrentStepComponent
                    quoteData={quoteData}
                    setQuoteData={setQuoteData}
                    onNext={
                      currentStep === 0
                        ? (productCategory?: string) =>
                            handleNext(undefined, undefined, productCategory)
                        : currentStep === 1
                          ? (doorType?: string) => handleNext(doorType)
                          : currentStep === 2
                            ? (doorConfig?: string) =>
                                handleNext(undefined, doorConfig)
                            : currentStep === 4
                            ? () =>
                                setCurrentStep((prev) =>
                                  prev < steps.length - 1 ? prev + 1 : prev,
                                )
                            : currentStep === 5
                              ? () =>
                                  setCurrentStep((prev) =>
                                    prev < steps.length - 1 ? prev + 1 : prev,
                                  )
                              : currentStep === 6
                                ? () =>
                                    setCurrentStep((prev) =>
                                      prev < steps.length - 1 ? prev + 1 : prev,
                                    )
                                : currentStep === 7
                                  ? () =>
                                      setCurrentStep((prev) =>
                                        prev < steps.length - 1
                                          ? prev + 1
                                          : prev,
                                      )
                                  : currentStep === 8
                                    ? () =>
                                        setCurrentStep((prev) =>
                                          prev < steps.length - 1
                                            ? prev + 1
                                            : prev,
                                        )
                                    : currentStep === 9
                                      ? () =>
                                          setCurrentStep((prev) =>
                                            prev < steps.length - 1
                                              ? prev + 1
                                              : prev,
                                          )
                                      : currentStep === 10
                                        ? () =>
                                            setCurrentStep((prev) =>
                                              prev < steps.length - 1
                                                ? prev + 1
                                                : prev,
                                            )
                                        : currentStep === 11
                                          ? () =>
                                              setCurrentStep((prev) =>
                                                prev < steps.length - 1
                                                  ? prev + 1
                                                  : prev,
                                              )
                                          : currentStep === 12
                                            ? () =>
                                                setCurrentStep((prev) =>
                                                  prev < steps.length - 1
                                                    ? prev + 1
                                                    : prev,
                                                )
                                            : currentStep === 13
                                              ? () =>
                                                  setCurrentStep((prev) =>
                                                    prev < steps.length - 1
                                                      ? prev + 1
                                                      : prev,
                                                  )
                                              : currentStep === 14
                                                ? () =>
                                                    setCurrentStep((prev) =>
                                                      prev < steps.length - 1
                                                        ? prev + 1
                                                        : prev,
                                                    )
                                                : undefined
                    }
                  />
                </StepContainer>
              </div>

              {/* Quote Summary Sidebar - Hidden on Step 15 */}
              {currentStep !== 15 && (
                <QuoteSummary
                  quoteData={quoteData}
                  currentStep={currentStep}
                  onRestart={handleRestart}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default BuildDoor;
