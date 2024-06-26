import Image from 'next/image'
import React from 'react'

const HowItWorksCard = ({text, image}:{text:string, image:string}) => {
  return (
    <div className='flex flex-col justify-center items-center'>
        <Image src={image} alt='house check' width={40} height={40}/>
        <h4 className='text-xl font-bold inline-block pt-4 pb-6'>{text}</h4>
        <p className='text-sm text-[#7D8BA2] text-center font-normal'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.
        </p>
    </div>
  )
}

export default HowItWorksCard