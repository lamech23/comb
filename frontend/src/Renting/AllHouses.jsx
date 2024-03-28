import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../utils/Api";

function AllHouses() {
  const [house, setHouse] = useState([]);

  const getHouse = async () => {
    const response = await api("/Details/fetchHousesByName", "GET", {}, {});
    console.log(response);
    setHouse(response);
  };
  useEffect(() => {
    getHouse();
  }, []);

  // console.log(house);

  return (
    <>


    <div className="card w-full p-6 bg-base-100 shadow-xl ">
                    <p>List Of All Houses</p>
            <div className="divider mt-2"></div>
                {/* Team Member list in table format loaded constant */}
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Houses</th>
                    </tr>
                    </thead>
                    <tbody >
                    {house?.map((item, index) => (

                         item?.type== "renting"?
                        <tr key={index} value={item}>
                        <td>{index +1}</td>
                        <td>
                          <Link
                            className="no-underline text-gray-700"
                            to={`/House/${item.houseName}`}
                          >
                            {item.houseName}
                          </Link>

                        </td>
                        </tr>
                        : null
                   ))}



                   </tbody>
                   
                </table>
            </div>
       </div>

    </>
  );
}

export default AllHouses;
