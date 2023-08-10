import axios from "axios";
import React from "react";
import { useState } from "react";
import "../css/footer.css";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useAuthContext } from "../hooks/useAuthContext";

function Footer() {
  const { user } = useAuthContext();
  const [email, setEmail] = useState("");

  const handelSubmit = async (e) => {
    e.preventDefault();

    try {
      if (email.length === 0) {
        return toast.error("Please provied  an email");
      } else {
        const response = axios.post("http://localhost:4000/news/", {
          email: email,
        });
        if (response) {
          setEmail("");
          toast.success("Thankyou for signing up  to our newsletter");
        }
      }
    } catch (error) {
      if (error.response?.status === 400) {
        return toast.error("You are already a subscriber ");
      }
    }
  };

  return (
    <div className="container-fixed border-top mt-5 mb-0 text-muted ">
      <footer className="  bg   ">
        <div className="row justify-content-center  ">
          <div
            className="  col-md-3 col-lg-4 mt-5 "
            id="footer"
            style={{ width: "300px" }}
          >
            <h4 className="mt-3 text-decoration-underline mb-2 text-mute">
              Social links
            </h4>
            <div className="input-group  ms-4 ">
              <span className="input-group-text border rounded-pill dispaly-1">
                <a href="https://www.facebook.com" target="_blank">
                  {" "}
                  <i className="bi bi-facebook"></i>
                </a>
              </span>
            </div>
            <div className="input-group mt-3 ms-4">
              <span className="input-group-text border rounded-pill">
                <a href="https://www.instagram.com" target="_blank">
                  {" "}
                  <i className="bi bi-instagram"></i>
                </a>
              </span>
            </div>
          </div>

          <div className="  col-lg-4 col-md-4  col-sm-2`  ms-3 mt-5 text-mute  justify-content-center ">
            <h5 className="mt-3 text-decoration-underline ">
              Sign Up For Kausi Agency Updates
            </h5>
            <p className="small">
              By entering your email address below, you consent to
              <br /> receiving our newsletter with access to our latest
              collections, events and initiatives. More details on this are
              provided in our{" "}
            </p>

            <form onSubmit={handelSubmit}>
              <div className="input-group">
                <span className="input-group-text mt-2">
                  <i class="bi bi-envelope-fill"></i>
                </span>

                <input
                  type="email"
                  className="form-control mt-2"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <span className="input-group-text mt-2">
                  <button type="submit" className="btn ">
                    {" "}
                    <i className="bi bi-box-arrow-in-right"></i>
                  </button>
                </span>
              </div>
            </form>
          </div>
          <div className="row mt-5 ms-5 ">
            <a
              href="/HelpCenter"
              className="text-decoration-none text-center mb-5"
            >
              Help center
            </a>

            <p className="text-center">
              {" "}
              <i>&copy;{new Date().getFullYear()} kausi Housing Agency </i>
            </p>
            <p className="text-center">
              <i>
                Crafted by <Link to="">lamech</Link>
              </i>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
