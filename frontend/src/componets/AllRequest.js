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

  return (
    <>
 

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
        {request && request?.map((data)=>(

        <tbody>
            <tr class="bg-white border-b  dark:border-gray-700 hover:bg-gray-50 ">
                <th scope="row" class="px-6 py-4 font-medium  whitespace-nowrap ">
                    {data.email}
                </th>
                <td class="px-6 py-4">
                    {data.message}
                </td>
                <td class=" flex flex-row gap-2 px-6 py-4 text-right">
                    <Link to={"/admin/createUser"} state={data.email}  class="font-medium text-green-600 dark:text-green-500 hover:underline">Create</Link>
                    <a href="#" class="font-medium text-red-600 dark:text-red-500 hover:underline">Delete</a>
                </td>
            </tr>
           
        </tbody>
        ))}

    </table>
</div>

    </>
  );
}

export default AllRequest;
