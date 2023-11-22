import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../componets/images/logo.jpg";
import "./Image.css";
import "../css/navbar.css";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import { useIsAdmin } from "../hooks/UseAdmin";
import { useIsStatus } from "../hooks/UseStatus";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Search from "./Search";

function Navbar() {
  const { dispatch } = useAuthContext();
  const { user } = useAuthContext();
  const role = useIsAdmin();
  const status = useIsStatus();
  const [Status, setStatus] = useState("");
  const [open, setOpen] = useState(false);
  let navigate = useNavigate();

  document.addEventListener("DOMContentLoaded", function () {
    window.addEventListener("scroll", function () {
      if (window.scrollY) {
        document.querySelector("#mainNavbar").classList.add("fixed-top");
        const navbar_height = document.querySelector(".navbar").offSetHeight;
        document.body.style.paddingTop = navbar_height + "px";
      } else {
        document.querySelector("#mainNavbar").classList.remove("fixed-top");
        document.body.style.paddingTop = "0";
      }
    });
  });
  useEffect(() => {
    fetchUserById();
  }, []);

  const handleOpen = () => {
    setOpen(true);
    document.querySelector("#main_navigation").style.display = "";
  };

  const handleClose = () => {
    setOpen(false);
    const content = document.querySelector("#main_navigation");
    content.style.display = "none";
  };

  const fetchUserById = async () => {
    const response = await axios.get(
      `http://localhost:4000/Users/specificUser/+id`
    );
    setStatus(response.data.Status);
  };

  const handleLogout = async () => {
    await axios.post(`http://localhost:4000/users/logout`);
    {
      localStorage.removeItem("credentials");
    }
    dispatch({ type: "LOGOUT" });

    document.cookie = "user=; expires=Thu, 01 Jan 2000 00:00:00 UTC; path=/";

    navigate("/");

    return toast.success(`Successfully logged out ${user?.email}`);
  };

  return (
    <div>
      <nav
        className="navbar navbar-expand-md  navbar-light shadow-lg bg-muted  lg:w-full"
        id="mainNavbar"
      >
        <div className="container-xxl ">
          <Link to="/">
            {" "}
            <img className="logo" src={logo} alt="" />
          </Link>
          <Link className="navbar-brand" to="/">
            Kausi property
          </Link>
          


          {open ? (
            <button
              className="navbar-toggler hover:bg-teal-800"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#main_navigation"
              aria-controls="main_navigation"
              aria-expanded="false"
              aria-label="Toggle navigation"
              onClick={handleClose}
            >
              <span class="material-symbols-outlined text-red-500 text-2xl">
                {" "}
                close
              </span>
            </button>
          ) : (
            <button
              className="navbar-toggler "
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#main_navigation"
              aria-controls="main_navigation"
              aria-expanded="false"
              aria-label="Toggle navigation"
              onClick={handleOpen}
            >
              <span class="navbar-toggler-icon"></span>
            </button>
          )}
          {/* <Search/> */}
          <Search/>

          <div
            className="   navbar-collapse justify-content-end align-center me-5 visible  "
            id="main_navigation"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link " to="/About">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Contacts">
                  Contacts
                </Link>
              </li>

              {user?.Active === "active" ? (
                <li className="nav-item">
                  <Link className="nav-link" to="/DetailsForm">
                    Post
                  </Link>
                </li>
              ) : null}

              {role && user ? (
                <li className="nav-item">
                  <Link className="nav-link" to="/Dashboard">
                    Dashboard
                  </Link>
                </li>
              ) : null}

              {/* the logout button should display only if we have a user */}
              {user && (
                <div className=" card nav-item">
                  <div
                    className=" collapse navbar-collapse justify-content-end align-center me-5  "
                    id="main-navbar"
                  >
                    <div
                      className="collapse navbar-collapse"
                      id="navbarSupportedContent"
                    >
                      <ul className="navbar-nav ms-auto mb-2 mb-lg-0 visible">
                        <li className="nav-item dropdown  dropend ">
                          <a
                            className="nav-link dropdown-toggle second-text fw-bold visible "
                            href="#"
                            id="navbarDropdown"
                            role="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <span className="fs-5">
                              <i class="bi bi-person-check fs-5  text-yellow-500 me-2"></i>
                            </span>

                            <span className="fs-5  text-teal-400 ">
                              {" "}
                              Welcome {user ? user?.email : null}
                            </span>
                          </a>
                          <ul
                            className="dropdown-menu mt-5"
                            aria-labelledby="navbarDropdown"
                          >
                            <li>
                              <Link
                                className="dropdown-item"
                                to={`/Profile/${user.id}`}
                              >
                                Profile
                              </Link>
                            </li>
                            <li>
                              <a className="dropdown-item" href="/Settings">
                                Settings
                              </a>
                            </li>
                            <li>
                              <button
                                className=" dropdown-item  text-decoration-none text-danger fs-5"
                                onClick={handleLogout}
                              >
                                {" "}
                                logout{" "}
                              </button>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </ul>
          </div>
          {/* only if we dont have a user we see the login icon */}
          {!user && (
            <div className="display-6  btn-group">
              <Link
                to="/Login"
                type="button"
                className="btn btn-warning rounded-pill my-3 me-4 fw-bold "
              >
                Login
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* <Search/> */}
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
  );
}

export default Navbar;
