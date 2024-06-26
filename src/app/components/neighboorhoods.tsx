import React from "react";
import HowItWorksCard from "./howItWorksCard";
import NeighboorhoodCard from "./neighboorhoodCard";
import Button from "./button";

const Neighboorhoods = () => {
  return (
    <div className="w-[100vw] mx-auto py-10 md:py-16 px-2 bg-[#e1e1f1] xl:p-20 flex flex-col justify-center items-center">
      <h2 className="text-4xl lg:text-5xl text-black font-bold tracking-tight leading-snug">
        Neighborhoods{" "}
      </h2>

      <p className=" text-sm w-[80%] sm:w-[60%] lg:w-[50%] md:text-md lg:text-lg text-center inline-block pt-6 text-black font-normal">
        Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
        sint. Velit officia consequat duis .{" "}
      </p>

      <div className="grid w-[100%] sm:w-[85%] md:w-[80%] lg:w-[80%] justify-center items-center  sm:grid-cols-2 md:px-0 xl:grid-cols-3 py-20 gap-8">
        <NeighboorhoodCard text="Los Angeles, CA" />
        <NeighboorhoodCard text="San Diego, SD" />
        <NeighboorhoodCard text="New York, NY" />
        <NeighboorhoodCard text="Las Vegas , LV " />
        <NeighboorhoodCard text="Miami, FL" />
        <NeighboorhoodCard text="San Francisco, SF" />
      </div>
      <div className="flex gap-3 justify-center items-center">
            <Button quatenary text="Explore Properties" />
            <Button icon text="Contact Agent" />
          </div>
    </div>
  );
};

export default Neighboorhoods;
