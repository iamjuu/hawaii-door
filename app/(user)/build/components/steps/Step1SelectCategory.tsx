import Image from "next/image";
import { GoChevronRight } from "react-icons/go";
import FiberDoorImage from "../../../../../public/assets/images/landing/Door4 8.02.03 PM.png"
import HollowCoreDoorImage from "../../../../../public/assets/images/dummy/door50.png"
import ParticleCoreDoorImage from "../../../../../public/assets/images/dummy/door51.png"
import SCLCDoorImage from "../../../../../public/assets/images/landing/Door3 8.02.03 PM.png"
import OtherDoorImage from "../../../../../public/assets/images/dummy/door53.png"
import WoodCoreDoorImage from "../../../../../public/assets/images/dummy/door54.png"
interface StepProps {
    quoteData: any;
    setQuoteData: (data: any) => void;
  }
  
  const Step1SelectCategory = ({ quoteData, setQuoteData }: StepProps) => {
    const doorCategories = [
      { name: "Fibre Glass Door", image: FiberDoorImage, size: "8'0\"" },
      { name: "Hollow Core Door", image: HollowCoreDoorImage, size: "8'0\"" },
      { name: "Particle Core Door", image: ParticleCoreDoorImage, size: "8'0\"" },
      { name: "Solid Core Laminated Construction (SCLC)", image:SCLCDoorImage, size: "8'0\"" },
      { name: "Wood Core Door", image:WoodCoreDoorImage, size: "8'0\"" },
      { name: "Other (Special Order)", image: OtherDoorImage, size: "8'0\"" },
      
    ];
  
    return (
      <div>
        <h2 className="text-3xl font-bold mb-8">Select Door Category</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {doorCategories.map((category) => (
            <div
              key={category.name}
              onClick={() => setQuoteData({ ...quoteData, doorType: category.name })}
              className="border rounded-lg p-3 cursor-pointer hover:border-orange-500 hover:shadow-lg transition-all"
            >
            <div className="aspect-square bg-gray-100 rounded mb-4 relative">
  <Image
    src={category.image}
    alt={category.name}
    fill
    className="object-contain rounded"
  />
</div>

              <h3 className="font-medium text-center">{category.name}</h3>
              <p className="text-sm text-gray-500 text-center mt-2 flex justify-evenly">{category.size} <GoChevronRight className="text-gray-400 text-base" /> </p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default Step1SelectCategory;