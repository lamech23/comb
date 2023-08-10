import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../css/userPage.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuthContext } from "../hooks/useAuthContext";
import { useIsStatus } from "../hooks/UseStatus";
import axios from "axios";

function UserNav() {
  let navigate = useNavigate();
  // const {user}=useAuthContext()
  const { dispatch } = useAuthContext();
  const status = useIsStatus();

  const [active, setActive] = useState("");
  //  const {id} = useParams();
  useEffect(() => {
    fetchUserById();
  }, []);

  const fetchUserById = async () => {
    const response = await axios.get(
      `http://localhost:4000/Users/specificUser/${id}`
    );
    setActive(response.data.Active);
  };

  const user = JSON.parse(localStorage.getItem("credentials"));
  let id = user.id;

  const handelClick = () => {
    {
      localStorage.removeItem("credentials");
    }

    dispatch({ type: "LOGOUT" });

    navigate("/");

    return toast.success(`Successfully logged out ${user?.email}`);
  };

  return (
    <>
      <div className="d-flex " id="wrapper">
        <div className="sideNav p-2">
          <div className="list-group list-group-flush my-3" id="one">
            <a
              href="#"
              className="list-group-item list-group-item-action second-text active  fs-5 fw-bold "
            >
              <i className="fas fa-tachometer-alt me-2 fs-3 "></i>Dashboard
            </a>

            <Link
              to="/UserProfile"
              className="list-group-item list-group-item-action bg-transparent second-text fw-bold  fs-5"
            >
              <i className="fas fa-project-diagram me-2 "></i>Account{" "}
            </Link>

            <Link
              to={`/ChangeProfile/${id}`}
              className="list-group-item list-group-item-action bg-transparent second-text fw-bold fs-5"
            >
              <i className="fas fa-chart-line me-2"></i> Profile
            </Link>

            {user?.Active === "Active" ? (
              <a
                href="/UserHouse"
                className="list-group-item list-group-item-action bg-transparent second-text fw-bold fs-5"
              >
                <i className="fas fa-paperclip me-2"></i>Houses
              </a>
            ) : null}

            <Link
              to={`/Appointment/${id}`}
              className="list-group-item list-group-item-action bg-transparent second-text fw-bold fs-5"
            >
              <i className="fas fa-shopping-cart me-2"></i>Appointments
            </Link>

            <button className="list-group-item list-group-item-action bg-transparent text-danger fw-bold fs-5">
              <i className="fas fa-power-off me-2" onClick={handelClick}>
                {" "}
              </i>
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserNav;
