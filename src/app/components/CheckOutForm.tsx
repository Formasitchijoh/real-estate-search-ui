"use client";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import ApiService from "../api";

const CheckoutForm = () => {
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const stripe = useStripe();
  const elements = useElements();

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

    if (stripe && cardElement) {
      try {
        const { paymentMethod, error } = await stripe.createPaymentMethod({
          type: "card",
          card: cardElement,
        });

        if (error) {
          setError(error.message);
        } else {
          console.log("Payment method created:", paymentMethod);
          ApiService.saveStripeInfo({
            email,
            payment_method_id: paymentMethod.id,
          })
            .then((response) => {
              console.log(response.data);
            })
            .catch((error) => {
              console.log(error);
            });
        }
        // Proceed with the payment process on your server
      } catch (err) {
        setError((err as Error).message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="stripe-form w-[80%] mx-auto ">
      <div className="form-row">
        <label htmlFor="email " className="text-md font-semibold">
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
        <label className="text-md font-semibold" htmlFor="card-element">
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
        className="submit-btn my-8 bg-sky-950 text-white text-md px-8 py-4 "
      >
        Submit Payment
      </button>
    </form>
  );
};

export default CheckoutForm;
