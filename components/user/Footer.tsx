import Image from "next/image";
import Footerimg from "../../public/assets/footer/footerimg 8.56.53 PM.png";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12 px-6 md:px-12 lg:px-20">
      {/* Container */}
      <div className="w-full md:max-w-7xl md:mx-auto">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
          
          {/* Logo + Description */}
          <div className="flex flex-col space-y-4">
            <div className="relative w-48 h-24">
              <Image
                src={Footerimg}
                alt="Hawaii Western Doors Logo"
                fill
                className="object-contain object-left"
              />
            </div>

            <p className="text-gray-300 text-sm leading-relaxed max-w-xs">
              The Island Door Company. Machined in Hawaii, crafted to fit,
              delivered to every island.
            </p>
          </div>

          {/* Links Section */}
          <div className="flex flex-col sm:flex-row gap-10 sm:gap-16 md:justify-between">
            
            {/* Explore Doors */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Explore Doors</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">
                    Find a Door
                  </a>
                </li>
                <li>
                  <a href="/career" className="text-gray-300 hover:text-white transition-colors text-sm">
                    Career
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">
                    Gallery
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            {/* Products */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Products</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">
                    Fibreglass Door (FG 1 3/4")
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">
                    Hollow Core Doors (HC 1 3/8")
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">
                    Particle Core Doors
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">
                    Solid Core Laminated Construction (SCLC)
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">
                    Wood Core Doors
                  </a>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
          <p>
            &copy; {new Date().getFullYear()} Hawaii Western Doors. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
