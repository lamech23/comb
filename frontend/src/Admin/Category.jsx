import axios from "axios";
import React, { useEffect, useState } from "react";
import Squares2X2Icon from "@heroicons/react/24/outline/Squares2X2Icon";
import { api } from "../utils/Api";

function Category() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState([]);

  const fetchCategories = async () => {
    const response = await axios.get("http://localhost:4000/cat/fetch");
    setCategory(response.data);
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSbubmit = async (e) => {
    e.preventDefault();

    const response = await axios.post("http://localhost:4000/cat/", {
      name: name,
    });

    fetchCategories();

    if (response) {
      setName("");
    }
  };

  const deleteCat = async (id) => {
    try {
      // const res = await axios.delete(`http://localhost:4000/cat/${id}`);

      const res = await api(`/cat/${id}`, "DELETE", {}, {});
      // console.log(res);
      if (res.status === 200) {
        fetchCategories();
        console.log("Category deleted successfully");
      } else {
        console.error("Failed to delete category:", res.statusText);
      }
    } catch (error) {
      console.error("Error deleting category:", error.message);
    }
  };

  return (
    <>
      <form onSubmit={handleSbubmit}>
        <div class="flex flex-wrap items-stretch mb-4 relative w-full lg:w-4/12 mt-20">
          <div class="flex">
            <span class="flex items-center leading-normal bg-grey-lighter border-1 rounded-r-none border border-r-0 border-blue-300 px-3 whitespace-no-wrap text-grey-dark text-sm w-12 h-10 bg-blue-300 justify-center items-center  text-xl rounded-lg text-white">
              <Squares2X2Icon />
            </span>
          </div>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            class="flex-shrink flex-grow flex-auto leading-normal w-px flex-1 border border-l-0 h-10 border-grey-light rounded-lg rounded-l-none px-3 relative focus:outline-none"
            placeholder="property type"
          />
        </div>

        <div class="mt-5  md:space-x-3 md:block flex flex-col-reverse">
          <button class="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100">
            {" "}
            Cancel{" "}
          </button>
          <button class="mb-2 md:mb-0 bg-green-400 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-green-500">
            Save
          </button>
        </div>
      </form>

      {/* table Section  */}

      <div className="card w-full p-6 bg-base-100 shadow-xl mt-10">
        <p>List of categories</p>
        <div className="divider mt-2"></div>
        {/* Team Member list in table format loaded constant */}
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Id</th>
                <th>Category</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {category &&
                category.map((cat) => (
                  <tr key={cat.id}>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      {" "}
                      {cat.id}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {cat.name}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      <button class="inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm text-green-500 hover:text-gray-700 focus:relative">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="h-4 w-4"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                          />
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        View
                      </button>
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      <button
                        class="inline-flex items-center gap-2 rounded-md bg-white px-4 py-2 text-sm text-red-500 shadow-sm focus:relative"
                        // onClick={deleteCat}
                        onClick={() => deleteCat(cat.id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="h-4 w-4"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Category;
