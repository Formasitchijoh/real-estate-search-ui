'use client'

import React, { useState } from "react";
import NavMenu from "../components/navbar";
import HeroSection from "../components/heroSection";
import CompaniesSection from "../components/companiesSection";
import AboutSection from "../components/aboutSection";
import Properties from "../components/propertiesSection";
import HowItWorksSection from "../components/howItWorks";
import Neighboorhoods from "../components/neighboorhoods";
import WorkWithUs from "../components/WorkWithUs";
import Testimonials from "../components/testimonials";
import Footer from "../components/footer";
const Home = () => {

  return (
    <div className="">
      <HeroSection/>
      <CompaniesSection/>
      <AboutSection/>
      <Properties/>
      <HowItWorksSection/>
      <Neighboorhoods/>
      <WorkWithUs/>
      <Testimonials/>
    </div>
  );
};

export default Home;
