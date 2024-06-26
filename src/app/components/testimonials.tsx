import React from "react";
import TestimonialCard from "./testimonialCard";
import { testimonials } from "../lib/data";
import Button from "./button";
const Testimonials = () => {
  return (
    <div className="w-[100vw] mx-auto py-10 md:py-16 xl:py-20 flex flex-col justify-center items-center">
      <Button secondary text="Testimonials" className=" mb-4 xl:mb-6" />
      <h2 className="text-2xl md:text-4xl lg:text-5xl text-black font-medium tracking-tight leading-snug">
        What customers say{" "}
      </h2>

      <div className="grid md:grid-cols-2 md:w-[80%] xl:w-[70%] py-16 mx-auto xl:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard
            name={testimonial.name}
            key={index}
            image={testimonial.image}
            role={testimonial.role}
          />
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
