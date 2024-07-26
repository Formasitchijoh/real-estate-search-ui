'use client'

import React, { useEffect, useState } from "react";
import NavMenu from "../components/navbar";
import HeroSection from "../components/heroSection";
import CompaniesSection from "../components/companiesSection";
import AboutSection from "../components/aboutSection";
import Properties from "../components/propertiesSection";
import HowItWorksSection from "../components/howItWorks";
import Neighboorhoods from "../components/neighboorhoods";
import WorkWithUs from "../components/WorkWithUs";
import Testimonials from "../components/testimonials";
import Footer from "../components/footer";
import Link from "next/link";
import PropertyCard from "../components/propertyCard";
import Button from "../components/button";
import { useRouter } from "next/navigation";
const Home = () => { 
  const [listings, setlistings] = useState<Array<any>>();
  const [scores, setScores] = useState<Array<any>>();
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState(false)
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [newRecommendation, setNewRecommendation] = useState(false)
  const [recommendations, setRecommendations] = useState<Array<any>>();

  const router = useRouter();

  const user = localStorage.getItem("user");
  const { id, token, username, role } = user
    ? JSON.parse(user as unknown as string)
    : " ";
  useEffect(() => {
    router.refresh();
  }, [user]);

  useEffect(() => {
    try {
      fetch(`http://127.0.0.1:8000/api/listings/list/?page=${currentPage}`, {
        method: "GET",
      }).then((response) =>
        response.json().then((result) => {
          setlistings(result.results);
          // alert('in')
          console.log("\n\nresult hdhfhsfjsjfnsjfg\n\n", result.results);
          setTotalPages(Math.ceil(result.count / result.results.length));
        })
      );
      const user = localStorage.getItem("user");

      const { id, token, username, role, recommendation } = JSON.parse(
        user as unknown as string
      );
      console.log("\n\n user user", user);

      if (user && recommendation) {
        console.log("\n\n user i recommendation\n\n", user);

        fetch(`http://127.0.0.1:8000/api/listings/content?user_id=${id}`, {
          method: "GET",
        })
          .then((response) => response.json())
          .then((result) => {
            setRecommendations(result);
            console.log("\n\nresult\n\n", result);
          });
      }
    } catch (error) {
      console.log(error);
    }
  }, [currentPage]);
  return (
    <div className="">
      <HeroSection/>
      <CompaniesSection/>
      <AboutSection/>
      <div className='w-[100vw] mx-auto py-10 md:py-16 xl:py-20 flex flex-col justify-center items-center'>
        <Button secondary text='Properties' className=' mb-4 xl:mb-6'/>
        <h2 className="text-2xl md:text-4xl lg:text-5xl text-black font-medium tracking-tight leading-snug">
        Properties in your favorite area  </h2>

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
    </div>      <HowItWorksSection/>
      <Neighboorhoods/>
      <WorkWithUs/>
      {/* <Testimonials/> */}
    </div>
  );
};

export default Home;
