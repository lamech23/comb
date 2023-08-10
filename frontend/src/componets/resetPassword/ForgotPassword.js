import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ForgotPassword() {
  const url = "http://localhost:4000/users/forgotPassword";
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [status, setStatus] = useState(false)

  const handelSubmit = async (e) => {
    e.preventDefault();
    setStatus("submiting");
    const data = {
      email: email,
    };
    try {
      if (email.length == 0) {
        return toast.error("Filed cannot be empty");
      } else {
        await axios.post(url, data).then((res) => {
          setEmail("");
          setError(null);
          return toast.success("Recovery email sent please check your gmail ");
        });
        setStatus(false);
      }
    } catch (error) {
      if (error.response?.status === 200) {
        return toast.error("Recovery email sent ");
      }
      if (error.response?.status === 404) {
        return toast.error("Email doe's not exist please use a valid email ");
      }
    }
  };

  return (
    <>
      <div className="log">
        <div className="container-fluid ">
          <div className=" login_page align-center justify-content center">
            <h5 className="text-center text-info">Forgot Password </h5>
            <form onSubmit={handelSubmit} className="col">
              <label htmlFor="Email" className="form-Label fw-bold mt-4">
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

              {status === "submiting" ? (
                <button
                  style={{ width: "100%" }}
                  className="btn btn-success mt-4 "
                >
                  submiting...
                </button>
              ) : (
                <button
                  type="submit"
                  className="btn btn-success mt-4 "
                  style={{ width: "100%" }}
                >
                  Submit
                </button>
              )}
            </form>
            {error && (
              <div
                className="   alert alert-danger mt-5 text-center w-5"
                id="errors"
              >
                {error}
              </div>
            )}
          </div>
          {/* {error && <div className='alert alert-danger mt-5 text-center w-5' id='errors'>{error}</div>} */}

          <div />
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

export default ForgotPassword;
