import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import User from "../Admin/User";
import AddHouse from "../Admin/AddHouse";
import GetAllDetails from "./GetAllDetails";
import HouseRegistration from "../Renting/HouseRegistration";
import RegisterTenant from "../Renting/RegisterTenant";
import House from "../Renting/House";
import NewsLetter from "./NewsLetter";
import ClientContactUs from "./ClientContactUs";
import HelpCenterAdmin from "./HelpCenterAdmin";

function SideNavigation() {
  // const{user}=useAuthContext()
  const [activeSection, setActiveSection] = useState("dashboard");

  const user = JSON.parse(localStorage.getItem("credentials"));

  let id = user?.id;

  return (
    <div className="relative flex  ">
      {/* <!-- Sidebar --> */}
      <div className=" flex flex-col justify-start  bg-green-600 w-60 h-fit gap-10   ">
        <div className="sidebar-heading text-center py-4 primary-text fs-4 fw-bold text-uppercase border-bottom mt-4">
          <i className="fas fa-user-secret me-2"></i>Kausi Admin
        </div>

        <div className="flex gap-4">
          <i className="material-symbols-outlined text-5xl text-red-600">
            {" "}
            person
          </i>
          <button
            type="button"
            className={` py-2 px-4 my-2 rounded-lg   w-full text-red-200
          ${
            activeSection === "User"
              ? "bg-teal-500 w-fit justify-center items-center"
              : ""
          }
          `}
            onClick={() => setActiveSection("User")}
          >
            Users
          </button>
        </div>

        <div className="flex ">
          <i className="material-symbols-outlined text-5xl text-red-600">
            {" "}
            house
          </i>
          <button
            className="py-2 px-4 my-2 rounded-lg  text-white w-full"
            onClick={() => setActiveSection("AddHouse")}
          >
            Create
          </button>
        </div>

        <div className="flex ">
          <i className="material-symbols-outlined text-5xl text-red-600">
            {" "}
            person
          </i>
          <button
            className="py-2 px-4 my-2 rounded-lg  text-white w-full"
            onClick={() => setActiveSection("GetAllDetails")}
          >
            Houses
          </button>
        </div>
        <div className="flex ">
          <i className="material-symbols-outlined text-5xl text-red-600">
            {" "}
            house
          </i>
          <button
            className="py-2 px-4 my-2 rounded-lg  text-white w-full"
            onClick={() => setActiveSection("HouseRegistration")}
          >
            Register House
          </button>
        </div>
        <div className="flex ">
          <i className="material-symbols-outlined text-5xl text-red-600">
            {" "}
            house
          </i>
          <button
            className="py-2 px-4 my-2 rounded-lg  text-white w-full"
            onClick={() => setActiveSection("RegisterTenant")}
          >
            Register Tenant
          </button>
        </div>

        <div className="flex ">
          <i className="material-symbols-outlined text-5xl text-red-600">
            {" "}
            house
          </i>
          <button
            className="py-2 px-4 my-2 rounded-lg  text-white w-full"
            onClick={() => setActiveSection("NewsLetter")}
          >
            NewsLetter
          </button>
        </div>

        <div className="flex ">
          <i className="material-symbols-outlined text-5xl text-red-600">
            {" "}
            house
          </i>
          <button
            className="py-2 px-4 my-2 rounded-lg  text-white w-full"
            onClick={() => setActiveSection("ClientContactUs")}
          >
            Questions
          </button>
        </div>
        <div className="flex ">
          <i className="material-symbols-outlined text-5xl text-red-600">
            {" "}
            house
          </i>
          <button
            className="py-2 px-4 my-2 rounded-lg  text-white w-full"
            onClick={() => setActiveSection("HelpCenterAdmin")}
          >
            Issues
          </button>
        </div>

        {/* <a
          href="AddAdmin"
          className="flex items-center justify-center gap-3 no-underline  text-black "
        >
          <i className="fas fa-chart-line me-2"></i>Add Admin
        </a> */}

        {/*      
        <Link
          to={`/Tours/${id}`}
          className="flex items-center justify-center gap-3 no-underline text-black  "
        >
          <i className="fas fa-comment-dots me-2"></i>Tours
        </Link> */}
      </div>

      <div className="p-5 w-full max-h-screen overflow-y-scroll hide-scrollbar">
        <div className="p-5 w-full">
          <div className=" bg-gray-900 p-4  rounded-lg max-w-full">
            {activeSection === "User" && <User />}
            {activeSection === "AddHouse" && <AddHouse />}
            {activeSection === "GetAllDetails" && <GetAllDetails />}
            {activeSection === "HouseRegistration" && <HouseRegistration />}
            {activeSection === "RegisterTenant" && <RegisterTenant />}
            {activeSection === "NewsLetter" && <NewsLetter />}
            {activeSection === "ClientContactUs" && <ClientContactUs />}
            {activeSection === "HelpCenterAdmin" && <HelpCenterAdmin />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideNavigation;
