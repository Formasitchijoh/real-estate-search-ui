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
    const user = localStorage.getItem('user')
    //console.log(JSON.parse(user as unknown as string));
    const { id, token,username, role} = JSON.parse(user as unknown as string)
    console.log(id, token, username, role);

    fetch(`http://127.0.0.1:8000/api/bookmarks?user_id=${id}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((result) => {
        setlistings(result);
        console.log(result);
      });
  }, []);

  console.log(listings);
  return (
    <div>
      <div className="grid w-[100%] sm:w-[90%] lg:w-[80%] mx-auto md:grid-cols-2 px-4 md:px-0 lg:grid-cols-3 pb-16 gap-6">
        {
          listings &&
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
          ))}
      </div>
    </div>
  );
};

export default Page;
