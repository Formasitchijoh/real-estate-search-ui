'use client'
import React, { useEffect, useState } from 'react'
import ListingCard from '../components/listingCard'
const Search = () => {
    const [listings, setlistings] = useState<Array<any>>()
    const [scores, setScores] = useState<Array<any>>()
    const [query, setQuery] = useState('')
    
    useEffect(() =>{
     fetch('http://127.0.0.1:8000/api/listings/search?query=house in buea',{
         method:"GET"
     }).then((response) => response.json())
     .then((result) =>{
        // console.log(result);
         setlistings(result.Listings)
         setScores(result.Scores)
         console.log(result.Listing);
     })
    },[])
 
    const handleSearch = () =>{
        fetch(`http://127.0.0.1:8000/api/listings/search?query=${query}`,{
            method:"GET"
        }).then((response) => response.json())
        .then((result) =>{
           // console.log(result);
            setlistings(result.Listings)
            setScores(result.Scores)
            console.log(result.Listing);
        })  
    }
    console.log(listings);
  return (
    <div>
       <div className="w-[80%] mx-auto flex gap-5 justify-center items-center bg-slate-300 m-5 mb-10">
        <input type="search" onChange={(e) => setQuery(e.target.value)} className="w-full h-10 rounded-md border-gray-800 px-5" />
        <button onClick={handleSearch} className='text-white bg-sky-900 px-8 py-2 text-md rounded-md font-bold'>Search</button>
      </div>
      <p>{listings?.length}</p>
    <ul className='grid grid-cols-2 w-[80vw] mx-auto'>
        {
            (scores && listings) &&
            listings?.slice(0,10)?.map((listing, index) =>(
                <ListingCard
                key={listing.id}
                image={listing.images[1]}
                title={listing.title}
                listing_type={listing.listing_type}
                bedroom={listing.bedroom}
                bathrooms={listing.bathrooms}
                price={listing.price}
                location={listing.location}
                score={scores[index]}
                />
            ))
        }
    </ul>
</div>
)
}

export default Search