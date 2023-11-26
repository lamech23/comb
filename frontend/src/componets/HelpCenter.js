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
      <div className="text-center mt-5 display-1 text-info ">
        <span>
          <i class="bi bi-headset"></i>
        </span>
      </div>
      <div className="card shadow-lg">
        <p className="text-center mt-2 display-3 ">Kausi coustomer care</p>
        <p className="text-center  display-6 mt-5">How can we help you?</p>

        <form onSubmit={handelSubmit}>
          <div className="mb-3  justify-center" id="FormControlInput1">
            <input
              type="email"
              className="form-control"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mt-4 m-3">
            <textarea
              className="form-control"
              id="textfield"
              placeholder="Describe your issue "
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button
              type="submit"
              className="btn btn-success mt-3 justify-center"
            >
              Submit
            </button>
          </div>
        </form>
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
