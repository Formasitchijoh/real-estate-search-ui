import React from "react";
import Button from "./button";
import Image from "next/image";
import Heading from "./heading";
import Logo from "./logo";

const AboutSection = () => {
  return (
   <div className="w-[100vw] mx-auto py-10 md:py-16 xl:p-20 flex flex-col px-2 md:flex-row justify-center md:gap-10 items-center">
     <div className="flex font-serif w-full md:w-1/2 md:place-items-start  flex-col md:gap-8 place-items-center px-2 py-16">
     <Button className="hidden md:block" text="team" secondary />
    <Heading text="About Us"/>
      <div className="bg-[url(/about.png)] md:bg-gradient-to-br md:bg-opacity-0 relative bg-no-repeat bg-cover rounded-2xl">
        <div className="flex bg-white bg-opacity-0  py-20 md:py-0 flex-col md:place-items-start justify-center items-center gap-8">
          <Button className="block md:hidden" text="team" secondary />
            <p className="lg:text-lg text-md px-2 lg:pr-20 text-center md:text-left text-white md:text-black font-normal">
             <Logo/> represents a special connection between the
              people and places within the Santa Barbara region through highly
              trained and cultivated agents, and a focused mission on serving
              the community now and into the future.
            </p>
          <div className="flex gap-3 justify-center items-center">
            <Button quatenary text="Read More" />
            <Button icon text="Contact Agent" />
          </div>
        </div>
        </div>
      </div>
      <div className='hidden md:block w-1/2'>
    <Image src={'/about.png'} alt='hero image' width={1062} height={582} className="contain aspect-square"/>

    </div>
   </div>
  );
};

export default AboutSection;
