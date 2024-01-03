import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../css/userPage.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuthContext } from "../hooks/useAuthContext";
import { useIsStatus } from "../hooks/UseStatus";
import axios from "axios";
import UserProfile from "../user/UserProfile";
import ChangeProfile from "../user/ChangeProfile";
import Appointment from "../user/Appointment";
import UserHouse from "../user/UserHouse";
import AddingHouse from "./AddingHouse";





function UserNav() {
  let navigate = useNavigate();
  // const {user}=useAuthContext()
  const { dispatch } = useAuthContext();
  const status = useIsStatus();
  const [activeSection, setActiveSection] = useState("stats");

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
    <div className="flex">

      <div className=" flex flex-col justify-start  bg-gray-500 w-60 h-fit gap-10  max-h-screen overflow-y-scroll  ">
        {" "}
        <div className="sideNav p-2">
          <div className="list-group list-group-flush my-3" id="one">
            <a
              href="#"
              className="list-group-item list-group-item-action second-text active  fs-5 fw-bold "
            >
              <i className="fas fa-tachometer-alt me-2 fs-3 "></i>Dashboard
            </a>


            <div className="flex ">
              <i className="material-symbols-outlined text-5xl text-gray-900">
                {" "}
                account_circle
              </i>
              <button
                type="button"
                className={` py-2 px-4 my-2 rounded-lg   w-full text-red-200
            
          ${
            activeSection === "UserProfile"
              ? "bg-teal-500 w-fit justify-center items-center"
              : ""
          }
          
          `}
                id="link"
                onClick={() => setActiveSection("UserProfile")}
              >
                Account
              </button>
            </div>

            <div className="flex ">
              <i className="material-symbols-outlined text-5xl text-gray-900">
                {" "}
                person
              </i>
              <button
                type="button"
                className={` py-2 px-4 my-2 rounded-lg   w-full text-red-200
            
          ${
            activeSection === `ChangeProfile/${id}`
              ? "bg-teal-500 w-fit justify-center items-center"
              : ""
          }
          
          `}
                id="link"
                onClick={() => setActiveSection(`/ChangeProfile/${id}`)}
              >
                Profile
              </button>
            </div>


            <div className="flex ">
              <i className="material-symbols-outlined text-5xl text-gray-900">
                {" "}
                schedule
              </i>
              <button
                type="button"
                className={` py-2 px-4 my-2 rounded-lg   w-full text-red-200
            
          ${
            activeSection === `Appointment/${id}`
              ? "bg-teal-500 w-fit justify-center items-center"
              : ""
          }
          
          `}
                id="link"
                onClick={() => setActiveSection(`Appointment/${id}`)}
              >
                Appointment
              </button>
            </div>

            <div className="flex ">
              <i className="material-symbols-outlined text-5xl text-gray-900">
                {" "}
                add
              </i>
              <button
                type="button"
                className={` py-2 px-4 my-2 rounded-lg   w-full text-red-200
            
          ${
            activeSection === `addHouse`
              ? "bg-teal-500 w-fit justify-center items-center"
              : ""
          }
          
          `}
                id="link"
                onClick={() => setActiveSection(`addHouse`)}
              >
                Post
              </button>
            </div>


            

            {user?.Active === "active" ? (
                <div className="flex ">
                <i className="material-symbols-outlined text-5xl text-gray-900">
                  {" "}
                  house
                </i>
                <button
                  type="button"
                  className={` py-2 px-4 my-2 rounded-lg   w-full text-red-200
              
            ${
              activeSection === "userHouse"
                ? "bg-teal-500 w-fit justify-center items-center"
                : ""
            }
            
            `}
                  id="link"
                  onClick={() => setActiveSection("userHouse")}
                >
                 houses
                </button>
              </div>
  
            ) : null}

        

            <button className="list-group-item list-group-item-action bg-transparent text-danger fw-bold fs-5">
              <i className="fas fa-power-off me-2" onClick={handelClick}>
                {" "}
              </i>
              Logout
            </button>
          </div>
        </div>
      </div>
      <div className="p-5 w-full max-h-screen overflow-y-scroll hide-scrollbar">
        <div className="p-5 w-full">
          <div className=" bg-gray-400 p-4  rounded-lg max-w-full">
            {activeSection === "UserProfile" && <UserProfile />}
            {activeSection === `/ChangeProfile/${id}` && <ChangeProfile />}
            {activeSection === `/Appointment/${id}` && <Appointment />}
            {activeSection === "userHouse" && <UserHouse />}
            {activeSection === "addHouse" && <AddingHouse />}
            
            
          </div>
        </div>
      </div>
    </div>

    </>
  );
}

export default UserNav;
