import React, { useEffect, useState } from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "./details.css";
import { useAuthContext } from "../../hooks/useAuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useIsAdmin } from "../../hooks/UseAdmin";
import Pagination from "./Pagination";

const Details = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [posts, setPosts] = useState([]);
  const [user_id, setUserId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(4);
  const [details, setDetails] = useState([]);
  const [query, setQuery] = useState("");
  const [pagination, setPagination] =useState({})


  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("credentials"));
    if (user) setUserId(user.id);
    setTimeout(() => {
      fetchDetails();

      function handleScroll() {
        const images = document.querySelectorAll("#hover");
        images.forEach((image) => {
          const imagePosition = image.getBoundingClientRect().top;
          const windowHeight = window.innerHeight;
          if (imagePosition - windowHeight <= 0) {
            image.classList.add("visible");
          }
        });
      }
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, 3000);
  }, []);

  // useEffect(() => {
  //   const fetchData = asy?nc () => {
  //     const res = await axios.get(`http://localhost:4000/search?q=${query}`);
  //     setDetails(res.data);
  //   };
  //   if (query.length === 0 || query.length > 2)
  //    fetchData();
  // }, [query]);

  const fetchDetails = async () => {
    const response = await axios.get("http://localhost:4000/Details/allHouses");
    setDetails(response.data.allHousesWithImage);
    setPagination(response.data?.pagination );

    setIsLoading(false);
  };
  const handleChangePage = (pageNumber)=>{
    setPagination(pageNumber);

  }

  
  return (
    <>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pt-10">
           <h3 className="text-center font-bold text-3xl pb-5">Houses</h3>
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {isLoading ? (
            <div className="flex justify-center mx-auto">
              <div className="animate-spin rounded-full h-40 w-40 border-t-2 border-teal-600 border-opacity-50"></div>
            </div>
          ) : (
            pagination?.currentPage  && 

            pagination?.currentPosts?.map((detail, index) => (
              
            <div  key={index} class="border rounded-lg shadow-lg overflow-hidden">
                  {detail?.images?.map(
                      (img, imgIndex) =>
                        imgIndex === 0 && (
               <Link to={`/MoreDetails/${detail.id}`}> <img key={imgIndex} class="w-full h-48 object-cover"  src={img.image} alt="Daily Apartment"/></Link>
              )
              )}
              <div class="p-4">
                <h3 class="text-lg font-semibold"> {detail?.title}</h3>
                <h3 class="text-lg font-light"> {detail.description}</h3>
                <p class="text-gray-600">{detail?.details?.locaton}</p>
                <p class="text-gray-900 font-semibold">Ksh{detail.price}</p>
                <div class="flex flex-wrap justify-around items-center text-gray-600 text-sm mt-2 ">
                    <div> <span className='font-bold'>{detail.units} </span>Units</div>
                  <div class="mx-2"></div>
                  <div> <span className='font-bold  blur'>{detail.contact} </span>contact</div>
                  <div class="mx-2"></div>
                </div>
              </div>
            </div>

              ))
              )}
          </div>
         </div>


     <div className="flex flex-row justify-center items-center">
    
         { 
        pagination?.pageNumbers?.map((number) => (
          <div key={number} className="">
            <a onClick={() => handleChangePage(number)} className="page-link ">
              {number}
             </a> 
          </div> 
        ))}

     </div>

      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default Details;
