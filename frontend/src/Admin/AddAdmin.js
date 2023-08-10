import React, { useState } from "react";
import { Link } from "react-router-dom";
import MainNav from "./MainNav";
import SideNavigation from "./SideNavigation";
import "../css/admin.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function AddAdmin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState("");
  const [role, setRole] = useState("");

  const handelSubmit = async (e) => {
    e.preventDefault();

    const response = await axios.post("http://localhost:4000/users/signup", {
      email: email,
      password: password,
    });
    toast.success("Added");
  };
  return (
    <>
      <MainNav />
      <div className="split">
        <SideNavigation />
        <div className="adminForm  align-center justify-content center">
          <form className="col" id="adminForm" onSubmit={handelSubmit}>
            <label htmlFor="Email" className="form-Label fw-bold">
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
                className="form-control"
                id="inputEmail"
                aria-describedby="emailHelp"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <label htmlFor="Email" className="form-label fw-bold">
              {" "}
              Password
            </label>
            <div className="input-group">
              <span className="input-group-text">
                <i class="bi bi-lock"></i>
              </span>

              <input
                type="password"
                name="password"
                className="form-control"
                id="inputPassword"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <label className="label-control">select</label>
            <select
              className="form-control mt-2"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option selected>select</option>
              <option value="role">Admin</option>
            </select>

            <button
              type="submit"
              className="btn btn-success mt-3"
              style={{ width: "100%" }}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddAdmin;
