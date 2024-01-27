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
  console.log(pagination);
  console.log(pagination);

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
      <div className="container-fixed mb-5">
        <div className=" d-flex align-items-center justify-content-center ">
          {isLoading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-40 w-40 border-t-2 border-teal-600 border-opacity-50"></div>
            </div>
          ) : (
             pagination?.currentPage  && 

            pagination?.currentPosts?.map((detail, index) => (
              <div
                key={index}
                className="  col-lg-8 col-md-4  ms-2 mb-2  justify-content-between "
                style={{ width: "350px" }}
              >
                <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-2">
                  <a href="#">
                  
                    {detail?.images?.map(
                      (img, imgIndex) =>
                        imgIndex === 0 && (
                          <img
                            key={imgIndex}
                            id="detsImg"
                            className="w-fit mt-2 mb-3"
                            src={img.image}
                            width="250px"
                            height="250px"
                            style={{ borderRadius: "2px" }}
                            alt=""
                          />
                        )
                    )}
                  </a>
                  <div class="p-5 ">
                    <a href="#">
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white visible">
                        {detail?.title}
                      </h5>
                    </a>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 ">
                      {detail.description}
                    </p>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                      {detail.contact}
                    </p>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 ">
                      {detail?.details?.locaton}
                    </p>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                      {detail.price}
                    </p>

                    <p className="mb-3 font-normal text-red-700 dark:text-red-400">
                      {/* <strong>
                        {formatDistanceToNow(new Date(detail.createdAt), {
                          addSuffix: true,
                        })}
                      </strong> */}
                    </p>
                    <Link
                      to={`/MoreDetails/${detail.id}`}
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Read more
                      <svg
                        className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 10"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M1 5h12m0 0L9 1m4 4L9 9"
                        />
                      </svg>
                    </Link>
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
