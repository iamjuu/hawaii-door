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
      <h1 className="text-[23px] md:text-[46px] font-[500] text-black font-roboto leading-[32px] md:leading-[62px] tracking-normal">
        {heading}
      </h1>

      {subheading && (
        <p className="text-sm md:text-base font-[400] text-[#3B3B3B] font-roboto max-w-xl">
          {subheading}
        </p>
      )}
    </div>
  );
};

export default Heading;
