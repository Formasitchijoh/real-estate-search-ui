"use client";
import React, { use, useEffect, useState } from "react";
import Properties from "../components/propertiesSection";
import PropertyCard from "../components/propertyCard";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Link from "next/link";
import axios from "axios";
const Page = () => {
  const [listings, setlistings] = useState<Array<any>>();
  const [scores, setScores] = useState<Array<any>>();
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState(false)
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);



  const handleSearch = () => {
    localStorage.setItem('query',query)
    fetch(`http://127.0.0.1:8000/api/listings/search?query=${query}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        setlistings(result.Listings);
        setSearch(true)
        setScores(result.Scores);
        console.log(result.Listing);
      });
  };
  //console.log(listings);
  const fetchListings = async () => {
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
  };
useEffect(() => {
  fetchListings();
}, [currentPage]);


useEffect(() => {
  // Restore state from local storage on component mount
  const storedCurrentPage = localStorage.getItem('currentPage');
  const storedTotalPages = localStorage.getItem('totalPages');
  if (storedCurrentPage && storedTotalPages) {
    setCurrentPage(parseInt(storedCurrentPage));
    setTotalPages(parseInt(storedTotalPages));
  }
}, []);

useEffect(() => {
  // Save state to local storage when it changes
  localStorage.setItem('currentPage', currentPage.toString());
  localStorage.setItem('totalPages', totalPages.toString());
}, [currentPage, totalPages]);

const handlePageChange = (pageNumber:number) => {
  setCurrentPage(pageNumber);
  fetchListings()
};
  return (
    <div className="py-16">
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
        {
          listings &&
          listings?.slice(0, 10)?.map((listing, index) => (
            <Link key={index} href={`/properties/${listing.listing ? listing.listing : listing.id}`}>
              <PropertyCard
                image={search ? listing.images[0] : listing.listing_image[1]?.image}
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
    <div className="w-[100vw] flex justify-center items-center ">
      {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => handlePageChange(pageNumber)}
          disabled={currentPage === pageNumber}
          className="bg-blue-900 px-10 py-2 rounded-lg m-2 text-white"
        >
          {pageNumber}
        </button>
      ))}
    </div>
  </div>
  );
};

export default Page;
