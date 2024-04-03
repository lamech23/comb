import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../utils/Api";

function AllHouses() {
  const [house, setHouse] = useState([]);

  const getHouse = async () => {
    const response = await api("/Details/fetchHousesByName", "GET", {}, {});
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
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {house?.map((item, index) =>
                item?.type == "renting" ? (
                  <tr key={index} value={item}>
                    <td>{index + 1}</td>
                    <td>
                      <Link
                        className="no-underline text-gray-700"
                        to={`/House/${item.houseName}`}
                      >
                        {item.houseName}
                      </Link>
                    </td>
                    <td>
                      <button
                        type="button "
                        class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                      >
                        Delete
                      </button>{" "}
                    </td>
                  </tr>
                ) : null
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default AllHouses;
