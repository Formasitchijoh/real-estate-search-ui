"use client";
import React from "react";
import CheckoutForm from "../components/CheckOutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js/pure";

const stripePromise = loadStripe(
  "pk_test_51PYKmCRtxNTl8HYipyAjn2FBzD11BCFWDlMba0ntvb3w7E4YFlTUzSkdfcqlO8iwZreYtB0j0FLEfcgPpgo6Y6lS00Qf5lBz2W"
);
const Payment = () => {
  return (
    <>
      <div className="w-[100vw] md:h-[100vh] flex flex-col justify-center items-center ">
        <div
          className={`h-full w-full  px-4 lg:w-[80%] font-serif flex p-2 flex-col justify-start items-center md:w-[80%]`}
        >
          <Elements stripe={stripePromise}>
            <CheckoutForm />
          </Elements>{" "}
        </div>
      </div>
    </>
  );
};

export default Payment;
