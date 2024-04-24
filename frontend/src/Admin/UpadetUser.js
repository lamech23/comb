import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import "../css/admin.css";
import { ToastContainer, toast } from "react-toastify";
import { api } from "../utils/Api";

function UpadetUser() {
  // const {id}  = useParams();
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const id = useLocation().pathname.split("/")[2];
 

  const elevetUser = async (e) => {
    const response = await api(`/Users/single-user/${id}`, "GET", {}, {});

    setEmail(response.User.email);
    setRole(response.User.role);
  };

  const updatingUser = async (e) => {
    e.preventDefault();

    const response = await api(
      `/Users/userUpdate/${id}`,
      "PATCH",
      {},
      {
        email: email,
        role: role,
      }
    );

    if (response) {
      // let user = JSON.parse(localStorage.getItem("credentials"));
      // user.email = email;
      // user.role = role;
      // localStorage.setItem("credentials", JSON.stringify(user));
      toast.success("updated successfully");
    }
  };

  useEffect(() => {
    elevetUser();
  }, []);
  return (
    <>
      <div className=" flex flex-col justify-center items-center">
        <form className="col shadow-lg" id="updateUser" onSubmit={updatingUser}>
          <label htmlFor="Email" className="form-Label fw-bold mb-2">
            {" "}
            Email{" "}
          </label>
          <div className="input-group">
            <span className="input-group-text">
              <i class="bi bi-envelope"></i>
            </span>
            <input
              type="text"
              name="email"
              class="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:outline:none sm:text-sm sm:leading-6"
              id="inputEmail"
              aria-describedby="emailHelp"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <label htmlFor="Email" className="form-Label fw-bold mt-5 mb-2">
            {" "}
            Role
          </label>

          <div className="input-group ">
            <input
              type="text"
              name="role"
              class="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline:none sm:text-sm sm:leading-6"
              id="inputPassword"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="btn btn-success mt-5"
            style={{ width: "100%" }}
          >
            Submit
          </button>
        </form>
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
    </>
  );
}

export default UpadetUser;
