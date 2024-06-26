import React from "react";
import Image from "next/image";
const CompaniesSection = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center w-[100%] mx-auto gap-8 lg:gap-16 py-10 md:py-16 xl:p-20 px-2">
      <div>
        {" "}
        <p className="text-sm md:text-lg xl:text-2xl text-[#7D8BA2] font-medium">
          As seen on the worlds best magazines and media
        </p>
      </div>
      <div className="flex lg:place-content-end place-content-center  w-full  overflow-scroll gap-2 lg:gap-8">
        <Image src={"/google.png"} alt="google image" height={50} width={110} />
        <Image src={"/uber.png"} alt="uber image" height={50} width={110} />
        <Image src={"/ubs.png"} alt="ubs image" height={50} width={110} />
        <Image
          src={"/webflow.png"}
          alt="webflow image"
          height={80}
          width={120}
          className="hidden sm:block"
        />
      </div>
    </div>
  );
};

export default CompaniesSection;
