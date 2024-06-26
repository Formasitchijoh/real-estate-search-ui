import React from 'react'
import Button from './button'
import Image from 'next/image'

const TestimonialCard = ({name, role, image}:{name:string, role:string, image:string}) => {
  return (
    <div className="flex flex-col gap-8 font-serif w-[18rem] lg:w-[23rem] mx-auto justify-start items-start py-8 px-8 rounded-2xl shadow-lg border-[0.1px] border-[#a4a8ae]">
        <div className='flex justify-center items-center'>
            {
                [1,2,3,4,5].map((star, index) =>(
                    <Image src={'/star.png'} key={index} alt='start' width={20} height={18.89}/>

                ))
            }
        </div>
    <p className="text-lg lg:text-xl inline-block">
    Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatu
    </p>
    <div className='flex flex-row justify-center items-center gap-4'>
    <Image src={image} alt='testimonial' width={56} height={56}/>
    <ul className=''>
        <li className='text-md font-semibold'>{name}</li>
        <li className='text-md text-[#7D8BA2]'>{role}</li>
    </ul>

    </div>
    
  </div>
  )
}

export default TestimonialCard