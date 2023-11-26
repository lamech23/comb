import React, { useState, useEffect, useRef } from "react";
import MainNav from "./MainNav";
import SideNavigation from "./SideNavigation";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
import "../css/DetailsAdmin.css";
import { Link } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

function GetAllDetails() {
  const { user } = useAuthContext();
  const [getDEtails, setGetDetails] = useState([]);
  const [search, setSearch] = useState("");
  const componentRef = useRef();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`http://localhost:4000/search?q=${query}`);
      setGetDetails(res.data);
    };
    if (query.length === 0 || query.length > 2)
     fetchData();
  }, [query]);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "emp-data",
    onAfterPrint: () => alert("print success"),
  });

  useEffect(() => {
    fetchAllDEtails();
  }, []);

  const fetchAllDEtails = async () => {
    const response = await axios.get("http://localhost:4000/Details/allHouses");
    setGetDetails(response.data);
  };

  

  const handelDelete = async (id) => {
    await axios.delete(`http://localhost:4000/Details/${id} `);
    fetchAllDEtails();
  };

  const filterHouses = getDEtails.filter((house) => {
    return (
      house.category.toLowerCase(),
      house.title.toLowerCase(),
      house.price.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <>
    

        <div className="mt-4">
          <div>
            <input
              className="search align-items-center justify-content-center"
              placeholder="Search..."
              onChange={(e) => setQuery(e.target.value.toLowerCase())}
            />
          </div>
          <table className="table" ref={componentRef}>
            <thead>
              <tr>
                <th>image</th>
                <th>title</th>
                <th>Category</th>
                <th>location</th>
                <th>Description</th>
                <th>contact</th>
                <th>price</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>

            {getDEtails.map((details) => (
              <tbody key={details.id}>
                <tr>
                  <td>
                    <img
                      src={`http://localhost:4000/${details.image}`}
                      width="100px"
                      height="100px"
                      style={{ borderRadius: "20px" }}
                      alt=""
                      id="imgAd"
                    />
                  </td>
                  <td>
                    {" "}
                    <strong>{details.title}</strong>
                  </td>
                  <td>
                    {" "}
                    <strong>{details.category}</strong>
                  </td>
                  <td>
                    {" "}
                    <strong>{details.location}</strong>
                  </td>
                  <td>
                    {" "}
                    <strong>{details.description}</strong>
                  </td>
                  <td>
                    {" "}
                    <strong>{details.contact}</strong>
                  </td>
                  <td>
                    <strong>{details.price}</strong>
                  </td>
                  <td>
                  </td>
                  <td>
                    <Link
                      to={`/UpdateDetails/${details.id}`}
                      type="button"
                      className="material-symbols-outlined text-decoration-none"
                      style={{ color: "blue" }}
                    >
                      edit
                    </Link>
                  </td>

                  <td>
                    <span
                      onClick={() => handelDelete(details.id)}
                      type="button"
                      className="material-symbols-outlined"
                      style={{ color: "red" }}
                    >
                      delete
                    </span>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
          <button
            className="btn btn-outline-success mt-5 mb-5"
            onClick={handlePrint}
          >
            report
          </button>
        </div>
    </>
  );
}

export default GetAllDetails;
