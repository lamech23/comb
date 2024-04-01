import React, { useEffect, useState } from "react";

import "../css/userPage.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { isUser } from "../utils/Decoded";
import { api } from "../utils/Api";

function ChangeProfile() {
  const { id } = useParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  const user = isUser()?.userId;
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
        return toast.error("Password Does Not match");
      }
    }
  };

  //updating user
  const updatingUser = async (e) => {
    e.preventDefault();
    const  response = await api("/Users/userUpdate/","PATCH", {}, {email:email})
      if (response) {
     
        toast.success("updated successfully");
      }
  };

  const fetchUserById = async () => {
    const response = await api(`/users/specificUser/`,"GET", {},{});
   
    setEmail(response.User);
  };

  const userEmail =  email?.email
  useEffect(() => {
    fetchUserById();
  }, []);

  return (
    <>
      <section class="py-40 bg-gray-100  bg-opacity-50 h-screen">
        <div class="mx-auto container max-w-2xl md:w-3/4 shadow-md">
          <div class="bg-white space-y-6">
            <div class="md:inline-flex space-y-4 md:space-y-0 w-full p-4 text-gray-500 items-center">
              <h2 class="md:w-1/3 max-w-sm mx-auto">Account</h2>
              <form onSubmit={updatingUser} class="md:w-2/3 max-w-sm mx-auto">
                <label class="text-sm text-gray-400">Email</label>
                <div class="w-full inline-flex border">
                  <div class="pt-2 w-1/12 bg-gray-100 bg-opacity-50">
                    <svg
                      fill="none"
                      class="w-6 text-gray-400 mx-auto"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <input
                    type="email"
                    class="w-11/12 focus:outline-none focus:text-gray-600 p-2"
                    placeholder="email@example.com"
                    onChange={(e) => setEmail(e.target.value)}
                    value={userEmail}
                  />
                </div>
                <button
                  type="submit"
                  class=" mt-2 align-middle inline-flex bg-blue-500 hover:bg-blue-600 text-center px-4 py-2 text-white text-sm font-semibold rounded-lg  shadow-lg"
                >
                  <svg
                    fill="none"
                    class="w-4 text-white mr-2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  Update
                </button>
              </form>
            </div>

            <hr />
            <div class="md:inline-flex  space-y-4 md:space-y-0  w-full p-4 text-gray-500 items-center">
              <h2 class="md:w-4/12 max-w-sm mx-auto">Change password</h2>
              <form
                onSubmit={resetPassword}
                class="md:w-2/3 mx-auto max-w-sm space-y-5"
              >
                <div>
                  <label class="text-sm text-gray-400">Password</label>
                  <div class="w-full inline-flex border">
                    <div class="w-1/12 pt-2 bg-gray-100">
                      <svg
                        fill="none"
                        class="w-6 text-gray-400 mx-auto"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                    </div>
                    <input
                      type="text"
                      class="w-11/12 focus:outline-none focus:text-gray-600 p-2"
                      placeholder="*****"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                    />
                  </div>
                </div>
                <div>
                  <label class="text-sm text-gray-400">confirm Password</label>
                  <div class="w-full inline-flex border">
                    <div class="pt-2 w-1/12 bg-gray-100">
                      <svg
                        fill="none"
                        class="w-6 text-gray-400 mx-auto"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                    </div>
                    <input
                      type="text"
                      class="w-11/12 focus:outline-none focus:text-gray-600 p-2"
                      placeholder="****"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      value={confirmPassword}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  class="align-middle inline-flex bg-blue-500 hover:bg-blue-600 text-center px-4 py-2 text-white text-sm font-semibold rounded-lg  shadow-lg"
                >
                  <svg
                    fill="none"
                    class="w-4 text-white mr-2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  Update
                </button>
              </form>
            </div>

            <hr />
          </div>
        </div>
      </section>

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
