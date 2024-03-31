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
    <footer class="bg-gray-100">
        <div class="container px-6 py-12 mx-auto">
            <div class="mx-auto ">
                <div class="sm:col-span-2">
                    <h1 class="max-w-lg text-xl font-semibold tracking-tight text-gray-800 xl:text-2xl">Subscribe our newsletter to get update.</h1>
                    <p>
                    By entering your email address below, you consent to
                    <br /> receiving our newsletter with access to our latest
                    collections, events and initiatives. More details on this are
                    provided in our
                    </p>
                    <form  onSubmit={handelSubmit} class="flex flex-col mx-auto mt-6 space-y-3 md:space-y-0 md:flex-row">
                        <input id="email"          value={email}
                            onChange={(e) => setEmail(e.target.value)} 
                            type="text" class="px-4 py-2 text-gray-700 bg-white border rounded-md dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300" placeholder="Email Address"/>
                
                        <button class="w-full px-6 py-2.5 text-sm font-medium tracking-wider text-white transition-colors duration-300 transform md:w-auto md:mx-4 focus:outline-none bg-gray-800 rounded-lg hover:bg-gray-700 focus:ring focus:ring-gray-300 focus:ring-opacity-80">
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>
            
            <hr class="my-6 border-gray-200 md:my-8 dark:border-gray-700"/>
            
            <div class="flex items-center justify-between">
              <a
                href="/HelpCenter"
                className="text-decoration-none text-center mb-5"
              >
                Help center
              </a>
                
                <div class="flex -mx-2">
                    <div>
                  <span className="input-group-text border rounded-pill dispaly-1">
                    <a href="https://www.facebook.com" target="_blank">
                      {" "}
                      <i className="bi bi-facebook"></i>
                    </a>
                  </span>
                </div>
                <div>
                  <span className="input-group-text border rounded-pill">
                    <a href="https://www.instagram.com" target="_blank">
                      {" "}
                      <i className="bi bi-instagram"></i>
                    </a>
                  </span>
                </div>

                </div>
            </div>

                <p className="text-center">
                  {" "}
                  <i>&copy;{new Date().getFullYear()} kausi Housing Agency </i>
                </p>
        </div>
    </footer>

    </div>
  );
}

export default Footer;
