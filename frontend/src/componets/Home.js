import React, { useContext, useEffect, useState } from "react";

import Cards from "./Cards";
// import Upload from '../page/Upload'
import GetInTouch from "../componets/GetInTouch";
import Footer from "./Footer";
import Services from "./Services";
import header from "./images/header.png";
import Navbar from "./Navbar";
import { ToastContainer, toast } from "react-toastify";

function Home({ user, admin }) {
  useEffect(() => {
    if (admin === false) {
      toast.error("You don't have access to the admin panel.");
    }
  }, []);

  useEffect(() => {
    if (user) {
      toast.error("You don't have access to the admin panel.");
    }
  }, []);

  return (
    <>
      <Navbar />
      <div class="banner-area banner-area-5 flex flex-col lg:flex-row items-center">
        <div class="container mx-auto">
          <div class="banner-area-inner py-16 relative z-10">
            <div class="flex flex-col lg:flex-row justify-center lg:justify-between gap-5">
              <div class="lg:w-5/12 lg:order-last">
                <div class="thumb text-center mb-4 lg:mb-0 lg:text-right">
                  <img src={header} class="" alt="img" />
                </div>
              </div>
              <div class="lg:w-1/2 lg:order-first lg:self-center">
                <div class="banner-inner text-center lg:text-left text-black space-y-5 py-10 space-x-5">
                  <h6 class="text-lg pl-7 font-bold">
                    Freyton Property Agencies
                  </h6>
                  <h2 class="text-3xl lg:text-6xl font-bold mb-2">
                    The Best Way To Find Your Home
                  </h2>
                  <p class="mb-0">
                    Customer Satisfaction is our Necessity And Goal.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Cards />

      <Services />
      <GetInTouch />

      <Footer />

      <ToastContainer
        position="top-left"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default Home;
