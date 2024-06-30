import React, { useEffect, useState } from 'react'
import ListingCard from './listingCard'
const Listings = () => {
    const [listings, setlistings] = useState<Array<any>>()
    
   useEffect(() =>{

    fetch('http://127.0.0.1:8000/api/listings/list',{
        method:"GET"
    }).then((response) => response.json())
    .then((result) =>{
        setlistings(result)
    })
   },[])
   
  return (
    <div>
        <ul className='grid grid-cols-2 asp w-[100vh]'>
        {
            (listings) &&
            listings?.slice(0,10)?.map((listing, index) =>(
                <ListingCard
                key={listing.id}
                image={listing.image}
                title={listing.title}
                listing_type={listing.listing_type}
                bedroom={listing.bedroom}
                bathrooms={listing.bathrooms}
                price={listing.price}
                location={listing.location}
                />
            ))
        }
        </ul>
    </div>
  )
}
export default Listings