import React, { use, useEffect, useState } from "react";
import Button from './button'
import Heading from './heading'
import PropertyCard from './propertyCard'
import { images } from '../lib/data'
import Link from "next/link";
const Properties = () => {
  const [listings, setlistings] = useState<Array<any>>();
  const [scores, setScores] = useState<Array<any>>();
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState(false)
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [newRecommendation, setNewRecommendation] = useState(false)


    //get users recommendation as per this property
  //console.log(listings);
  useEffect(() => {
    const user = localStorage.getItem("user");
    console.log(`i am testing the users\n\n`, user);
    
    if(user){
      const { id, token, username, role } = JSON.parse(user as unknown as string);
      console.log(id, token, username, role);
      fetch(`http://127.0.0.1:8000/api/recommendations/user/?user_id=${id}`, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((result) => {
          // console.log(result);
          setlistings(result.Listings);
          console.log(result.Listing);
        });
    }else{
      try {
        fetch(`http://127.0.0.1:8000/api/listings/list/?page=${currentPage}`,{
           method: "GET",
         }).then((response ) => response.json()
         .then((result) =>
           {
             setlistings(result.results);
             console.log(result.results);
             console.log(result.length);
             
             setTotalPages(Math.ceil(result.count / result.results.length));
           }
         ))
        
       } catch (error) {
         console.error('Error fetching listings:', error);
       }
    }
  }, [currentPage,newRecommendation]);

  return (
    <div className='w-[100vw] mx-auto py-10 md:py-16 xl:py-20 flex flex-col justify-center items-center'>
        <Button secondary text='Properties' className=' mb-4 xl:mb-6'/>
        <h2 className="text-2xl md:text-4xl lg:text-5xl text-black font-medium tracking-tight leading-snug">
        Villas in your favorite area  </h2>

        <div className='grid w-[100%] sm:w-[90%] md:grid-cols-2 px-4 md:px-0 lg:grid-cols-3 py-16 gap-6'>
        {listings &&
          listings?.slice(0, 6)?.map((listing, index) => (
            <Link key={index} href={`/properties/${listing.listing ? listing.listing : listing.id}`}>
              <PropertyCard
                image={ listing.images ? listing.images[0] : listing.listing_image[0]?.image}
                title={listing.title}
                bedrooms={listing.bedroom}
                bathrooms={listing.bathrooms}
                price={listing.price}
                location={`${listing.town}, ${listing.location} `}
                reactions={listing.reactions}
              />
            </Link>
          ))}
        </div>
        <div className="flex w-full gap-3 justify-center items-center">
            <Button quatenary text="Explore Properties" />
            <Button icon text="Contact Agent" />
          </div>
    </div>
  )
}
 
export default Properties