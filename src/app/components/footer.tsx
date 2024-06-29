'use client'
import React from 'react'
import Button from './button'
import Logo from './logo'
import EmailIcon from '../icons/EmailIcon'
import XIcon from '../icons/XIcon'
import LinkedInIcon from '../icons/LinkedInIcon'
import FacebookIcon from '../icons/FacebookIcon'

const Footer = () => {
  return (
   <div className='w-[100vw] px-4 xl:px-32 mx-auto bg-[#F7F7FD]'>
     <div className='py-16 w-full gap-2 grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 '>
        <ul className='md:flex hidden flex-col w-full place-items-center md:place-items-start'>
            <Logo/>
        </ul>
        <ul className='flex flex-col w-full place-items-start md:place-items-center gap-2 text-sm font-serif font-normal text-[#7D8BA2]'>
            <li className='text-md font-semibold text-black'>Pages</li>
            <li>Home</li>
            <li>About</li>
            <li>Agents</li>
            <li>Properties</li>
        </ul>
        <ul className='flex  flex-col gap-2 text-sm font-serif font-normal text-[#7D8BA2]'>
            <li className='text-md font-semibold text-black'>Contact Us</li>
            <li >Phone: (615) 208-5600</li>
            <li>Office: (615) 208-5600</li>
            <li>4783 Adams St.St. Helena, CA 94873</li>
            <li>Properties</li>
        </ul>
        <ul className='flex flex-col gap-2 col-span-2 w-full font-normal text-md'>
            <li className='text-md font-semibold'>Subscribe</li>
            <li>Join our newsletter to stay up to date on features and releases.</li>
            <li className='flex py-4 gap-2 w-full'>
                <input type="text" placeholder='Enter your email' className='border-[0.1px] border-[#7D8BA2] rounded-md h-10 w-3/4 p-4' />
                <Button primary text='Subscribe'/>
            </li>
            <li className='text-xs font-serif font-normal text-[#7D8BA2]'>By subscribing you agree to with our Privacy Policy and provide consent to receive updates from our company.</li>
        </ul>
        </div>
        <hr className='pt-2' />
           <div className='w-full flex flex-col md:flex-row justify-between items-center'>
           <ul className='flex flex-wrap gap-2 md:gap-6 py-8 text-xs md:text-sm text-[#7D8BA2]'>
                <li className=' px-10 sm:px-16 md:px-0'>© 2023 Relume. All rights reserved.</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Cookies Settings</li>
            </ul>
            <ul className='flex gap-6 '>
                <EmailIcon/>
                <XIcon/>
                <LinkedInIcon/>
                <FacebookIcon/>
            </ul>
           </div>
    </div>
  )
}

export default Footer