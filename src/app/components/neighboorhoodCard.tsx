import image from "next/image";
import React from "react";
import Button from "./button";
const NeighboorhoodCard = ({ text }: { text: string }) => {
  return (
    <div className="flex flex-col w-[18rem] lg:w-[23rem] mx-auto justify-start items-start py-8 pl-8 rounded-2xl shadow-lg border-[0.1px] border-[#a4a8ae]">
      <h4 className=" ml-5 text-sm lg:text-xl font-bold inline-block">{text}</h4>
      <span>
        {" "}
        <Button text="View Properties" icon />
      </span>
    </div>
  );
};

export default NeighboorhoodCard;
