    "use client";

    import React, { useState, useEffect } from 'react'
    import Navbar from '@/components/user/Navbar'
    import Footer from '@/components/user/Footer'
    import { interiorDoor1, ProductFootericoncheck, ProductFootericonstar } from '@/public/assets';
    import HeroSection from '../../components/herosection';
    import Image from 'next/image';

    interface Door {
      _id: string;
      name: string;
      price: number;
      category: string;
      doorType: string;
      imageUrl?: string[];
      description?: string;
      inStock?: boolean;
    }

    const InteriorWoodPage = () => {
    const [doors, setDoors] = useState<Door[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      const fetchDoors = async () => {
        try {
          setLoading(true);
          const response = await fetch('/api/doors?category=interior&limit=100');
          const data = await response.json();
          
          if (data.success) {
            setDoors(data.data || []);
          } else {
            setError(data.message || 'Failed to fetch doors');
          }
        } catch (err) {
          setError('Error loading doors');
          console.error('Error fetching doors:', err);
        } finally {
          setLoading(false);
        }
      };

      fetchDoors();
    }, []);
    const bgImage = "/assets/product/intertior/wood-interior.svg";
    const contant = "Interior Doors";
    const para =
        "Discover interior doors; we offer a variety of door types, designs and styles. You are sure to find the perfectdoor for your project.";
    const features = [
        {
        text: "Interior doors as design features",
        iconType: ProductFootericoncheck
        },
        {
        text: "Styles that align with your space",
        iconType: ProductFootericonstar
        }
    ];

    return (
        <>
        <Navbar />
        
        <HeroSection
            contant={contant}
            bgImage={bgImage}
            para={para}
            features={features}
        />
        
    <section className='grid grid-cols-2 px-6 md:px-12 lg:px-20 py-16 md:py-24' >
    <div className="space-y-8 pr-8">
    {/* Main Title */}
    <h2 className="text-[46px] font-[500] text-black">
        Unmatched Versatility with Interior Solid Wood Doors
    </h2>

    {/* Introductory Paragraph */}
    <p className="text-[16px] font-[300] text-gray-700 leading-relaxed">
        Interior Solid Wood Doors provide the ultimate versatility in design, style, and size. Wood doors are available in a variety of wood species and glass options, allowing you to find the perfect door for your needs, whether it&apos;s a standard design or a custom, one-of-a-kind creation.
    </p>

    {/* Key Benefits Section */}
    <div className="space-y-4">
        <h3 className="text-[22px] font-[500] text-black uppercase">
        KEY BENEFITS OF OUR WOOD DOORS:
        </h3>
        <ul className="space-y-3 text-gray-700">
        <li>
            <span className="font-bold">Diverse Styles:</span> Choose from a wide array of designs to match your interior decor.
        </li>
        <li>
            <span className="font-bold">Customizable Options:</span> Consider unique customizations to create a door that is truly your own.
        </li>
        <li>
            <span className="font-bold">Quality Craftsmanship:</span> Enjoy the superior craftsmanship that ensures durability and aesthetic appeal.
        </li>
        </ul>
    </div>

    {/* Explore Our Door Collections Section */}
    <div className="space-y-6">
        <h3 className="text-[28px] font-[500] text-black">
        Explore Our Door Collections
        </h3>

        {/* Panel Doors Subsection */}
        <div className="space-y-3">
        <h4 className="text-[22px] font-[400] text-black uppercase">
            PANEL DOORS
        </h4>
        <p className="text-[16px] font-[300] text-gray-700 leading-relaxed">
            Our panel doors are a timeless choice, offering both classic and modern designs to suit any interior space.
        </p>
        </div>

        {/* Decorative French Doors Subsection */}
        <div className="space-y-3">
        <h4 className="text-[22px] font-[400] text-black uppercase">
            DECORATIVE FRENCH DOORS
        </h4>
        <p className="text-[16px] font-[300] text-gray-700 leading-relaxed">
            Add a touch of elegance to your home with our decorative French doors, featuring intricate designs and premium privacy and textured glass options.
        </p>
        </div>
    </div>
    </div>
    <div>
        <Image src={interiorDoor1} alt="Interior Door" />
    </div>

    </section>



    <main className="px-6 md:px-12 lg:px-20 pb-16 bg-white">
        <section className="space-y-6">
            {/* Main Heading */}
            <h2 className="text-[28px] font-[500] text-black">
                In-Stock at Hawaii Western Door Products
            </h2>

            {/* First Paragraph */}
            <p className="text-[16px] font-[300] text-gray-700 leading-relaxed">
                The following product offering is part of our stocking program. We reserve the right to make changes without notice. Please contact your Hawaii Western Door Products representative to verify availability, lead time, and for more information.
            </p>

            {/* Second Paragraph */}
            <p className="text-[16px] font-[300] text-gray-700 leading-relaxed">
                Please note that our doors are delivered unfinished. The product images shown below depict finished doors. Due to the natural variations in wood, each door will have a unique appearance, and the stainability of wood species may differ. We recommend consulting with a coatings expert for recommended finishing options and instructions.
            </p>
        </section>
    </main>


<main className="px-6 md:px-12 lg:px-20 py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Left Sidebar - Navigation Menu */}
            <aside className="w-full lg:w-[280px] flex-shrink-0">
              <div className="bg-white border border-gray-200 rounded-lg p-6 lg:sticky lg:top-[100px]">
                <h2 className="text-xl font-semibold text-black mb-6">
                  Interior Wood Doors
                </h2>
                <nav className="space-y-0">
                  {[
                    "Overview",
                    "Interior Panel Doors",
                    "Bifold Doors",
                    "Primed Interior Panel Doors",
                    "Primed Bifold Doors",
                    "Louver Doors and Bifold Doors",
                    "Interior Barn Doors",
                    "Interior French Doors",
                    "Primed Interior French Doors",
                    "20-Minute Fire Doors",
                    "20-Minute Fire Doors Primed"
                  ].map((item, index) => (
                    <div key={item}>
                      <a
                        href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                        className="block py-3 text-gray-700 hover:text-[#FF6E4A] transition-colors text-sm font-medium"
                      >
                        {item}
                      </a>
                      {index < 10 && (
                        <div className="border-t border-gray-200"></div>
                      )}
                    </div>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Right Side - Main Content */}
            <div className="flex-1 space-y-8">
              {loading ? (
                <div className="text-center py-12">
                  <p className="text-gray-600">Loading doors...</p>
                </div>
              ) : error ? (
                <div className="text-center py-12">
                  <p className="text-red-600">Error: {error}</p>
                </div>
              ) : doors.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-600">No doors found.</p>
                </div>
              ) : (
                <div className="space-y-12">
                  {/* Group doors by doorType */}
                  {Array.from(new Set(doors.map(door => door.doorType))).map((doorType) => {
                    const doorsInType = doors.filter(door => door.doorType === doorType);
                    return (
                      <div key={doorType} id={doorType.toLowerCase().replace(/\s+/g, "-")} className="scroll-mt-24">
                        <h3 className="text-2xl font-semibold text-black mb-6 pb-2 border-b border-gray-200">
                          {doorType}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {doorsInType.map((door) => (
                            <div
                              key={door._id}
                              className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                            >
                              {door.imageUrl && door.imageUrl.length > 0 ? (
                                <div className="w-full h-64 bg-gray-100 overflow-hidden">
                                  {(() => {
                                    const imgSrc = door.imageUrl[0];
                                    // Check if image already has data URI prefix, if not add it
                                    const imageUrl = imgSrc.startsWith('data:image') 
                                      ? imgSrc 
                                      : `data:image/jpeg;base64,${imgSrc}`;
                                    return (
                                      // eslint-disable-next-line @next/next/no-img-element
                                      <img
                                        src={imageUrl}
                                        alt={door.name || "Door image"}
                                        className="w-full h-full object-cover"
                                      />
                                    );
                                  })()}
                                </div>
                              ) : (
                                <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                                  <span className="text-gray-400">No Image</span>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

        <Footer />
        </>
    )
    }

    export default InteriorWoodPage

