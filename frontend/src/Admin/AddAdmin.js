import React, { useState } from "react";
import "../css/admin.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {api} from "../utils/Api";
function AddAdmin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handelSubmit = async (e) => {
    e.preventDefault();
    const response = await api("/users/signup", "POST", {}, { email: email, password: password });
    if (response.success) {
      setEmail('');
      setPassword('');
      toast.success("User created successfully");
    } else {
      // Handle error if necessary
      toast.error("Failed to create user");
    }
  };

  return (
    <>
      <div className="split">
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

export default AddAdmin;
