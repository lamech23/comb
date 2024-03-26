import React, { useState, useEffect } from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useAuthContext } from "../hooks/useAuthContext";
import "../css/houses.css";

import axios from "axios";
import { Link } from "react-router-dom";

function BnbHouse() {
  const { user } = useAuthContext();
  const [category, setCategory] = useState([]);
  useEffect(() => {
    getBnb();
  }, []);

  const getBnb = async () => {
    const response = await axios.get(
      "http://localhost:4000/Details/Apartments",
      {
        headers:{
          'Authorization':`Bearer ${user.token}`
        }
      }
    );
    setCategory(response.data);
  };

  return (

    <div className="row d-flex align-items-center justify-content-center ">
      <div className="buyHouse"></div>
      {category.map((specific) => (
        <div
          key={specific.id}
          className=" card col-lg-4 col-md-6 ms-4  mt-5"
          style={{ width: "400px" }}
        >
          <Link to={`/MoreDetails/${specific.id}`}>
            <img
              className="  ms-5 mt-5 mb-3"
              src={`http://localhost:4000/${specific.image}`}
              width="250px"
              height="250px"
              style={{ borderRadius: "20px" }}
              alt=""
            />
          </Link>
          <div className="truncate">
            <p className="tra">
              <p>
                {" "}
                <strong>{specific.title}</strong>
              </p>
              <p>
                {" "}
                <strong>{specific.category}</strong>
              </p>
              <p>
                {" "}
                <strong>{specific.location}</strong>
              </p>
              <p>
                {" "}
                <strong>{specific.description}</strong>
              </p>
              <p>
                {" "}
                <strong>{specific.contact}</strong>
              </p>
              <p>
                {" "}
                <strong>{specific.price}</strong>
              </p>
            </p>
            <p>
              <strong>
                {formatDistanceToNow(new Date(specific.createdAt), {  addSuffix: true, })}
              </strong>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BnbHouse;
