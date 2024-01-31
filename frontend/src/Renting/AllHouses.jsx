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
  };
  useEffect(() => {
    // getSpecificHouse();
    getHouse();
  }, []);

  return (
    <div className=" flex flex-col gap-4  text-3xl  justify-start">
      {house.map((item, index) => {
        return (
          <div key={index} value={item}>
            <Link
              className="no-underline text-gray-700"
              to={`/House/${item.houseName}`}
            >
              {item.houseName}
            </Link>
            {/* <Link to={"/House"}>

                </Link> */}
          </div>
        );
      })}
    </div>
  );
}

export default AllHouses;
