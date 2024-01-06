import React from "react";
import DetailsForm from "../componets/details/DetailsForm";
import MainNav from "./MainNav";
import SideNavigation from "./SideNavigation";
import "../css/DetailsAdmin.css";

function AddHouse() {
  return (
    <>
      <div className="justify-center">
        <DetailsForm />
      </div>
    </>
  );
}

export default AddHouse;
