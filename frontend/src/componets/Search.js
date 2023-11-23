import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Search() {
  const [results, setResults] = useState({});
  const [isLoading, setIsLoading] = useState(false); // Control loading state.
  const [search, setSearch] = useState(""); // Store the user's search query.
  const navigate = useNavigate();
  // Function to handle search and navigate based on search results.
  const handleSearch = () => {
    if (results?.length > 0) {
      const house = results;
      console.log(house, "housing");
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
      const response = await axios.get(
        `http://localhost:4000/searching/search/${search}`
      );

      // Set the search results in the state.
      setResults(response.data);
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

  return (
    <>
      <div className="search-bar hidden lg:flex absolute right-1/3 left-1/3 items-center">
        <form className="w-full max-w-lg">
          <div class="relative">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"></div>
            <input
              type="search"
              id="default-search"
              class="block w-full p-4 pl-10 text-sm  border border-gray-300 rounded-lg bg-teal-100 focus:ring-blue-500 focus:border-blue-500  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="  Search for house category, price location"
              value={search}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
            />
          </div>
          {search && (
            <div className="absolute mt-2 bg-white w-full rounded-md border border-gray-300 shadow-lg">
              <div className="">
                {isLoading ? (
                  <div className="p-2">
                    <i className=""></i> Loading...
                  </div>
                ) : (
                  search.length >= 2 && (
                    <div>
                      {Array.isArray(results) && results.length > 0 && (
                        <div>
                          <span className="block p-2 bg-gray-200">houses</span>
                          {results?.map((result, index) => (
                            <div
                              key={index}
                              className="p-2 border-b border-gray-300 flex items-center"
                            >        <svg
                            class="w-4 h-4 text-gray-500 dark:text-gray-400"
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
                        </div>
                      )}
                    </div>
                  )
                )}
              </div>
            </div>
          )}
        </form>
      </div>
    </>
  );
}

export default Search;
