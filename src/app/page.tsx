'use client'
import Image from "next/image";
import Listings from "./components/listings";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-[80%] mx-auto bg-slate-300 m-5 mb-10">
        <input type="search" className="w-full h-10 rounded-2xl border-gray-800 px-5" />
      </div>
        <div className="w-[80%] mx-auto m-5">          
      {/* <Listings/> */}
        </div>
    </main>
  );
}
