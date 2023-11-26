import React, { useEffect, useState } from "react";
import MainNav from "../Admin/MainNav";
import SideNavigation from "../Admin/SideNavigation";
import "../css/admin.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuthContext } from "../hooks/useAuthContext";

function HouseRegistration() {
  const [house_name, setHouse_name] = useState("");
  const [full_name, setFull_name] = useState("");
  const [user_name, setUser_name] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [location, setLocation] = useState("");
  const [password, setPassword] = useState("");
  const [allUser, setAllusers] = useState([]);
  const [user_id, setUser_id] = useState([]);
  const { user } = useAuthContext();

  useEffect(() => {
    const getAlluser = async () => {
      const response = await axios.get(
        "http://localhost:4000/houseRegister/allHouses"
      );
      setAllusers(response.data);
    };
    getAlluser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user) {
      setUser_id(user.id);
    }

    const response = await axios.post("http://localhost:4000/houseRegister/", {
      house_name: house_name,
      full_name: full_name,
      user_name: user_name,
      contact: contact,
      location: location,
      user_id: user_id,
    });

    if (response) {
      setHouse_name("");
      setFull_name("");
      setUser_name("");
      setEmail("");
      setContact("");
      setLocation("");
      setPassword("");
      toast.success("succesfully Registerd ");
    }
  };
  return (
    <>
      <div className="registerHouse">
        <h3 className="house_top">House Details</h3>

        <form onSubmit={handleSubmit}>
          <label for="" className="form-label">
            House Name
          </label>
          <select
            type="text"
            name="house_name"
            id="house_name"
            className="form-control"
            placeholder=""
            value={house_name}
            onChange={(e) => setHouse_name(e.target.value)}
          >
            <option value="" sele>
              Select a house
            </option>

            {allUser.map((users) => (
              <option className="text-black" key={users.id} value={users.id}>
                {" "}
                {users.house_name}
              </option>
            ))}
          </select>

          <label for="" className="form-label">
            Fullnames
          </label>
          <input
            type="text"
            name="full_name"
            id=""
            className="form-control"
            placeholder=""
            value={full_name}
            onChange={(e) => setFull_name(e.target.value)}
          />

          <label for="" className="form-label">
            user Name
          </label>
          <input
            type="text"
            name="user_name"
            id=""
            className="form-control"
            placeholder=""
            value={user_name}
            onChange={(e) => setUser_name(e.target.value)}
          />

          <label for="" className="form-label">
            Contact
          </label>

          <input
            type="text"
            name="Contact"
            id=""
            className="form-control"
            placeholder=""
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />
          <label for="" className="form-label">
            Location
          </label>

          <input
            type="text"
            name="location"
            id=""
            className="form-control"
            placeholder=""
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <button
            className="btn btn-outline-success mt-3 justifiy-content-center "
            type="submit"
            style={{ width: "100%" }}
          >
            submit
          </button>
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

export default HouseRegistration;
