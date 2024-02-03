import axios from "axios";
import React, { useEffect, useState } from "react";

function Category() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState([]);

  const fetchCategories = async () => {
    const response = await axios.get("http://localhost:4000/cat/fetch");
    setCategory(response.data);
    fetchCategories();
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
      const res = await axios.delete(`http://localhost:4000/cat/${id}`);

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
      <form clas onSubmit={handleSbubmit}>
        <div class="mt-10 grid grid-cols-12 gap-x-6 gap-y-8 lg:grid-cols-12">
          <div class="sm:col-span-4">
            <label
              for="category"
              class="block text-sm font-medium leading-6 text-gray-900"
            >
              category{" "}
            </label>
            <div class="mt-2">
              <div class="flex gap-3 rounded-md shadow-sm ring-1 ring-inset ring-white focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-lg">
                <span class="flex select-none items-center pl-6 text-black sm:text-sm">
                  category
                </span>
                <input
                  type="text"
                  name="category"
                  id="category"
                  value={name}
                  autocomplete="category"
                  class="block flex-1 border-2  py-1.5 pl-5 text-black placeholder:text-white focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="mansionet"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div class="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              class="text-sm font-semibold leading-6 text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save
            </button>
          </div>
        </div>
      </form>

      {/* table Section  */}

      <div className="overflow-x-auto mt-20">
        <p className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
          {" "}
          List of catgories
        </p>
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="ltr:text-left rtl:text-right">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                id
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                category{" "}
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                edit
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                delete
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
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
    </>
  );
}

export default Category;
