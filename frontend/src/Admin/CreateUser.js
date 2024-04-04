import axios from "axios";
import React, { useState } from "react";
import "../css/signup.css";
import "../css/error.css";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import {api} from "../utils/Api";

function CreateUser(e) {
  const locationState = useLocation().state
    // const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState(locationState  ? locationState : "");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          const response = await api("/Users/signup", "POST", {}, { email: email, password: password });
          if (response) {
              setEmail('');
              setPassword('');
              toast.success("User created successfully");
          } 
      } catch (error) {
          // console.error("Error creating user:", error);
          if (error.response) {
              const status = error.response?.status;
              const errorMessage = error.response?.data?.error ;
  
              if (status === 409 || status === 400) {
                  toast.error(errorMessage);
              } 
            } 
      }
  };
  

  return (
    <>
      <section className= " bg-white  ">
        <div className="lg:grid lg:grid-cols-1">

          <main className="lg:px-40  py-20">
        <p className="text-lg font-serif text-teal-500   "> Create Account  </p>
              <form  onSubmit={handleSubmit} className="mt-8 grid grid-cols- gap-6">
              <div className="sm:col-span-3 space-y-2">
                  <label
                    for="FirstName"
                    className="block text-sm font-medium text-gray-700 "
                  >
                    Email 
                  </label>

                  <input
                    type="email"
                    id="FirstName"
                    name="first_name"
                      className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none sm:text-sm sm:leading-6"
                    value={email} onChange={(e) => setEmail(e.target.value)} 
                  />
                </div>

               <div className="sm:col-span-3 space-y-2">
                  <label
                    for="PasswordConfirmation"
                    className="block text-sm font-medium text-gray-700"
                  >
                    password
                  </label>

                  <input
                    type="password"
                    id="PasswordConfirmation"
                    name="password_confirmation"
                    className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none sm:text-sm sm:leading-6"
                    value={password} onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                  <button 
                  type="submit"
                  className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500">
                    Create an account
                  </button>
                </div>
              </form>
          </main>
        </div>
      </section>
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

export default CreateUser;
