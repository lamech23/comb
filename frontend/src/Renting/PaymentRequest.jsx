import React, { useEffect, useState } from "react";
import { api } from "../utils/Api";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";

function PaymentRequest() {
  const [image, setImage] = useState("");
  const [payments, setpayments] = useState([]);
  const fetchOpenpayments = async () => {
    const response = await api("/payment/user-payment", "GET", {}, {});

    setpayments(response?.payments);
  };



  useEffect(() => {
    fetchOpenpayments();
  }, []);


  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('image', image);

      const response = await api(
        "/payment/request-payment",
        "POST",
        {},
        formData
      );
      if (response) {
        toast.success("Added succesfuly ");
      }
    } catch (error) {}
  };

  return (
    <>
      <section className="bg-gray-100">
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
            <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
              <form onSubmit={handelSubmit} className="space-y-4">
                <div class="col-span-full">
                  <label
                    for="cover-photo"
                    class="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Payment  Image
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
                            name="file-upload"
                            type="file"
                            class="sr-only"
                            onChange={(e) => setImage(e.target.files[0])}
                          />
                        </label>
                        <p class="pl-1">or drag and drop</p>
                      </div>
                      <p class="text-xs leading-5 text-gray-600">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  type="submit "
                  class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                >
                  add
                </button>{" "}
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
            </div>
          </div>
        </div>
      </section>

      <section>
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left rtl:text-right text-gray-200 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase  dark:text-gray-400">
            <tr>
              <th scope="col" class="px-16 py-3">
                <span class="col">Image</span>
              </th>
           

            
              <th scope="col" class="px-6 py-3">
                Status
              </th>
              <th scope="col" class="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          {payments.map((item) => (
            <tbody>
              <tr class="bg-white border-b  hover:bg-gray-50 dark:hover:bg-gray-100">
                <td class="p-4">

                  <img
                    src={item.image}
                    class="w-16 md:w-32 max-w-full max-h-full"
                    alt="Apple Watch"
                    />
                </td>
               

                <td class={`px-6 py-4 font-semibold text-gray-900 
                ${item.status == "open"? 'text-green-400 ' : 'text-teal-700'}
                `}>
                {item.status}

                
                </td>
                <td class=" flex flex-row gap-4  px-6 py-4">

            
                  <button
                    type="submit"
                    // onClick={() => rejectPayment(item.id)}

                    class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-900 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
      </section>
    </>
  );
}

export default PaymentRequest;
