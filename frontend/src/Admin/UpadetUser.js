import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "../css/admin.css";
import MainNav from "./MainNav";
import SideNavigation from "./SideNavigation";

function UpadetUser() {
  const { id } = useParams();
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const elevetUser = async (e) => {
    const response = await axios.get(
      `http://localhost:4000/Users/specificUser/${id}`
    );
    setEmail(response.data.email);
    setRole(response.data.role);
  };

  const updatingUser = async (e) => {
    e.preventDefault();
    const response = await axios.put(
      `http://localhost:4000/Users/userUpdate/${id}`,
      {
        email: email,
        role: role,
      }
    );
    if (response) {
      let user = JSON.parse(localStorage.getItem("credentials"));
      user.email = email;
      user.role = role;
      localStorage.setItem("credentials", JSON.stringify(user));
      toast.success("updated successfully");
    }
  };

  useEffect(() => {
    elevetUser();
  }, []);
  return (
    <>
      <MainNav />
      <div className="split">
        <SideNavigation />

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
              className="form-control"
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
              className="form-control"
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
    </>
  );
}

export default UpadetUser;
