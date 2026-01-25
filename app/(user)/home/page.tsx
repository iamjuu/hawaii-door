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
import DeliveredLorry from "./components/DeliveredLorry";
import DoorCategoryBox from "./components/DoorCategoryBox";
import GalleryBox from "./components/GalleryBox";
import MeasureBox from "./components/MeasureBox";

export default function Home() {
  return (
    <>
    <Navbar />
    <BannerSection />
    <Box />
    <div className="py-[50px]">
    <StepsDoor />
    </div>
    <DeliveredLorry />
    <div className="py-[50px]">

    <DoorCategories />

</div>
    <DoorCategoryBox />
      <div className="py-[50px]">
    <Gallerysection />
    </div>
    <GalleryBox />
    <div className="py-[50px]">
    <Measure />
    </div>
    <MeasureBox />
    <div className="py-[50px]">
    <Testimonial />
    </div>
    <div className="py-[50px]">
    <Prehung />
    </div>
    <Footer />
    
    </>
  );
}
