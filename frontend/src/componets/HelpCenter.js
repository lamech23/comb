import axios from "axios";
import React, { useState } from "react";
import "../css/help.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function HelpCenter() {
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");

  const handelSubmit = async (e) => {
    e.preventDefault();

    if ((email === "", description === "")) {
      return toast.error("Fields cannot be empty");
    } else {
      const res = await axios.post("http://localhost:4000/help", {
        email: email,
        description: description,
      });

      if (res) {
        toast.success("Succesfully  sent");
      }
    }
  };
  return (
    <>
     
     <div class="container mx-auto px-4 flex flex-col justify-center items-center gap-5 py-10">
    <div class="w-full md:w-3/4 lg:w-2/3 xl:w-1/2 shadow-lg p-10 bg-white rounded-lg">
        <div class="text-center">
            <span class="text-5xl text-info">
                <i class="bi bi-headset"></i>
            </span>
        </div>
        <div>
            <h1 class="text-center mt-2 text-4xl font-bold text-gray-800">Kausi Customer Care</h1>
            <p class="text-center mt-2 text-lg text-gray-600">How can we help you?</p>
        </div>

        <form onSubmit={handelSubmit} class="mt-5">
            <div class="mb-4">
                <input
                    type="email"
                    class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-400"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div class="mb-4">
                <textarea
                    class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-400"
                    id="textfield"
                    rows="4"
                    placeholder="Describe your issue"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>
            </div>
            <button
                type="submit"
                class="w-full px-6 py-3 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
            >
                Submit
            </button>
        </form>
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

export default HelpCenter;
