import axios from "axios";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import React, { useState } from "react";
import "../css/Login.css";
import "../css/error.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getUserRoles } from "../utils/AccesToken";

function Login() {
  const [error, setError] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const userRoles = getUserRoles();
  const [showPasscode, setShowPasscode] = useState(false);


  const showPassword = async () => {
    const input = document.querySelector("#inputPassword");
    const button = document.querySelector(".material-symbols-outlined");

    if (input.getAttribute("type") === "password") {
      input.setAttribute("type", "text");
      button.innerHTML = "visibility";
    } else {
      input.setAttribute("type", "password");
      button.innerHTML = "visibility_off";
    }
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // if (email.length === 0 || password.length === 0) {
      //   toast.error("Fields cannot be empty");
      // } else if (password.length < 8) {
      //   toast.error("Password must be 8 or more characters");
      // } else {
        const response = await axios.post("http://localhost:4000/Users/login", {
          email: email,
          password: password,
        });

        const user = response.data;
        document.cookie = `user=${JSON.stringify(user)}`;
        dispatch({ type: "LOGIN", payload: user });

        // toast.success(`Successfully logged in`);
      // }
      if (response?.data?.success) {
        console.log("Response success!");
        console.log("User roles:", userRoles);
    
        if (userRoles.includes("admin") || user.role.includes("agent")) {
            console.log("Redirecting to /admin/analytics");
            navigate("/admin/analytics");
        } else if (userRoles.includes("userRoles")) {
            console.log("Redirecting to /");
            navigate("/");
        } else if (userRoles.includes("landowner")) {
            console.log("Redirecting to /LandownerDashboard");
            navigate("/LandownerDashboard");
        } else if (userRoles.includes("tenant")) {
            console.log("Redirecting to /TenantDashboard");
            navigate("/TenantDashboard");
        } else {
            console.log("No matching role, redirecting to /");
            navigate("/");
        }
    }
    

    } catch (error) {
      if (error.response?.status === 403) {
        const errorMessage = error.response.data.error
        toast.error(errorMessage);
      }
    
      if (error.response?.status === 404) {
        const errorMessage = error.response.data.error
        toast.error(errorMessage);   
         }
         if (error.response?.status === 400) {
          const errorMessage = error.response.data.error
          toast.success(errorMessage);   
          setShowPasscode(true)
           }
       
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="log row ">
      {loggedIn && (
        <div className="text-center  mb-5 alert alert-danger">
          {" "}
          succesfully logged in{" "}
        </div>
      )}
      <div className="container-fluid ">
        <div className=" login_page   justify-content-center items-center lg:w-fit  ">
          <h5 className="text-center text-info">Login </h5>

          <form onSubmit={handelSubmit} className="col lg:w-fit ">
            <div className="mb-5">
              <label htmlFor="Email" className="form-Label fw-bold">
                {" "}
                Email{" "}
                <span className="pl-2 input-group-text">
                  <i className="bi bi-envelope"></i>
                </span>
              </label>
              <div className="input-group">
                <input
                  type="text"
                  name="email"
                  class="block w-full rounded-md border-0 px-3 py-1.5 text-black  bg-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none sm:text-sm sm:leading-6"
                  id="inputEmail"
                  aria-describedby="emailHelp"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className={`input-group mb-5  ${showPasscode ? "visible" : "hidden"}`}>
              <label htmlFor="Email" className="form-label fw-bold">
                {" "}
                Password
                <span className="pl-2 input-group-text">
                  <i className="bi bi-lock"></i>
                </span>
              </label>
              <div className="input-group">
                <div className="relative">
                  <input
                    type="password"
                    name="password"
                    class=" block w-full rounded-md border-0 px-3 py-1.5 text-black  bg-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none sm:text-sm sm:leading-6"
                    id="inputPassword"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div className="absolute right-5 top-0 input-group-text w-fit">
                    <span
                      className=" showPasscode material-symbols-outlined text-3xl cursor-pointer text-teal-500"
                      onClick={showPassword}
                    >
                      visibility_off
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="form-text text-white">
              Don't share your password with anyone else...
            </div>

            <button
              type="submit"
              className="btn btn-success"
              style={{ width: "100%" }}
            >
              Submit
            </button>

            {/* <div>
              <p className="text-end mt-3 text-white ">
                Don't have an account please click here to
                <Link
                  className="text-decoration-none fs-5 text-info"
                  to="/SignUp"
                  id="reg"
                >
                  {" "}
                  Register
                </Link>
              </p>
            </div> */}
            <div className=" mt-2">
              <Link
                className="text-decoration-none fs-5 text-info"
                to="/ForgotPassword"
                data-modal-target="default-modal"
                data-modal-toggle="default-modal"
              >
                {" "}
                Forgot password?
              </Link>
            </div>
          </form>
          {/* message modal if user is in active */}
        </div>
        {error && (
          <div className="alert alert-danger mt-5 text-center w-5" id="errors">
            {error}
          </div>
        )}

        <div />
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
    </div>
  );
}

export default Login;
