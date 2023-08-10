import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
function SideNavigation() {
  // const{user}=useAuthContext()
  const Active = useParams();

  const user = JSON.parse(localStorage.getItem("credentials"));
  let id = user.id;

  return (
    <div className="d-flex " id="wrapper">
      {/* <!-- Sidebar --> */}
      <div className="bg-white" id="sidebar-wrapper">
        <div className="sidebar-heading text-center py-4 primary-text fs-4 fw-bold text-uppercase border-bottom">
          <i className="fas fa-user-secret me-2"></i>Kausi Admin
        </div>
        <div className="list-group list-group-flush my-3">
          <a
            href="#"
            className="list-group-item list-group-item-action bg-transparent second-text active"
          >
            <i className="fas fa-tachometer-alt me-2"></i>Dashboard
          </a>

          <Link
            to={`/User/${id}`}
            className="list-group-item list-group-item-action bg-transparent second-text fw-bold "
          >
            <i className="fas fa-project-diagram me-2"></i>Users
          </Link>

          <a
            href="AddAdmin"
            className="list-group-item list-group-item-action bg-transparent second-text fw-bold"
          >
            <i className="fas fa-chart-line me-2"></i>Add Admin
          </a>

          <a
            href="/AddHouse"
            className="list-group-item list-group-item-action bg-transparent second-text fw-bold"
          >
            <i className="fas fa-paperclip me-2"></i>Add House
          </a>

          <a
            href="/GetAllDetails"
            className="list-group-item list-group-item-action bg-transparent second-text fw-bold"
          >
            <i className="fas fa-shopping-cart me-2"></i>Houses
          </a>

          <a
            href="/HouseRegistration"
            className="list-group-item list-group-item-action bg-transparent second-text fw-bold"
          >
            <i className="fas fa-shopping-cart me-2"></i>Register House
          </a>

          <a
            href="/RegisterTenant"
            className="list-group-item list-group-item-action bg-transparent second-text fw-bold"
          >
            <i className="fas fa-shopping-cart me-2"></i>Register Tenant
          </a>

          <a
            href="/House"
            className="list-group-item list-group-item-action bg-transparent second-text fw-bold"
          >
            <i className="fas fa-shopping-cart me-2"></i> House
          </a>

          <a
            href="NewsLetter"
            className="list-group-item list-group-item-action bg-transparent second-text fw-bold"
          >
            <i className="fas fa-gift me-2"></i>Newsletter
          </a>

          <a
            href="ClientContactUs"
            className="list-group-item list-group-item-action bg-transparent second-text fw-bold"
          >
            <i className="fas fa-gift me-2"></i>Questions
          </a>

          <Link
            to={`/Tours/${id}`}
            className="list-group-item list-group-item-action bg-transparent second-text fw-bold"
          >
            <i className="fas fa-comment-dots me-2"></i>Tours
          </Link>

          <Link
            to={`/HelpCenterAdmin`}
            className="list-group-item list-group-item-action bg-transparent second-text fw-bold"
          >
            <i className="fas fa-comment-dots me-2"></i>Issues
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SideNavigation;
