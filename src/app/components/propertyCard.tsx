import React from "react";
import Button from "./button";
import Image from "next/image";

const PropertyCard = ({
  image,
  title,
  price,
  location,
  bedrooms,
  bathrooms,
  reactions,
  score,
  pricepermonth,
}: {
  image?: string;
  title?: string;
  price?: number;
  location?: string;
  bedrooms?: number;
  bathrooms?: number;
  reactions?: number;
  score?: number;
  pricepermonth?: number;
}) => {
  return (
    <div className=" shadow-lg rounded-b-2xl ">
      <div
        className={`bg-no-repeat bg-cover rounded-t-2xl`}
        style={{
          backgroundImage: `url('${image}')`,
        }}
      >
        <div className="bg-white bg-opacity-10 h-[18rem] w-full flex justify-start items-start px-8 py-4">
          {/* <Button text="RENT" propertyStatus primary /> */}
        </div>
      </div>
      <div className="px-6 py-4 ">
        <h3 className="lg:text-sm xl:text-xl font-medium"> {  title?.charAt(0) == 0 ? "1" + title.slice(1) : title}</h3>
        <span className="text-xl text-[#5138ED] py-3 inline-block font-medium ">
          FCFA {price?.toString()?.length <= 3 ? price + "000" : price} /{" "}
          {pricepermonth}
        </span>
        <div className="flex place-items-center pt-2 pb-3 gap-4">
          <Image src={"/location.png"} alt="location" width={16} height={20} />
          <p className="text-[#7D8BA2] text-xs md:text-md font-medium">
            {location}
          </p>
        </div>
        <div className="w-full flex justify-between items-center py-3 border-t-2">
          <div className="flex place-items-center pt-2 gap-2">
            <Image src={"/bed.png"} alt="location" width={24} height={24} />
            <p className="text-[#7D8BA2] text-xs font-medium">
              {bedrooms} Beds
            </p>
          </div>
          <div className="flex place-items-center pt-2 gap-2">
            <Image src={"/bath.png"} alt="location" width={24} height={24} />
            <p className="text-[#7D8BA2] text-xs font-medium">
              {bathrooms} Baths
            </p>
          </div>
          <div className="flex place-items-center pt-2 gap-2">
            <Image src={"/square.png"} alt="location" width={24} height={24} />
            <p className="text-[#7D8BA2] text-xs font-medium">{reactions}</p>
          </div>
        </div>
        <p className="text-[#7D8BA2] text-xs font-medium">
          {score == 0 ? "" : score}
        </p>
      </div>
    </div>
  );
};

export default PropertyCard;
