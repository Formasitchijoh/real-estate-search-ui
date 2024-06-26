import React from 'react'

const Heading = ({text}:{text:string}) => {
  return (
    <h2 className="text-5xl md:text-4xl lg:text-5xl xl:text-7xl 2xl:text-8xl text-black font-medium tracking-tight leading-snug">
        {text}
  </h2>
  )
}

export default Heading