"use client";
import React, { useEffect, useState } from "react";
import Properties from "../components/propertiesSection";
import PropertyCard from "../components/propertyCard";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Link from "next/link";

const Page = () => {
  const [listings, setlistings] = useState<Array<any>>();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const { id, token, username, role } = JSON.parse(
        user as unknown as string
      );

      fetch(`http://127.0.0.1:8000/api/bookmarks?user_id=${id}`, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((result) => {
          setlistings(result);
        });
    }
  }, []);

  return (
    <div>
        <div className="bg-[url(/banner.jpg)] w-full h-[20vh] lg:h-[20vh] bg-cover bg-no-repeat py-10 flex flex-col justify-start items-start mb-8">
        <div className="w-[80%] mx-auto h-full flex justify-start items-center">

        <h2 className="text-2xl md:text-4xl lg:text-5xl text-white tracking-tight leading-snug">
          Saved Properties{" "}
        </h2>
        </div>
      </div>
      <div className="grid w-[100%] sm:w-[90%] lg:w-[80%] mx-auto md:grid-cols-2 px-4 md:px-0 lg:grid-cols-3 pb-16 gap-6">
        {listings?.length > 0 ? (
          listings?.slice(0, 10)?.map((listing, index) => (
            <Link key={index} href={`/properties/${listing.id}`}>
              <PropertyCard
                title={listing.title}
                image={listing.images[0]}
                bedrooms={listing.bedroom}
                bathrooms={listing.bathrooms}
                price={listing.price}
                location={`${listing.town}, ${listing.location} `}
                reactions={listing.reactions}
              />
            </Link>
          ))
        ) : (
          <div className="flex w-[80vw] mx-auto h-[50vh] py-10 justify-center items-center">
            <h2 className="text-2xl md:text-4xl lg:text-5xl text-black font-medium tracking-tight leading-snug">
              No Bookmarks yet{" "}
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
