"use client";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import ApiService from "../api";
import { Toaster } from "react-hot-toast";
import { successnotify } from "../properties/[propertyId]/helper";
import { useRouter } from "next/navigation";

const CheckoutForm = () => {
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [loader, setloader] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      const { id, token, username, role, email } = JSON.parse(
        user as unknown as string
      );
      setEmail(email);
    }
  }, []);

  // Handle real-time validation errors from the CardElement.
  const handleChange = (event: any) => {
    if (event.error) {
      setError(event.error.message);
    } else {
      setError(null);
    }
  };

  // Handle form submission.
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const cardElement = elements?.getElement(CardElement);
    console.log(
      "\n\n i know you are in there the card element functions as a useContext\n",
      cardElement
    );
    setloader(true);

    if (stripe && cardElement) {
      try {
        const { paymentMethod, error } = await stripe.createPaymentMethod({
          type: "card",
          card: cardElement,
        });

        if (error) {
          setError(error.message);
          setloader(false);
        } else {
          console.log("Payment method created:", paymentMethod);
          ApiService.saveStripeInfo({
            email,
            payment_method_id: paymentMethod.id,
          })
            .then((response) => {
              setloader(false);
              console.log(response.data);
              router.push("/properties");
              successnotify("payment successfully.");
            })
            .catch((error) => {
              console.log(error);
              setloader(false);
            });
        }
        // Proceed with the payment process on your server
      } catch (err) {
        setloader(err.message);
        setError((err as Error).message);
      }
    }
    setloader(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="stripe-form w-[90%] md:w-[80%] shadow my-10 p-4 lg:w-[50%] mx-auto h-[50vh] "
    >
      <h1 className="text-2xl font-semibold py-8 text-center">
        Complete Payment
      </h1>
      <div className="form-row">
        <label htmlFor="email " className="text-md font-normal">
          Email Address
        </label>
        <input
          className="border-[0.1px] border-[#7D8BA2] focus-visible:no-underline rounded-md h-12 px-2 w-full"
          id="email"
          name="name"
          type="email"
          placeholder="jenny.rosen@example.com"
          required
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
      </div>
      <div className="form-row py-4">
        <label className="text-md font-normal" htmlFor="card-element">
          Credit or debit card
        </label>
        <CardElement
          id="card-element"
          className="border-[0.1px] border-[#7D8BA2] pt-4 focus-visible:no-underline rounded-md h-12 px-2 w-full"
          onChange={handleChange}
        />
        <div className="card-errors" role="alert">
          {error}
        </div>
      </div>
      <button
        type="submit"
        className="submit-btn my-8 bg-[#5138ED] text-white text-md px-3 py-2  lg:py-3 lg:px-4  rounded-xl  "
      >
        {loader ? "Submiting Payment ...." : "Submit Payment"}
      </button>
      <Toaster />
    </form>
  );
};

export default CheckoutForm;
