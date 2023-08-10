import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
import { Link } from "react-router-dom";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

function Maisonette() {
  const { user } = useAuthContext();
  const [category, setCategory] = useState([]);
  useEffect(() => {
    buyMaisinette();
  }, []);

  const buyMaisinette = async () => {
    const response = await axios.get(
      "http://localhost:4000/Details/Maisonette",
      {
        // headers:{
        //   'Authorization':`Bearer ${user.token}`
        // }
      }
    );
    setCategory(response.data);
  };
  return (
    <>
      <div className="row d-flex align-items-center justify-content-center ">
        <div className="buyHouse"></div>
        {category.map((specific) => (
          <div
            key={specific.id}
            className=" card col-lg-4 col-md-6 ms-4 card mt-5"
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
                  {formatDistanceToNow(new Date(specific.createdAt), {
                    addSuffix: true,
                  })}
                </strong>
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Maisonette;
