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
        <div class="grid grid-flow-row-dense  lg:grid-cols-3 gap-4">
          {category &&
            category.map((data) => (
              <div key={data.id} class="relative rounded overflow-hidden ">
                <Link to={`/houseCategory/${data.name}`}>
                  <img
                    src="https://solverwp.com/demo/html/mingrand/assets/img/product/cat-1.png"
                    alt="Orchard"
                  />
                  <div class="absolute inset-0 flex justify-center items-center">
                    <div class="px-6 py-4 text-center text-white">
                      <h3 class="font-bold text-3xl mb-2">{data.name}</h3>
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
