import React from 'react'
import Button from './button'
import Heading from './heading'
import PropertyCard from './propertyCard'
import { images } from '../lib/data'
const Properties = () => {
    console.log(images);
    
  return (
    <div className='w-[100vw] mx-auto py-10 md:py-16 xl:py-20 flex flex-col justify-center items-center'>
        <Button secondary text='Properties' className=' mb-4 xl:mb-6'/>
        <h2 className="text-2xl md:text-4xl lg:text-5xl text-black font-medium tracking-tight leading-snug">
        Villas in your favorite area  </h2>

        <div className='grid w-[100%] sm:w-[90%] md:grid-cols-2 px-4 md:px-0 lg:grid-cols-3 py-16 gap-6'>
           {
            images.map((image,index) =>(
                <PropertyCard key={index} image={image}/>
            ))
           }
        </div>
        <div className="flex w-full gap-3 justify-center items-center">
            <Button quatenary text="Explore Properties" />
            <Button icon text="Contact Agent" />
          </div>
    </div>
  )
}
 
export default Properties