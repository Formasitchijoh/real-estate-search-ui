import React from "react";
import { colors } from "../color";
import { cn } from "../lib/utils";
import ChevronIcon from "../icons/ChevronIcon";
const Button = ({
  primary,
  tetiary,
  secondary,
  quatenary,
  icon,
  text,
  ishow,
  className,
  propertyStatus,
}: {
  primary?: boolean;
  secondary?: boolean;
  tetiary?: boolean;
  quatenary?:boolean;
  icon?:boolean;
  ishow?:boolean;
  className?:string;
  propertyStatus?:boolean;
  text:string

}) => {
  return (
    <button
      className={cn( ` text-sm sm:text-md font-medium font-serif text-black ${className}`,
        ishow && 'hidden',
        primary && `px-3 py-2  lg:py-3 lg:px-4  rounded-xl  bg-[#5138ED] text-white ${propertyStatus ? 'lg:py-2 lg:px-4' : ''}`,
        secondary && "bg-[#EDEDFA] font-bold rounded-3xl px-4 py-2 ",
        tetiary && 'border-2 px-3 py-2 md:text-black lg:py-3 lg:px-4 text-white border-[#7D8BA2] rounded-xl',
        quatenary && 'bg-[#F7F7FD] rounded-xl px-3 py-2  lg:py-3 lg:px-6 ',
        icon && ' flex gap-3 font-light justify-center items-center px-3 py-2  lg:py-3 lg:px-6 ',
        propertyStatus && 'px-4 py-1 rounded-3xl'
      )}
    >
      <span className={cn(icon && 'inline-block')}>{text}</span>
      {icon && <ChevronIcon/>}
    </button>
  );
};

export default Button;
