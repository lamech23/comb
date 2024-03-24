import React, { useEffect, useState } from "react";
import buy from "../componets/images/buy.jpg";
import mansh from "../componets/images/mansh.jpg";
import bnb from "../componets/images/bnb.jpg";
import { Link } from "react-router-dom";
import Details from "./details/Details";
import { useAuthContext } from "../hooks/useAuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function Cards() {
  const { user } = useAuthContext();
  const [category, setCategory] = useState([]);

  const fetchCategories = async () => {
    const response = await axios.get("http://localhost:4000/cat/fetch");
    setCategory(response.data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div>
      <div class="container mx-auto">
        <h2 class="text-3xl font-bold text-center my-4">House Categories</h2>
        <div className="grid grid-cols-1 p-0 sm:5 md:p-0  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-auto">
          {category &&
            category.map((data) => (
              <div key={data.id} class="relative rounded overflow-hidden mx-auto">
                <Link to={`/houseCategory/${data.name}`}>
                  <img
                    src="https://solverwp.com/demo/html/mingrand/assets/img/product/cat-1.png"
                    alt="Orchard" className="w-auto"
                  />
               
                  <div class="absolute inset-0 flex justify-center items-center">
                    <div class="px-6 py-4 text-center text-white">
                      <h3 class="font-bold text-3xl mb-2 capitalize">{data.name}</h3>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
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
