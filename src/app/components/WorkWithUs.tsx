import React from "react";
import Button from "./button";
import NeighboorhoodCard from "./neighboorhoodCard";

const WorkWithUs = () => {
  return (
    <div className="w-[100vw] mx-auto py-10 md:py-16 px-2  xl:p-20 flex flex-col justify-center items-center">
      <div className="rounded-2xl px-2 sm:px-4 sm:w-[90%] xl:px-40 md:w-[80%] flex flex-col gap-6 justify-center items-center py-[3rem] xl:py-[7rem] bg-[#5138ED]">
        <h2 className="text-4xl lg:text-5xl text-white font-bold tracking-tight leading-snug">
          Work With Us{" "}
        </h2>

        <p className=" text-sm md:text-md lg:text-lg text-center inline-block  text-white font-normal">
          We’ve been representing buyers and sellers in Santa Barbara County for
          over twenty years and we’re the top-producing independently owned real
          estate company in the area. Our devoted team of agents offers
          individualized attention, personalized service, and tailor-made
          marketing
        </p>

        <div className="flex gap-3 justify-center items-center">
          <Button quatenary text="Contact Us" />
        </div>
      </div>
    </div>
  );
};

export default WorkWithUs;
