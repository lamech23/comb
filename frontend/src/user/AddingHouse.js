import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useAuthContext } from "../hooks/useAuthContext";

function AddingHouse() {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [contact, setContact] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState(null);
  let navigate = useNavigate();
  const { user } = useAuthContext();
  const [status, setStatus] = useState(false);
  const [cat, setCat] = useState([]);
  const [propertyType, setPropertyType] = useState([]);
  const [houseName, setHouseName] = useState("");
  const [type, setType] = useState("");
  const [units, setUnits] = useState("");
  console.log(type);

  const handleCancle = () => {
    setStatus(false);
    setImage("");
    setTitle("");
    setLocation("");
    setDescription("");
    setContact("");
    setPrice("");
    setCategory("");
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending ...");

    try {
      const formData = new FormData();
      formData.append("description", description);
      formData.append("contact", contact);
      formData.append("location", location);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("title", title);
      formData.append("houseName", houseName);
      formData.append("type", type);
      formData.append("units", units);

      for (let i = 0; i < image.length; i++) {
        formData.append("image", image[i]);
      }

      if (
        (description === "",
        contact === "",
        location === "",
        price === "",
        category === "",
        title === "")
      ) {
        toast.error("All fields must field");
      } else {
        const response = await axios.post(
          "http://localhost:4000/Details",
          formData,

          {
            headers: {
              authorization: ` Bearer ${user?.token}`,
              Accept: "application/json",
              "Content-Type": "multipart/form-data",
            },
          }
        );

        setStatus(false);
        toast.success("Added succesfuly ");
        {
          navigate("/");
        }

        // const json = await response.json()

        if (!response) {
          setError(error);
        }

        if (response) {
          //here am reseting the form
          setImage("");
          setTitle("");
          setLocation("");
          setDescription("");
          setContact("");
          setPrice("");
          setCategory("");
          setStatus(false);
        }
      }
    } catch (error) {
      if (error.response?.status === 500) {
        return toast.error(" Allowed image format jpeg,jpg,png,webp, ");
      }

      if (error.response?.status === 403) {
        return toast.error(" you are  not authorized to perform this action  ");
      }
    }
  };
  useEffect(() => {
    const fetchCategories = async () => {
      const response = await axios.get("http://localhost:4000/cat/fetch");
      setCat(response.data);
    };
    fetchCategories();
    fetchPopertyType();
  }, []);

  const fetchPopertyType = async () => {
    const response = await axios.get("http://localhost:4000/type/fetch");
    setPropertyType(response.data);
  };

  return (
    <>
      <form onSubmit={handelSubmit}>
        <div class="space-y-12">
          <div class="border-b border-gray-900/10 pb-12">
            <h2 class="text-base font-semibold leading-7 text-gray-900">
              Add Image and it's details{" "}
            </h2>
            <p class="mt-1 text-sm leading-6 text-gray-600">
              This information will be displayed publicly so be careful what you
              share.
            </p>

            <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div class="col-span-full">
                <label
                  for="cover-photo"
                  class="block text-sm font-medium leading-6 text-gray-900"
                >
                  Photos
                </label>
                <div class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div class="text-center">
                    <svg
                      class="mx-auto h-12 w-12 text-gray-300"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <div class="mt-4 flex text-sm leading-6 text-gray-600">
                      <label
                        for="file-upload"
                        class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="image"
                          type="file"
                          class="sr-only"
                          multiple
                          onChange={(e) => setImage([...e.target.files])}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="border-b border-gray-900/10 pb-12">
            <h2 class="text-base font-semibold leading-7 text-gray-900">
              House Information
            </h2>
            {/* <p class="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p> */}
            <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div class="sm:col-span-3">
                <label
                  for="first-name"
                  class="block text-sm font-medium leading-6 text-gray-900"
                >
                  Title
                </label>
                <div class="mt-2">
                  <input
                    type="text"
                    name="title"
                    class="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none sm:text-sm sm:leading-6"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                  />
                </div>
              </div>

              <div class="sm:col-span-3">
                <label
                  for="last-name"
                  class="block text-sm font-medium leading-6 text-gray-900"
                >
                  Location{" "}
                </label>
                <div class="mt-2">
                  <input
                    type="text"
                    name="location"
                    id="last-name"
                    autocomplete="family-name"
                    class="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none sm:text-sm sm:leading-6"
                    onChange={(e) => setLocation(e.target.value)}
                    value={location}
                  />
                </div>
              </div>
              <div class="sm:col-span-3">
                <label
                  for="price"
                  class="block text-sm font-medium leading-6 text-gray-900"
                >
                  Property For{" "}
                </label>
                <div class="mt-2">
                  <select
                    class="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none sm:text-sm sm:leading-6"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  >
                    {" "}
                    <option selected> select type </option>
                    {propertyType &&
                      propertyType?.map((type, index) => (
                        <option value={type.type} key={index}>
                          {type.type}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              <div class="sm:col-span-3">
                <label
                  for="first-name"
                  class="block text-sm font-medium leading-6 text-gray-900"
                >
                  Contact
                </label>
                <div class="mt-2">
                  <input
                    type="text"
                    name="contact"
                    id="first-name"
                    autocomplete="given-name"
                    class="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none sm:text-sm sm:leading-6"
                    onChange={(e) => setContact(e.target.value)}
                    value={contact}
                  />
                </div>
              </div>

              {type === "renting" ? null :
                <div class="sm:col-span-3">
                  <label
                    for="price"
                    class="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Price{" "}
                  </label>
                  <div class="mt-2">
                    <input
                      type="text"
                      name="last-name"
                      id="last-name"
                      autocomplete="family-name"
                      class="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none sm:text-sm sm:leading-6"
                      onChange={(e) => setPrice(e.target.value)}
                      value={price}
                    />
                  </div>
                </div>
              }

              <div class="sm:col-span-3">
                <label
                  for="price"
                  class="block text-sm font-medium leading-6 text-gray-900"
                >
                  category{" "}
                </label>
                <div class="mt-2">
                  <select
                    class="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none sm:text-sm sm:leading-6"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option selected> select category </option>
                    {cat &&
                      cat?.map((cat, index) => (
                        <option value={cat.name} key={index}>
                          {cat.name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              {type == "renting" ?(
                <div className="sm:col-span-3">
                  <label
                    htmlFor="house-name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    House Name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="house-name"
                      id="house-name"
                      placeholder="e.g. k-1, k2, k3, etc."
                      autoComplete="given-name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={houseName}
                      onChange={(e) => setHouseName(e.target.value)}
                    />
                  </div>
                </div>
              ): null }

              {type == "renting" ?  (
                <div className="sm:col-span-3">
                  <label
                    htmlFor="house-name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    house Units
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="units"
                      id="units"
                      placeholder="e.g. k-1, k2, k3, etc."
                      autoComplete="given-units"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={units}
                      onChange={(e) => setUnits(e.target.value)}
                    />
                  </div>
                </div>
              ):null}
              <div class="sm:col-span-6 ">
                <label
                  for="email"
                  class="block text-sm font-medium leading-6 text-gray-900"
                >
                  Description
                </label>
                <div class="mt-2">
                  <textarea
                    id="description"
                    name="description"
                    rows={12}
                    class="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none sm:text-sm sm:leading-6"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                  ></textarea>
                </div>
              </div>
            </div>

            <div class="mt-6 flex items-center justify-end gap-x-6">
              <button
                type="button"
                class="text-sm font-semibold leading-6 text-gray-900"
                onClick={handleCancle}
              >
                Cancel
              </button>

              {status ? (
                <button className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  {status}
                </button>
              ) : (
                <button
                  type="submit"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Save
                </button>
              )}
            </div>
          </div>
        </div>
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
      </form>
    </>
  );
}

export default AddingHouse;
