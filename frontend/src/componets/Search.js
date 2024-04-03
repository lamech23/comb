import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../utils/Api";

function Search() {
  const [results, setResults] = useState({});
  const [isLoading, setIsLoading] = useState(false); // Control loading state.
  const [search, setSearch] = useState(""); // Store the user's search query.
  const navigate = useNavigate();
  // Function to handle search and navigate based on search results.
  const handleSearch = () => {
    if (results?.length > 0) {
      const house = results;

      navigate(`/MoreDetails/${house.id}`);
    }
  };
  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      // Simulate a delay of 1 second (you can replace this with an actual API request).
      // Make an API request to fetch search results based on the user's query.
      const response = await api(
        `/searching/search/${search}`, "GET", {}, {}
      );

      // Set the search results in the state.
      setResults(response.products);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (search.length >= 2) {
      fetchData();
    } else {
      setResults({});
    }
  }, [search]);

  const handleCancle = () => {
    document.querySelector("#search").style.display = "none";
    setSearch("");
  };

  return (
    <>
        <form>
          <div class="bg-gray-100 border border-transparent focus-within:border-blue-500 flex px-6 rounded-full h-9 lg:w-2/4 mt-3 mx-auto max-lg:mt-6">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192.904 192.904" width="16px"
            class="fill-gray-600 mr-3 rotate-90">
            <path
              d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z">
            </path>
          </svg>

            <input
              type="search"
              id="default-search"
              class="w-full outline-none bg-transparent text-gray-600 font-semibold text-[15px]"
              placeholder="  Search for house category, price location"
              value={search}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
            />
          </div>
          {search && (
            <div className="absolute mt-2 bg-white w-full rounded-md border border-gray-300 shadow-lg">
              <div className="" id="search">
                {isLoading ? (
                  <div className="p-2">
                    <i className=""></i> Loading...
                  </div>
                ) : (
                  search.length >= 2 && (
                    <div>
                      {Array.isArray(results) && results.length > 0 && (
                        <div className="index-40">
                          <span className="block p-2 bg-gray-200">houses</span>
                          {results?.map((result, index) => (
                            <div
                              key={index}
                              className="p-2 border-b border-gray-300 flex items-center"
                            >
                              {" "}
                              <svg
                                class="w-4 h-4 text-gray-500 dark:text-gray-400 mr-4"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  stroke="currentColor"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                />
                              </svg>
                              <img
                                src={`http://localhost:4000/${result.image}`}
                                className="w-12 h-12 rounded-full"
                                alt=""
                              />
                              <div className="ml-2 text-lg">
                                <Link
                                  to={`/MoreDetails/${result.id}`}
                                  className=""
                                >
                                  {result.title}
                                </Link>
                              </div>
                            </div>
                          ))}
                          <div
                            className="material-symbols-outlined text-red-700 cursor-pointer"
                            onClick={handleCancle}
                          >
                            close
                          </div>
                        </div>
                      )}
                    </div>
                  )
                )}
              </div>
            </div>
          )}
        </form>
    </>
  );
}

export default Search;
