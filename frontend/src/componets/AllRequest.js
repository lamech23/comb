import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function AllRequest() {
  const [request, setRequest] = useState([]);

  const fetchRequests = async () => {
    const response = await axios.get(
      "http://localhost:4000/proccess/fetchRequests"
    );
    setRequest(response.data.requests);
  };
  useEffect(() => {
    fetchRequests();
  }, []);

  const handlepdate = async (id, read) => {
    await axios.patch(`http://localhost:4000/proccess/update-status/${id}?read=` + read);
  };
  const updateRequests = (id) => {
    let read = 1;
    handlepdate(id, read);
  };

  return (
    <>
    <div>
{
    request.length ==0 ?
    <div class="h-screen flex justify-center items-center">
    <div class="text-gray-500 text-3xl text-center">
      No notifications available.
    </div>
  </div>
   :

      <div class="relative overflow-x-auto shadow-md sm:rounded-lg py-20 px-40">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-100 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Email
              </th>
              <th scope="col" class="px-6 py-3">
                Reason
              </th>

              <th scope="col" class="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          {request &&
            request?.map((data) => (
              <tbody>
                <tr class="bg-white border-b  hover:bg-gray-50 ">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium  whitespace-nowrap "
                  >
                    {data.email}
                  </th>
                  <td class="px-6 py-4">{data.message}</td>
                  <td class=" flex flex-row gap-4 px-6 py-4 text-right">
                    <Link
                      to={"/admin/createUser"}
                      state={data.email}
                      onClick={() => updateRequests(data.id)}

                      class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 capitalize"
                      >
                      create
                    </Link>
                    {
                        data.read  == 0 ?
                    <button
                      type="button"
                      class="capitalize text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"

                      onClick={() => updateRequests(data.id)}
                    >
                      read
                    </button> : null
}
                    <button 
                        class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                        >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
        </table>
      </div>
}
    </div>


    </>
  );
}

export default AllRequest;
