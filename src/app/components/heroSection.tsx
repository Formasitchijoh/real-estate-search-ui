import React from 'react'
import { menuLinks } from '../lib/data'
import Image from 'next/image'
import Button from './button'
import { cn } from '../lib/utils'
import { Router } from 'next/router'
import { useRouter } from 'next/navigation'
const HeroSection = () => {
    const router = useRouter()
  return (
   <div className='w-[100vw]  lg:w-100vw] lg:py-16 mt-4 mx-auto flex flex-col md:flex-row'>
     <div 
    className={cn('relative bg-no-repeat bg-cover bg-[url(/hero.jpg)] md:bg-gradient-to-br md:bg-opacity-0 md:w-1/2 xl:pl-16')}
    >
        <div className='bg-white py-16 md:py-4 lg:py-8 xl:py-16 bg-opacity-0'>
            <div className='flex flex-col justify-center items-start p-2 gap-8 md:gap-4 lg:gap-8'>
                <Button text="Find your dream Home" secondary={true}/>
                <h2 className='text-5xl md:text-4xl lg:text-5xl xl:text-7xl 2xl:text-8xl text-white md:text-black font-medium tracking-tight leading-tight'>
                Let’s find a Villa that is perfect for you
                </h2>
                <p className='text-lg text-white md:text-black font-medium'>finding the perfect property for your next home</p>
            </div>
            <div className='flex px-2 gap-4 mt-8 md:mt-6'>
                <Button text="View Properties" onClick={() => router.push('/properties')} primary={true}/>
                <Button text="Contact Us" tetiary={true}/>
            </div>

        </div>
    </div>
    <div className='hidden md:block w-1/2'>
    <Image src={'/img1.jpg'} alt='hero image' width={1020} height={540}/>

    </div>
   </div>
  )
}

export default HeroSection