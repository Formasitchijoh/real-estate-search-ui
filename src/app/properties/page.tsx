"use client";
import React, { useEffect, useState } from "react";
import Properties from "../components/propertiesSection";
import PropertyCard from "../components/propertyCard";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Link from "next/link";
const Page = () => {
  const [listings, setlistings] = useState<Array<any>>();
  const [scores, setScores] = useState<Array<any>>();
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/listings/search?query=house in buea", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        setlistings(result.Listings);
        setScores(result.Scores);
        console.log(result.Listing);
      });
  }, []);

  const handleSearch = () => {
    fetch(`http://127.0.0.1:8000/api/listings/search?query=${query}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        setlistings(result.Listings);
        setScores(result.Scores);
        console.log(result.Listing);
      });
  };
  console.log(listings);
  return (
    <div>
      <div className="w-[80%] mx-auto flex gap-5 justify-center items-center  m-5 my-16">
        <input
          type="search"
          onChange={(e) => setQuery(e.target.value)}
          className="w-full h-10 rounded-md border-gray-800 border-[0.1px] px-5"
        />
        <button
          onClick={handleSearch}
          className="text-white bg-[#27262c] px-8 py-2 text-md rounded-md font-bold"
        >
          Search
        </button>
      </div>
      <div className="grid w-[100%] sm:w-[90%] lg:w-[80%] mx-auto md:grid-cols-2 px-4 md:px-0 lg:grid-cols-3 pb-16 gap-6">
        {scores &&
          listings &&
          listings?.slice(0, 10)?.map((listing, index) => (
            <Link key={index} href={`/properties/${listing.id}`}>
              <PropertyCard
                image={listing.images[1]}
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
    </div>
  );
};

export default Page;
