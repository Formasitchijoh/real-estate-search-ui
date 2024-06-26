"use client";
import React,{ useEffect, useState} from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { usePathname } from "next/navigation";
import "yet-another-react-lightbox/plugins/captions.css";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/plugins/counter.css";
import Counter from "yet-another-react-lightbox/plugins/counter";
import "yet-another-react-lightbox/plugins/counter.css";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Inline from "yet-another-react-lightbox/plugins/inline";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import { Thumbnails } from "yet-another-react-lightbox/plugins";
import Image from "next/image";
import Button from "@/app/components/button";
import PropertyCard from "@/app/components/propertyCard";
import Link from "next/link";
import toast, { Toaster } from 'react-hot-toast';


const Property = () => {
  const [open, setOpen] = React.useState(false);
  const captionsRef = React.useRef(null);
  const fullscreenRef = React.useRef(null);
  const slideshowRef = React.useRef(null);
  const thumbnailsRef = React.useRef(null);

  const [listing, setlisting] = useState<any>();
  const [listingImages, setListingImages] = useState<Array<string>>()
  const [listings, setlistings] = useState<Array<any>>();

  const pathname = usePathname();
  const propertyId = pathname.split("/").pop();
  console.log(propertyId);
  console.log(pathname);


  const notify = () => toast.success('Item Bookmarked successfully.',{
    duration: 4000,
    position: 'top-center',
    // Custom Icon
    icon: '👏',
  
    // Change colors of success/error/loading icon
    iconTheme: {
      primary: '#000',
      secondary: '#fff',
    },
  
    // Aria
    ariaProps: {
      role: 'status',
      'aria-live': 'polite',
    },
  });

  //get listing and the corresponding images
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/listings/list/${propertyId}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((result) => {
        //console.log(result.listing_image[0].image);
        setlisting(result);

      });
      //fetch('http://127.0.0.1:8000/api/listings/images?id=20',{

      //})
      //.then((response) => response.json())
      //.then((result) => {
        // console.log(result);
      //  setListingImages(result)

      //});
  }, []);

  //get users recommendation as per this property
  useEffect(() => {
    const user = localStorage.getItem('user')
    //console.log(JSON.parse(user as unknown as string));
    const { id, token,username, role} = JSON.parse(user as unknown as string)
    console.log(id, token, username, role);
    
    fetch("http://127.0.0.1:8000/api/recommendations/user/?user_id=3", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        setlistings(result.Listings);
        console.log(result.Listing);
      });
  }, []);

  //create a bookmark
  const handleCreateBookMark = () =>{
    const user = localStorage.getItem('user')
    //console.log(JSON.parse(user as unknown as string));
    const { id, token,username, role} = JSON.parse(user as unknown as string)
    console.log(id, token, username, role);
    console.log('bookmark details', id, listing.id);
    
    fetch("http://127.0.0.1:8000/api/bookmarks/", {
      method: "POST",
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(
        {
          listing: [200],
          user:id
      }
      )
    })
      .then( async(result) => {
        const response = await result.json()
        if (result.status){
          alert(result.status)
          notify()
          console.log(result.status);
          console.log(response);
        }
      });
  }
  
  console.log('image\n', listing?.listing_image[0].image);
  
  return (
    <>
    <div className="w-full  lg:w-[90vw] mx-auto py-8 px-2 md:px-4 md:gap-4 flex flex-col md:flex-row justify-center items-center ">
      <div className="w-full md:w-[50%] mx-auto h-[60vh]">
    <div className="py-4 block md:hidden">
    <h2 className="text-xl bg-[#F7F7FD] rounded-xl px-3 py-6  lg:py-3 lg:px-6 sm:text-2xl md:text-3xl lg:text-3xl text-black font-medium tracking-tight leading-snug">
    {listing?.title} {propertyId} </h2>
    </div>
    {listing?.listing_image &&
       <Lightbox
       className=""
         open={true}
         close={() => setOpen(false)}
         slides={listing?.listing_image?.map((images: { image: any; }) => (
           {src:images.image}
         ))}
         plugins={[Captions, Fullscreen, Inline, Thumbnails]}
         captions={{ ref: captionsRef }}
         on={{
           click: () => {
             (thumbnailsRef.current?.visible
               ? thumbnailsRef.current?.hide
               : thumbnailsRef.current?.show)?.();
           },
         }}
         inline={{
           style: { width: "100%", maxWidth: "1050px", height:'100%', aspectRatio: "3 / 2" },
         }}
       />
       }

      </div>
      <div className="w-full h-[60vh] py-8 flex flex-col justify-start lg:px-8 items-start pl-2 md:w-[80%]">
      <h2 className="text-xl bg-[#F7F7FD] rounded-xl px-3 py-6  lg:py-3 lg:px-6 sm:text-2xl md:text-3xl lg:text-3xl text-black font-medium tracking-tight leading-snug">
      {listing?.title}  </h2>
        <span className="text-xl text-[#5138ED] py-6 inline-block font-medium ">
        FCFA {listing?.price}
        </span>
        <div className="flex place-items-center pt-2 pb-3 gap-4">
          <Image src={"/location.png"} alt="location" width={16} height={20} />
          <p className="text-[#7D8BA2] text-sm sm:text-md md:text-lg font-medium">
            {`${listing?.town}, ${listing?.location}`}
          </p>
        </div>
        <div className="w-full flex justify-between items-center py-3 ">
          <div className="flex place-items-center pt-2 gap-2">
            <Image src={"/bed.png"} alt="location" width={24} height={24} />
            <p className="text-[#7D8BA2] text-sm sm:text-md md:text-lg font-medium">{listing?.bedroom} Beds</p>
          </div>
          <div className="flex place-items-center pt-2 gap-2">
            <Image src={"/bath.png"} alt="location" width={24} height={24} />
            <p className="text-[#7D8BA2] text-sm sm:text-md md:text-lg font-medium">{listing?.bathrooms} Baths</p>
          </div>
          <div className="flex place-items-center pt-2 gap-2">
            <Image src={"/square.png"} alt="location" width={24} height={24} />
            <p className="text-[#7D8BA2] text-sm sm:text-md md:text-lg font-medium">{listing?.reactions}</p>
          </div>
        </div>

        <div className='flex px-2 gap-4 w-full place-content-start py-8 mt-8 md:mt-6'>
                <Button text="Request Property" primary={true}/>
                <Button onClick={handleCreateBookMark} className="text-black" text="BookMark property" tetiary={true}/>
            </div>
      </div>
      </div>

      <div className="md:py-10 w-[100%] sm:w-[90%] px-4 lg:px-0 lg:w-[80%] mx-auto ">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-3xl text-black font-medium tracking-tight leading-snug">
        Recommeded Properties  </h2>
        </div>
        <div className="grid w-full  lg:w-[90vw] mx-auto py-8 md:gap-4  flex-col md:flex-row md:grid-cols-2 px-4 lg:px-0 lg:grid-cols-3 pb-16 gap-6">
        {
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
         <Toaster />
      </div>
    </>
  );
};

export default Property;
