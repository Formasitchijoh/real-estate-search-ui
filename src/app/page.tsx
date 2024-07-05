'use client'
import Image from "next/image";
import Listings from "./components/listings";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js/pure";
import CheckoutForm from "./components/CheckOutForm";
const stripePromise = loadStripe(
  "pk_test_51PYKmCRtxNTl8HYipyAjn2FBzD11BCFWDlMba0ntvb3w7E4YFlTUzSkdfcqlO8iwZreYtB0j0FLEfcgPpgo6Y6lS00Qf5lBz2W"
);
export default function Home() {
  return (
    <Elements stripe={stripePromise}>    
          <CheckoutForm/>     
        </Elements>
  );
}

