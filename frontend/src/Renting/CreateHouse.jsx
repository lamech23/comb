import React, { useState } from "react";
import LandOwnerNav from "./LandOwnerNav";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";

function CreateHouse() {
  const [house_name, setHouse_name] = useState("");
  const [user_id, setUser_id_] = useState("");
  const { user } = useAuthContext();
  const [successMessage, setSuccessMesssage] = useState("");
  const [errors, setErrors] = useState("");

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      if (user) {
        setUser_id_(user.id);
      }

      if (house_name.length === 0) {
        setErrors("Please fill all the fields");
      } else {
        const response = await axios.post(
          "http://localhost:4000/houseRegister/houseName",
          { house_name: house_name, user_id: user_id }
        );
        if (response) {
          setErrors(null);
          setHouse_name("");
          setSuccessMesssage("House name created succesfully");
        }
      }
    } catch (error) {
      setErrors(error.messsage || "something went wrong please try again");
    } finally {
      setSuccessMesssage("");
    }
  };

  return (
    <>
      <div className="split">

        <div class="mb-6">
          <form onSubmit={handelSubmit}>
            <label
              for="username-success"
              class="block mb-2 text-sm font-medium text-green-700 dark:text-green-500"
            >
              Please Enter Your House Name
            </label>
            <input
              type="text"
              id="username-success"
              class="bg-green-50 border border-green-500 text-green-900 placeholder-green-700 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-green-100 dark:border-green-400"
              placeholder="eg: K-10 , K-11"
              onChange={(e) => setHouse_name(e.target.value)}
            />
            {/* {(successMessage || errors)  && (
      <div
      className={`p-3 rounded-lg mt-4 ${
        errors ? "text-red-500 bg-red-100" : "text-green-500 bg-green-100"
      }`}
    >
      {successMessage || errors }
    </div>
    )} */}

            <button
              className=" border p-2 justify-center items-center rounded-full  text-teal-600 hover:bg-teal-900 mt-3"
              type="submit"
            >
              {" "}
              submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default CreateHouse;
