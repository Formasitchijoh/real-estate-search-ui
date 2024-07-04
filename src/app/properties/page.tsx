"use client";
import React, { use, useEffect, useState } from "react";
import Properties from "../components/propertiesSection";
import PropertyCard from "../components/propertyCard";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Link from "next/link";
import axios from "axios";
import SearchIcon from "../icons/SearchIcon";
import AdjustMentsIcon from "../icons/AdjustMentsIcon";
import { cn } from "../lib/utils";
const Page = () => {
  const [listings, setlistings] = useState<Array<any>>();
  const [scores, setScores] = useState<Array<any>>();
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showAdvanceSearch, setShowAdvanceSearch] = useState(false);
  const [queryParams, setQueryParams] = useState({
    town:'',
    location:'',
    bedroom:null,
    bathrooms:null,
    min_price:null,
    max_price:null,
    listing_type:''
  })

 
  //console.log(listings);
  const fetchListings = async () => {
    try {
      fetch(`http://127.0.0.1:8000/api/listings/list/?page=${currentPage}`, {
        method: "GET",
      }).then((response) =>
        response.json().then((result) => {
          setlistings(result.results);
          console.log(result.results);
          console.log(result.length);

          setTotalPages(Math.ceil(result.count / result.results.length));
        })
      );
    } catch (error) {
      console.error("Error fetching listings:", error);
    }
  };
  useEffect(() => {
    fetchListings();
  }, [currentPage]);

  useEffect(() => {
    // Restore state from local storage on component mount
    const storedCurrentPage = localStorage.getItem("currentPage");
    const storedTotalPages = localStorage.getItem("totalPages");
    if (storedCurrentPage && storedTotalPages) {
      setCurrentPage(parseInt(storedCurrentPage));
      setTotalPages(parseInt(storedTotalPages));
    }
  }, []);

  useEffect(() => {
    // Save state to local storage when it changes
    localStorage.setItem("currentPage", currentPage.toString());
    localStorage.setItem("totalPages", totalPages.toString());
  }, [currentPage, totalPages]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    fetchListings();
  };

  const [suggestions, setSuggestions] = useState();
  const [searchQuery, setSearchQuery] = useState<any>();

  const fetchSuggestions = async (query: string) => {
    const response = await fetch(
      `http://127.0.0.1:8000/api/listings/listing_document/suggest/?town_suggest__completion=${query}`
    );
    const data = await response.json();
    console.log(data.town_suggest__completion[0].options);

    setSuggestions(data);
  };

  const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const query = e.target.value;
    setQuery(e.target.value);
    fetchSuggestions(query);
  };
  const handleSelectChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
    const query = e.target.value;
    setQueryParams((prev) =>({...prev,[e.target.name]:e.target.value}))
  };
  const handleListingsSearch = () => {
    localStorage.setItem("query", query);
    fetch(`http://127.0.0.1:8000/api/listings/search?query=${query}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        setlistings(result.Listings);
        setSearch(true);
        setScores(result.Scores);
        console.log(result.Listing);
      });
  };
  const handleFullSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    localStorage.setItem("query", JSON.stringify(queryParams));
    console.log("\n\n",JSON.stringify(queryParams))
    
    fetch(`http://127.0.0.1:8000/api/listings/listing_search?query=${queryParams.town}&bedroom=${queryParams.bedroom}&bathrooms=${queryParams.bathrooms}&min_price=${queryParams.min_price}&max_price=${queryParams.max_price}&listing_type=${queryParams.listing_type}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((result) => {
        setlistings(result);
        console.log(result);
      });
  };

  const selectSuggestion = (suggestion: string) => {
    setSearchQuery(suggestion);
    //fetchResults(suggestion);
  };
  return (
    <div className="pb-16">
      <div className="w-[100vw]">
        <div className="bg-[url(/banner.jpg)] w-full h-[50vh] lg:h-[40vh] bg-cover bg-no-repeat py-10 flex flex-col justify-center items-center mb-8">
          <div className="w-full lg:w-[80%] mx-auto flex gap-2 px-2 md:gap-5 justify-center items-start  md:m-5 ">
            <form
            onSubmit={handleFullSearch}
              id="search form"
              className="w-[70%] flex flex-col justify-center items-center gap-2"
            >
              <div className="h-10 md:h-12  w-full flex-grow flex justify-center items-center rounded-2xl bg-[#eee] border-gray-800 border-[0.1px] px-2 md:px-0 md:pl-5 lg:pl-5">
                <SearchIcon />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => handleInputChange(e)}
                  className="h-full w-full focus:outline-none px-2 bg-[#eee] "
                />
                <div
                  onClick={() => setShowAdvanceSearch(!showAdvanceSearch)}
                  className="h-full hidden border-gray-100 md:bg-[#27262c] md:text-white md:border-[5px] shadow-2xl rounded-2xl md:flex md:w-[40%] lg:w-[40%] xl:w-[30%] 2xl:w-[18%] justify-center items-center "
                >
                  <AdjustMentsIcon />
                  <span className="text-[10px] px-1 hidden md:block font-semibold">
                    Advanced search
                  </span>
                </div>
                <button
                  onClick={handleListingsSearch}
                  className="h-[70%] border-gray-100 bg-[#27262c] text-white md:border-[5px] md:hidden shadow-2xl rounded-lg text-xs flex w-[40%] justify-center items-center "
                >
                  Search
                </button>
              </div>
              <div
                className={cn(
                  "bg-gray-950 w-full grid md:hidden bg-opacity-80 h-auto p-5 mx-1 gap-2 gap-y-4 md:gap-y-16 md:gap-4  md:grid-cols-3",
                  showAdvanceSearch &&
                    "md:grid transition-all duration-1000 ease-linear"
                )}
              >
                <select
                  className="h-8 text-sm md:text-md focus:outline-none px-2 border-white border-b-2 bg-gray-950 bg-opacity-0 text-white "
                  name="town"
                  id=""
                  value={queryParams.town}
                  onChange={(e) => handleSelectChange(e)}
                >
                  <option className="bg-white" value="buea">
                    Buea
                  </option>
                  <option className="bg-white" value="limbe">
                    Limbe
                  </option>
                  <option className="bg-white" value="mutegene">
                    Limbe
                  </option>
                </select>
                <select
                  className="h-8 text-sm md:text-md focus:outline-none px-2 border-white border-b-2 bg-gray-950 bg-opacity-0 text-white "
                  name="location"
                  value={queryParams.location}
                  id=""
                >
                  <option value="Bonduma">Bonduma</option>
                  <option value="LongStreet">LongStreet</option>
                  <option value="molyko">Molyko</option>
                </select>
                <select
                  className="h-8 text-sm md:text-md focus:outline-none px-2 border-white border-b-2 bg-gray-950 bg-opacity-0 text-white "
                  name="listing_type"
                  value={queryParams.listing_type}
                  id=""
                >
                  <option value="studio">Studio</option>
                  <option value="apartment">apartment</option>
                  <option value="single rooms">Single Rooms</option>
                </select>
                <select
                  className="h-8 text-sm md:text-md focus:outline-none px-2 border-white border-b-2 bg-gray-950 bg-opacity-0 text-white "
                  name="bedroom"
                  id=""
                  value={queryParams.bedroom}
                  typeof="number"
                  onChange={(e) => handleSelectChange(e)}

                >
                  <option value="">Bedrooms</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                <select
                  className="h-8 text-sm md:text-md focus:outline-none px-2 border-white border-b-2 bg-gray-950 bg-opacity-0 text-white "
                  name="bathrooms"
                  typeof="number"
                  value={queryParams.bathrooms}
                  onChange={(e) => handleSelectChange(e)}

                  >
                    <option value="">Bathrooms</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                <select
                  className="h-8 text-sm md:text-md focus:outline-none px-2 border-white border-b-2 bg-gray-950 bg-opacity-0 text-white "
                  name="min_price"
                  id=""
                  typeof="number"
                  value={queryParams.min_price}
                  onChange={(e) => handleSelectChange(e)}

                  >
                    <option value="">Price</option>
                    <option value="10000">10000</option>
                    <option value="20000">200000</option>
                    <option value="300000">30000</option>
                    <option value="400000">40000</option>
                    <option value="500000">50000</option>
                </select>
                <select
                  className="h-8 text-sm md:text-md focus:outline-none px-2 border-white border-b-2 bg-gray-950 bg-opacity-0 text-white "
                  name="max_price"
                  id=""
                  typeof="number"
                  value={queryParams.max_price}
                  onChange={(e) => handleSelectChange(e)}

                  >
                    <option value="">Price</option>
                    <option value="10000">10000</option>
                    <option value="20000">200000</option>
                    <option value="300000">30000</option>
                    <option value="400000">40000</option>
                    <option value="500000">50000</option>
                </select>
                <div className="cols-span-2 py-4 md:col-span-3 flex justify-between items-center w-full">
                  <span className="text-sm text-orange-500 font-medium">
                    {" "}
                    108 <span className="text-white ">results</span>
                  </span>
                  <div className="flex gap-2 justify-end items-center">
                    <span className="text-sm md:text-md text-white font-medium">
                      {" "}
                      Reset
                    </span>
                    <button
                    type="submit"
                      className=" px-8 py-2 border-gray-100 bg-orange-500 font-bold text-white  shadow-2xl rounded-lg text-xs flex w-[40%] justify-center items-center "
                    >
                      Search
                    </button>
                  </div>
                </div>
              </div>
            </form>
            <button
              onClick={handleListingsSearch}
              className={cn(
                "text-white bg-[#27262c] hidden md:block w-[20%] h-10 md:h-12 md:w-auto text-xs px-2 md:px-8 md:py-2 text-md rounded-2xl font-bold",
                showAdvanceSearch && "hidden"
              )}
            >
              Search
            </button>
            {suggestions?.town_suggest__completion[0].options.length > 0 && (
              <ul className="absolute z-50 top-1/4">
                {suggestions?.town_suggest__completion[0].options.map(
                  (suggestion) => (
                    <li
                      key={suggestion?._id}
                      onClick={() => selectSuggestion(suggestion._source.town)}
                    >
                      {suggestion._source.town}
                    </li>
                  )
                )}
              </ul>
            )}
          </div>
        </div>

        <div className="grid w-[100%] sm:w-[90%] lg:w-[80%] mx-auto md:grid-cols-2 px-4 md:px-0 lg:grid-cols-3 pb-16 gap-6">
          {listings &&
            listings?.map((listing, index) => (
              <Link
                key={index}
                href={`/properties/${
                  listing.listing ? listing.listing : listing.id
                }`}
              >
                <PropertyCard
                  image={
                    search ? listing.images[0] : listing.listing_image[1]?.image
                  }
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
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              disabled={currentPage === pageNumber}
              className="bg-blue-900 text-sm md:text-lg md:px-10 px-4 py-2 rounded-sm m-1 md:m-2 text-white"
            >
              {pageNumber}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default Page;
