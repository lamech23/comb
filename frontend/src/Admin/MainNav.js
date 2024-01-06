import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useIsAdmin } from "../hooks/UseAdmin";

function MainNav() {
  const { user } = useAuthContext();
  const isAdmin = useIsAdmin();
  const { dispatch } = useAuthContext();
  let navigate = useNavigate();

  const handelClick = () => {
    {
      localStorage.removeItem("credentials");
    }

    dispatch({ type: "LOGOUT" });

    navigate("/");
  };
  return (
    <div>
      <nav
        className="flex flex-row  justify-between items-center px-20 border bg-green-400 p-4 fixed-top   "
      >
        <div id="page-content-wrapper">
          <nav
            className="navbar navbar-expand-lg navbar-light bg-transparent py-4 px-4"
            id="next_bar"
          >
              <div className=" lg:justify-items-end">
                <i
                  className="fas fa-align-left primary-text fs-4 me-3"
                  id="menu-toggle"
                ></i>
                <Link
                  className="text-decoration-none text-white text-2xl border  p-2 rounded-lg  hover:bg-teal-600"
                  to="/"
                >
                  Home
                </Link>
            </div>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>


          </nav>
        </div>

        {/* logout button */}
        <div className="">
          <div
          >
            <div
              className=" flex justify-end  visible"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0 justify-end">
                {isAdmin && user ? (
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle second-text fw-bold"
                      href="#"
                      id="navbarDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="  text-white text-2xl  "> {isAdmin?.email}</i>
                    </a>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdown"
                    >
                      <li>
                        <a
                          className="dropdown-item text-red-200"
                          href="#"
                          onClick={handelClick}
                        >
                          Logout
                        </a>
                      </li>
                    </ul>
                  </li>
                ) : null}
              </ul>
            </div>
            
          </div>
        </div>
      </nav>
    </div>
  );
}

export default MainNav;
