import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

function SideNavigation() {
  // const{user}=useAuthContext()

  const user = JSON.parse(localStorage.getItem("credentials"));

  let id = user?.id;

  return (
    <div className=" ">
      {/* <!-- Sidebar --> */}
      <div className=" grid grid-cols-1 justify-start  bg-green-600 w-full h-fit gap-10   ">
        <div className="sidebar-heading text-center py-4 primary-text fs-4 fw-bold text-uppercase border-bottom mt-4">
          <i className="fas fa-user-secret me-2"></i>Kausi Admin
        </div>
        <div className="flex items-center justify-center gap- uppercase">
          <span class="material-symbols-outlined ">dashboard</span>
          <Link
            to={"/dashboard"}
            className="flex items-center justify-center  no-underline text-black  "
          >
            Dashboard
          </Link>
        </div>
        <div className="flex items-center justify-center gap-4 ">
        <i className="material-symbols-outlined text-5xl"> person</i>  
        <Link
          to={`/User`}
          className={`flex items-center justify-center gap-3 no-underline  text-black `}
        >
           Users
        </Link>
        </div>


        <a
          href="AddAdmin"
          className="flex items-center justify-center gap-3 no-underline  text-black "
        >
          <i className="fas fa-chart-line me-2"></i>Add Admin
        </a>

        <a
          href="/AddHouse"
          className="flex items-center justify-center gap-3 no-underline text-black  "
        >
          <i className="fas fa-paperclip me-2"></i>Add House
        </a>

        <a
          href="/GetAllDetails"
          className="flex items-center justify-center gap-3 no-underline  text-black "
        >
          <i className="fas fa-shopping-cart me-2"></i>Houses
        </a>

        <a
          href="/HouseRegistration"
          className="flex items-center justify-center gap-3 no-underline  text-black "
        >
          <i className="fas fa-shopping-cart me-2"></i>Register House
        </a>

        <a
          href="/RegisterTenant"
          className="flex items-center justify-center gap-3 no-underline  text-black "
        >
          <i className="fas fa-shopping-cart me-2"></i>Register Tenant
        </a>

        <a
          href="/House"
          className="flex items-center justify-center gap-3 no-underline  text-black "
        >
          <i className="fas fa-shopping-cart me-2"></i> House
        </a>

        <a
          href="NewsLetter"
          className="flex items-center justify-center gap-3 no-underline  text-black "
        >
          <i className="fas fa-gift me-2"></i>Newsletter
        </a>

        <a
          href="ClientContactUs"
          className="flex items-center justify-center gap-3 no-underline text-black  "
        >
          <i className="fas fa-gift me-2"></i>Questions
        </a>

        <Link
          to={`/Tours/${id}`}
          className="flex items-center justify-center gap-3 no-underline text-black  "
        >
          <i className="fas fa-comment-dots me-2"></i>Tours
        </Link>

        <Link
          to={`/HelpCenterAdmin`}
          className="flex items-center justify-center gap-3 no-underline  text-black "
        >
          <i className="fas fa-comment-dots me-2"></i>Issues
        </Link>
      </div>
    </div>
  );
}

export default SideNavigation;
