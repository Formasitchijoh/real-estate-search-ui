"use client";
import React, { useState } from "react";
import { cn } from "@/app/lib/utils";
import FacebookIcon from "@/app/icons/FacebookIcon";
import { UserEntity, PaymentEntity } from "@/app/lib/types";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { loadStripe } from '@stripe/stripe-js';

const Payment = () => {
  const router = useRouter();
  const [clientSecret, setClientSecret] = useState(null);
  const stripePromise = loadStripe('pk_test_51PYKmCRtxNTl8HYipyAjn2FBzD11BCFWDlMba0ntvb3w7E4YFlTUzSkdfcqlO8iwZreYtB0j0FLEfcgPpgo6Y6lS00Qf5lBz2W');

  const [paymentDetails, setPaymentDetails] = useState<PaymentEntity>({
    amount: 0,
    currency: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setPaymentDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    // Fetch the client secret from the server
    const response = await fetch('http://127.0.0.1:8000/api/payment/payment/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: paymentDetails.amount,
        currency: paymentDetails.currency,
      }),
    });
    const { client_secret } = await response.json();
    setClientSecret(client_secret);
  
    // Confirm the payment with Stripe
    const stripe = await stripePromise;
    if (stripe) {
      const { error } = await stripe.confirmPayment({
        elements: { submit: event.target },
        confirmParams: {
          return_url: 'http://localhost:3000/success',
        },
        clientSecret: client_secret,
      });
  
      if (error) {
        console.error(error.message);
      } else {
        console.log('Payment successful');
      }
    } else {
      console.error('Stripe is not initialized correctly.');
    }
  };

  return (
  <>
    <div className="W-[100vw] md:h-[100vh] flex flex-col justify-center items-center ">
      <div
        className={`h-full w-full  px-4 lg:w-[40%] font-serif flex p-2 flex-col justify-center items-center md:w-[50%]`}
      >
        <h2 className="text-2xl lg:text-4xl text-black font-medium  tracking-tight leading-snug">
          Make payment{" "}
        </h2>
        <form action="" className="w-full" onSubmit={handleSubmit}>
          <ul className="py-8 w-full  list-none flex flex-col place-content-center gap-4 md:gap-6">
            <li>
              <label htmlFor="amount" className="mb-2">
                Full Name
              </label>
              <input
                type="number"
                name="amount"
                value={paymentDetails.amount}
                onChange={handleInputChange}
                className="border-[0.1px] border-[#7D8BA2] focus-visible:no-underline rounded-md h-12 px-2 w-full"
              />
            </li>
            <li>
              <label htmlFor="currency" className="mb-2">
                Currency{" "}
              </label>
              <input
                type="text"
                name="currency"
                value={paymentDetails.currency}
                onChange={handleInputChange}
                className="border-[0.1px] border-[#7D8BA2] focus-visible:no-underline rounded-md h-12 px-2 w-full"
              />
            </li>
          </ul>
          <button type="submit" className=" w-full py-4 bg-[#5138ED] rounded-lg text-white">
           Confirm
          </button>
        </form>
      </div>
    </div>
  </>
  );
};

export default Payment;
