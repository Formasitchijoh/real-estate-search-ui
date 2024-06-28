"use client";
import React from "react";
import { cn } from "@/app/lib/utils";

const SignUp = () => (
  <div className="W-[100vw] h-[100vh] flex flex-col justify-center items-center ">
    <div className="w-[80%] h-[80vh] flex justify-center items-center rounded-2xl shadow-2xl mx-auto  md:p-8">
      <div
        className={`h-full w-full font-serif flex p-2 flex-col justify-start items-center md:w-1/2`}
      >
        <h2 className="text-2xl lg:text-2xl text-black font-medium  tracking-tight leading-snug">
          Create Your Account{" "}
        </h2>
        <p className="text-sm  text-[#7D8BA2]">start your 30 free trial</p>

        <div className="py-8">
          <div className="flex gap-2">
            
          </div>
        </div>
      </div>
      <div className="hidden md:block h-full bg-[url(/signup.png)] rounded-2xl w-1/2 bg-no-repeat bg-cover aspect-auto"></div>
    </div>
  </div>
);

export default SignUp;
