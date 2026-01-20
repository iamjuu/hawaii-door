import Footer from "@/components/user/Footer";
import Navbar from "@/components/user/Navbar";
import BannerSection from "./components/Banner";
import Box from "./components/Box";
import StepsDoor from "./components/Steps";
import DoorCategories from "./components/Doorcategories";
import Gallerysection from "./components/Gallery";
import Measure from "./components/Measure";
import Testimonial from "./components/Testimonial";
import Prehung from "./components/Prehung";

export default function Home() {
  return (
    <>
    {/* <Navbar /> */}
    <BannerSection />
    <Box />
    <StepsDoor />
    <DoorCategories />
    <Gallerysection />
    <Measure />
    <Testimonial />
    <Prehung />
    <Footer />
    
    </>
  );
}
