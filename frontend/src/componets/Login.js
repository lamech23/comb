import axios from "axios";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import React, { useState } from "react";
import "../css/Login.css";
import "../css/error.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [error, setError] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();
  const [role, setRole] = useState("");
  const { user } = useAuthContext();

  // this section is when a user clicks on the radio buton he/ she can see the button

  const showPassword = async () => {
    const input = document.querySelector("#inputPassword");

    const button = document.querySelector(".material-symbols-outlined");

    if (input.getAttribute("type") == "password") {
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
      if (email.length === 0 || password.length === 0) {
        return toast.error("Fileds cannot be empty");
      } else if (password.length < 8) {
        return toast.error("password must be  8 or more characters");
      } else {
        const response = await axios
          .post("http://localhost:4000/users/login", {
            email: email,
            password: password,
          })
          //   setLoggedIn(true)

          .then((res) => {
            // console.log(res);
            setEmail("");
            setPassword("");
            setError(null);
            toast.success(`Succesfully logged in`);

            // save user to local storage this means when a user close the browser and opens back to visit ur website they still have that jwt stored for the user so they are still logged in
            localStorage.setItem(
              "credentials",
              JSON.stringify(res.data),
              "token"
            );

            // get the user data from the response
            const userData = res.data;
            document.cookie = `user=${JSON.stringify(userData)}`;

            // update the Auth context
            dispatch({ type: "LOGIN", payload: res.data });
            setIsLoading(false);

            const user = JSON.parse(localStorage.getItem("credentials"));
            let id = user.id;

            const isAdmin = res.data.role;

            if (res.data.loggedIn === "Admin") {
              setRole(isAdmin);
            }

            if (isAdmin === "Admin") {
              navigate("/admin/analytics");
            } else if (isAdmin === "user") {
              navigate('/account');
            } else if (isAdmin === "landowner") {
              navigate(`/LandownerDashbard`);
            } else if (isAdmin === "tenant") {
              navigate("/LandownerDashbard");
            } else {
              navigate("/");
            }
          });
     
      }
    } catch (error) {
      if (error.response?.status === 403) {
        return toast.error("your account is not activated ");
      }
      if (error.response?.status === 400) {
        return toast.error("incorrect email or password please try again ");
      }
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

            <div className="mb-10 mt-5">   
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

            <div>
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
            </div>
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
      {/* <ToastContainer
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
      /> */}
    </div>
  );
}

export default Login;
