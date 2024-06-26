import React from "react";
import PropTypes from "prop-types";
import Image from "next/image";
const ListingCard = ({
  id,
  title,
  image,
  link,
  listing_type,
  bedroom,
  bathrooms,
  location,
  town,
  price,
  pricepermonth,
  views,
  reactions,
  score,
}: {
  id?: number;
  title: string;
  image: string;
  link?: string;
  listing_type?: string;
  bedroom?: string;
  bathrooms?: string;
  location?: string;
  town?: string;
  price?: string;
  pricepermonth?: string;
  views?: string;
  reactions?: number;
  score?:number
}) => {
  return (
    <div className="flex border-1 flex-col p-4">
      <Image src={image} alt={title} width={200} height={10} className="aspect-auto" />
      <div className="font-serif">
        <p className="text-md font-semibold">title:{title}</p>
        <p className="text-md ">listing_type:{listing_type}</p>
        <p className="text-md ">bedroom:{bedroom}</p>
        <p className="text-md ">bathrooms:{bathrooms}</p>
        <p className="text-md ">price:{price}</p>
        <p className="text-md ">location:{location}</p>
        <p className="text-md text-red-500">Score : {score}</p>
      </div>
    </div>
  );
};

ListingCard.propTypes = {};

export default ListingCard;
