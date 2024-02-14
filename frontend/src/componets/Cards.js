import React, { useState } from "react";
import buy from "../componets/images/buy.jpg";
import mansh from "../componets/images/mansh.jpg";
import bnb from "../componets/images/bnb.jpg";
import { Link } from "react-router-dom";
import Details from "./details/Details";
import { useAuthContext } from "../hooks/useAuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Cards() {
  const { user } = useAuthContext();

  return (
    <div>
      <div class="container mx-auto">
    <h2 class="text-2xl font-bold text-center my-4">Categories</h2>
    <div class="grid  grid-cols-3 gap-4">
    <div class="relative rounded overflow-hidden shadow-md">
     <Link to="/BnbHouse">
      <img src="https://solverwp.com/demo/html/mingrand/assets/img/product/cat-1.png" alt="Orchard"/>
        <div class="absolute inset-0 flex justify-center items-center">
            <div class="px-6 py-4 text-center text-white">
                <h3 class="font-bold text-3xl mb-2">Apartment</h3>
            </div>
        </div>
        </Link>
     </div>

     <div class="relative rounded overflow-hidden shadow-md">
      <Link  to="/BuyHouse">
      <img src="https://solverwp.com/demo/html/mingrand/assets/img/product/cat-1.png" alt="Orchard"/>
        <div class="absolute inset-0 flex justify-center items-center">
            <div class="px-6 py-4 text-center text-white">
                <h3 class="font-bold text-3xl mb-2">Bungalow</h3>
            </div>
        </div>
        </Link>
     </div>
     

    <div class="relative rounded overflow-hidden shadow-md">
      <Link to="/Maisonette">
      <img src="https://solverwp.com/demo/html/mingrand/assets/img/product/cat-1.png" alt="Orchard"/>
        <div class="absolute inset-0 flex justify-center items-center">
            <div class="px-6 py-4 text-center text-white">
                <h3 class="font-bold text-3xl mb-2">Maisonette</h3>
            </div>
        </div>
        </Link>
     </div>
    </div>
     </div>
     
      <Details />
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
    </div>
  );
}

export default Cards;
