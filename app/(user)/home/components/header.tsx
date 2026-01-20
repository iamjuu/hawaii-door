import React from "react";

interface HeadingProps {
  heading: string;
  subheading: string;
}

const Heading: React.FC<HeadingProps> = ({ heading, subheading }) => {
  return (
    <div className="mb-10 leading-5items-center justify-center pl-5 md:pl-[60px] font-roboto flex flex-col">
      <h1 className="text-[23px] md:text-[46px] font-medium text-black font-roboto">
        {heading}
      </h1>

      <p className="text-sm md:text-[18px] font-[400] text-[#3B3B3B] font-roboto max-w-xl">
        {subheading}
      </p>
    </div>
  );
};

export default Heading;
