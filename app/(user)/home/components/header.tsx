import React from "react";

interface HeadingProps {
  heading: string;
  subheading?: string;
  className?: string;
}

const Heading: React.FC<HeadingProps> = ({ heading, subheading, className = "" }) => {
  return (
<div
  className={`
    ${className}
 
   
    flex
    flex-col
    font-roboto
  `}
>
      <h1 className="text-[23px] md:text-[46px] font-medium text-black font-roboto">
        {heading}
      </h1>

      {subheading && (
        <p className="text-sm md:text-[18px] font-[400] text-[#3B3B3B] font-montserrat max-w-xl">
          {subheading}
        </p>
      )}
    </div>
  );
};

export default Heading;
