import React, { useEffect, useState } from "react";
import UserNav from "./UserNav";
import "../css/userPage.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

function ChangeProfile() {
  const { id } = useParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [user, setUser] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("credentials"));
    if (user) setUser(user.id);
  }, []);
  //reset password
  const resetPassword = async (e) => {
    e.preventDefault();

    try {
      if (password.length === 0 || confirmPassword.length === 0) {
        return toast.error("please add a password ");
      }
      const response = await axios.put(
        `http://localhost:4000/users/reset/${user.id}`,
        {
          password: password,
          confirmPassword: confirmPassword,
        }
      );
      return toast.success("Password succesfully updated");
    } catch (error) {
      if (error.response.message) {
        return toast.error("Password Does Not match" );
      }
    }
  };

  //updating user
  const updatingUser = async (e) => {
    e.preventDefault();
    const response = await axios.put(
      `http://localhost:4000/Users/userUpdate/${id}`,
      {
        email: email,
      }
    );
    if (response)
      if (response) {
        let user = JSON.parse(localStorage.getItem("credentials"));
        user.email = email;
        localStorage.setItem("credentials", JSON.stringify(user));
        toast.success("updated successfully");
      }
  };

  const fetchUserById = async () => {
    const response = await axios.get(
      `http://localhost:4000/Users/specificUser/${id}`
    );
    setEmail(response.data.email);
  };
  useEffect(() => {
    fetchUserById();
  }, []);

  return (
    <>
      <div className="userSplit">
        <UserNav />

        {/* email */}

        <section>
          <form onSubmit={updatingUser}>
            <div className=" card mb-3 shadow-sm" id="userEmail">
              <div className="card-title text-center fs-2 fw-300">
                Change Email
              </div>
              <label className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />

              <button
                type="submit"
                className="btn btn-primary mt-5"
                id="btn-password"
              >
                Submit
              </button>
            </div>
          </form>

          {/* change Password */}

          <form onSubmit={resetPassword}>
            <div className=" card mb-3 shadow-sm" id="userEmail">
              <div className="card-title text-center fs-2 fw-300">
                Change Password
              </div>
              <label className="form-label">password</label>
              <input
                type="password"
                className="form-control"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <label className="form-label "> confirm password</label>
              <input
                type="password"
                className="form-control"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
              />

              <button
                type="submit"
                className="btn btn-primary mt-5"
                id="btn-password"
              >
                Submit
              </button>
            </div>
          </form>
        </section>
      </div>
      <ToastContainer
        position="top-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default ChangeProfile;
