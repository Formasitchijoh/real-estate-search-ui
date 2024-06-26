import React from "react";
import Button from "./button";
import Image from "next/image";

const PropertyCard = ({ image }: { image?: string }) => {
  return (
    <div className=" shadow-lg rounded-b-2xl ">
      <div
        className={`bg-no-repeat bg-cover rounded-t-2xl`}
        style={{
          backgroundImage: `url('${image}')`,
        }}
      >
        <div className="bg-white bg-opacity-10 h-[18rem] w-full flex justify-start items-start px-8 py-4">
          <Button text="RENT" propertyStatus primary />
        </div>
      </div>
      <div className="px-6 py-4 ">
        <h3 className="text-2xl font-medium">Meadowbrook</h3>
        <span className="text-xl text-[#5138ED] py-3 inline-block font-medium ">
          $10,200,000
        </span>
        <div className="flex place-items-center pt-2 pb-3 gap-4">
          <Image src={"/location.png"} alt="location" width={16} height={20} />
          <p className="text-[#7D8BA2] text-xs md:text-md font-medium">
            30E MEADOWBROOK DRIVE, MONTECITO,CA
          </p>
        </div>
        <div className="w-full flex justify-between items-center py-3 border-t-2">
          <div className="flex place-items-center pt-2 gap-2">
            <Image src={"/bed.png"} alt="location" width={24} height={24} />
            <p className="text-[#7D8BA2] text-xs font-medium">5 Beds</p>
          </div>
          <div className="flex place-items-center pt-2 gap-2">
            <Image src={"/bath.png"} alt="location" width={24} height={24} />
            <p className="text-[#7D8BA2] text-xs font-medium">6 Baths</p>
          </div>
          <div className="flex place-items-center pt-2 gap-2">
            <Image src={"/square.png"} alt="location" width={24} height={24} />
            <p className="text-[#7D8BA2] text-xs font-medium">7,143 Sq.Ft</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
