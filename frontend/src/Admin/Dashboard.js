import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import logo from "../componets/images/logo.jpg";
import "../css/dashboard.css";
import MainNav from "./MainNav";
import SideNavigation from "./SideNavigation";
import { useAuthContext } from "../hooks/useAuthContext";
import { useIsAdmin } from "../hooks/UseAdmin";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Graph from "../utils/Graph";

function Dashboard() {
  const { user } = useAuthContext();
  const { dispatch } = useAuthContext();
  const role = useIsAdmin();
  const [newsLetter, setNewsLetter] = useState([]);
  const [count, setCount] = useState();
  const [counts, setCounts] = useState(0);
  const [users, setUsers] = useState(0);
  const [activeUser, setActiveUser] = useState(0);
  const [tenant, setTenant] = useState(0);
  const [landowner, setLandOwner] = useState(0);
  let navigate = useNavigate();

  try {
    useEffect(() => {
      fetchAllDEtails();
      fetchNewsLetters();
      fetchTotalNews();
    }, [setCount, setCounts]);
    //house
    const fetchAllDEtails = async () => {
      const response = await axios.get("http://localhost:4000/Total");
      setCount(response.data);
    };

    //newsLetter
    const fetchNewsLetters = async () => {
      const response = await axios.get(
        "http://localhost:4000/news/newsLetter/Sub"
      );
      setNewsLetter(response.data);
    };
    const fetchTotalNews = async () => {
      const response = await axios.get(
        "http://localhost:4000/Total/newsLetters"
      );
      setCounts(response.data.count);
      setUsers(response.data.count2);
      setActiveUser(response.data.activeUser);
      setTenant(response.data.Tenant);
      setLandOwner(response.data.Landlord);
    };
  } catch (error) {}

  if (!role) {
    return (
      <div>
        <p className="top display-2 ">Oops!</p>
        <p className="middle">You are not authenticated</p>
        <a className="bottom" href="/">
          Return to homepage
        </a>
      </div>
    );
  }

  return (
    <>
      <MainNav />
      <div className="flex flex-row lg:flex-row md:flex-grow pt-5 w-full  overflow-y-scroll hide-scrollbar ">
        <SideNavigation />

        <div class="container-fluid px-4 mt-5">
          <div class="row g-3 my-2">
            <div class="col-md-3">
              <div class="p-3 bg-white shadow-lg d-flex justify-content-around align-items-center rounded">
                <div>
                  <h3 class="fs-2">{count}</h3>
                  <p class="fs-5">Houses </p>
                </div>

                <span
                  class="material-symbols-outlined display-2 "
                  style={{ color: "red" }}
                >
                  house
                </span>
              </div>
            </div>

            <div class="col-md-3">
              <div class="p-3 bg-white shadow-lg d-flex justify-content-around align-items-center rounded">
                <div>
                  <h3 class="fs-2">{users}</h3>
                  <p class="fs-5">users</p>
                </div>

                <span className="material-symbols-outlined display-2 text-red-500">
                  person
                </span>
              </div>
            </div>

            <div class="col-md-3">
              <div class="p-3 bg-white shadow-lg d-flex justify-content-around align-items-center rounded">
                <div>
                  <h3 class="fs-2">{counts}</h3>
                  <p class="fs-5">Newsletter </p>
                </div>
                <span
                  class="material-symbols-outlined display-2 "
                  style={{ color: "red" }}
                >
                  mail
                </span>
              </div>
            </div>

            <div class="col-md-3">
              <div class="p-3 bg-white shadow-lg d-flex justify-content-around align-items-center rounded">
                <div>
                  <h3 class="fs-2">{activeUser}</h3>
                  <p class="fs-5">Active Users</p>
                </div>
                <span
                  class="material-symbols-outlined display-2 "
                  style={{ color: "red" }}
                >
                  groups
                </span>
              </div>
            </div>

            <div class="col-md-3">
              <div class="p-3 bg-white shadow-lg d-flex justify-content-around align-items-center rounded">
                <div>
                  <h3 class="fs-2">{tenant}</h3>
                  <p class="fs-5">Tenants</p>
                </div>
                <span
                  class="material-symbols-outlined display-2 "
                  style={{ color: "red" }}
                >
                  groups
                </span>
              </div>
            </div>

            <div class="col-md-3">
              <div class="p-3 bg-white shadow-lg d-flex justify-content-around align-items-center rounded">
                <div>
                  <h3 class="fs-2">{landowner}</h3>
                  <p class="fs-5">Landlords</p>
                </div>
                <span
                  class="material-symbols-outlined display-2 "
                  style={{ color: "red" }}
                >
                  location_city
                </span>
              </div>
            </div>
          </div>
          <Graph users={users} />
        </div>

        <ToastContainer
          position="top-left"
          autoClose={3000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
    </>
  );
}

export default Dashboard;
