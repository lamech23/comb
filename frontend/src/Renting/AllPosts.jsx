import axios from "axios";
import React, { useEffect, useState } from "react";

function AllPosts() {
    const [details, setDetails] = useState([]);


    const fetchDetails = async () => {
        const response = await axios.get(`http://localhost:4000/Details/allHouses/`);
        setDetails(response.data.allHousesWithImage?.rows);
    
      };
      useEffect(()=>{
        fetchDetails()

      },[])
      console.log(details);
    
  return <>
<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-200 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-16 py-3">
                    <span class="">Image</span>
                </th>
                <th scope="col" class="px-6 py-3">
                    HouseName
                </th>
              
                <th scope="col" class="px-6 py-3">
                    LandLord 
                </th>
                <th scope="col" class="px-6 py-3">
                    Property Type
                </th>

                <th scope="col" class="px-6 py-3">
                    Units
                </th>
              
                <th scope="col" class="px-6 py-3">
                    Category 
                </th>
                <th scope="col" class="px-6 py-3">
                     Price
                </th>
            </tr>
        </thead>

        {
        details?.map((house)=>(
        <tbody>
            <tr class="bg-white border-b  dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-100">
            {house?.images?.map(
                  (img, imgIndex) =>
                    imgIndex === 0 && (
                <td class="p-4">
                    <img src={img.image} class="w-16 md:w-32 max-w-full max-h-full" alt="Image"/>
                </td>
                  ))}

                <td class="px-6 py-4 font-semibold text-gray-900 ">
                    {house.houseName}
                </td>
           
                <td class="px-6 py-4 font-semibold text-gray-900 ">
                    {house.houses.email}
                </td>
                <td class="px-6 py-4 font-semibold text-gray-900 ">
                    {house.type}
                </td>
           
                <td class="px-6 py-4 font-semibold text-gray-900 ">
                    {house.units}
                </td>
                <td class="px-6 py-4 font-semibold text-gray-900 ">
                    {house.category}
                </td>
                <td class="px-6 py-4">
                    <a href="#" class="font-medium text-red-600 dark:text-red-500 hover:underline">Delete</a>
                </td>
            </tr>
      
        </tbody>
           ))
        }
    </table>
</div>
  </>;
}

export default AllPosts;
