import { themeChange } from "theme-change";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Bars3Icon from "@heroicons/react/24/outline/Bars3Icon";

import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import { isAdmin, isUser } from "../utils/Decoded";
import { api } from "../utils/Api";

function Header() {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const user = isUser()?.userId;

  const [photo, setPhoto] = useState({});

  const handleLogout = async () => {
    await api(`/users/logout`, "POST", {}, {});
    dispatch({ type: "LOGOUT" });

    document.cookie = "user=; expires=Thu, 01 Jan 2000 00:00:00 UTC; path=/";
    navigate("/");

    return toast.success(`Successfully logged out ${user?.email}`);
  };

  const fetchImage = async () => {
    try {
      const response = api("/Acc/user-image", "GET", {}, {});
      if (response) {
        setPhoto(response?.image);
      } else {
        setPhoto(
          "https://media.geeksforgeeks.org/wp-content/uploads/20240226132217/w2.png"
        );
      }
    } catch (error) {}
  };

  useEffect(() => {
    fetchImage();
  }, []);

  console.log(photo?.image);
  return (
    // navbar fixed  flex-none justify-between bg-base-300  z-10 shadow-md

    <>
      <div className="navbar sticky top-0 bg-base-100  z-10 shadow-md ">
        {/* Menu toogle for mobile view or small screen */}
        <div className="flex-1">
          <label
            htmlFor="left-sidebar-drawer"
            className="btn btn-primary drawer-button lg:hidden"
          >
            <Bars3Icon className="h-5 inline-block w-5" />
          </label>
        </div>

        <div className="flex-none ">
          {/* Profile icon, opening menu on click */}
          <div className="dropdown dropdown-end ml-4">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src={photo} alt="profile" />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
