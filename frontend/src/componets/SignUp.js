import axios from "axios";
import React, { useState } from "react";
import "../css/signup.css";
import "../css/error.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState(false);
  const [signedUp, setSignUp] = useState(false);
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const strongRegExp = /(?=.*?[#?!@$%^&£*-])/;
    const poorPassword = strongRegExp.test(password);

    try {
      if (email.length === 0 || password.length === 0) {
        return toast.error("Fileds cannot be empty");
      } else if (password.length < 8) {
        return toast.error("password must be  8 or more characters");
      } else if (!poorPassword) {
        return toast.error(" Weak password special Character required ");
      } else {
       
        const response = await axios.post(
          "http://localhost:4000/users/signup",
          {
            email: email,
            password: password,
          }
        );
        setSignUp(true);
        toast.success("Succesfully Signed up ");

        if (response) {
          setEmail("");
          setPassword("");
          setError(null);

          setTimeout(() => {
            {
              navigate("/Login");
            }
            setSignUp(false);
          }, 3000);
          setIsLoading(false);
        }

        if (!response) {
          setIsLoading(false);
        }
      }
    } catch (error) {
      if (error.response?.status === 401) {
        return toast.error("invalid email format");
      }

      if (error.response?.status === 400) {
        return toast.error("Email already exists");
      }
    }
  };

  return (
    <>
      <div className="bodys row">
        {/* {signedUp && <div className='text-center alert alert-danger'>Succesfully Signed up </div>} */}
        <div className="container-lg" style={{ marginBottom: "200px" }}>
          <div className="app justify-center items-center  lg:w-fit">
            <h5 className="text-center mb-3 text-info fw-bold">Sign up</h5>
            <form onSubmit={handleSubmit} className=" col lg:w-fit">
              <label htmlFor="InputEmail" className="form-label">
                Email address
              </label>
              <div className="input-group">
                <span className="input-group-text">
                  <i class="bi bi-envelope"></i>
                </span>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  id="InputEmail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <label htmlFor="InputPassword" className="form-label">
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

              <button
                type="submit"
                className="btn btn-primary mt-4"
                style={{ width: "100%" }}
              >
                Submit
              </button>
              {error && (
                <div className=" alert alert-danger mt-5 text-center">
                  {error}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
