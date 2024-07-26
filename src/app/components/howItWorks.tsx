import React from 'react'
import { images } from '../lib/data'
import Button from './button'
import PropertyCard from './propertyCard'
import HowItWorksCard from './howItWorksCard'
const HowItWorksSection = () => {
  return (
    <div className='w-[100vw] mx-auto py-10 md:py-16 px-2 xl:p-20 flex flex-col justify-center items-center'>
    <h2 className="text-4xl lg:text-5xl text-black font-bold tracking-tight leading-snug">
    How it works </h2>

    <p className=' text-sm w-[80%] sm:w-[60%] lg:w-[50%] md:text-md lg:text-lg text-center inline-block pt-6 text-black font-normal'>
    Discover your ideal home with ease and confidence using our streamlined process.
    </p>


    <div className='grid w-[90%] justify-center items-center  sm:grid-cols-2 px-4 md:px-0 lg:grid-cols-3 py-20 gap-8'>
       <HowItWorksCard image='/house.png' text='Find properties'/>
       <HowItWorksCard image='/deal.png' text='Make a deal'/>
       <HowItWorksCard image='/keys.png' text='Get your keys'/>
    </div>
</div>
  )
}

export default HowItWorksSection