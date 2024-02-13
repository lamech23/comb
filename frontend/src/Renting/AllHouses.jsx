import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function AllHouses() {
  const [house, setHouse] = useState([]);

  const getHouse = async () => {
    const response = await axios.get(
      `http://localhost:4000/Details/fetchHousesByName/`
    );
    setHouse(response.data);
    console.log(response.data);
  };
  useEffect(() => {
    // getSpecificHouse();
    getHouse();
  }, []);

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
                    {house.map((item, index) => (
                        <tr key={index} value={item}>
                        <td>{item.id}</td>
                        <td>
                          <Link
                            className="no-underline text-gray-700"
                            to={`/House/${item.houseName}`}
                          >
                            {item.houseName}
                          </Link>
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

export default AllHouses;
