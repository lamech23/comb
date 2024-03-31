import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/userPage.css";
import { Link, useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import io from "socket.io-client";
import { ServerUrl } from "../utils/ServerUrl";
import { ToastContainer, toast } from "react-toastify";
import { api } from "../utils/Api";
import { isAdmin } from "../utils/Decoded";

function User() {
  const [socket, setSocket] = useState(null);
  const newSocket = io(ServerUrl);
  const [users, setUsers] = useState([]);
  const [house, setHouse] = useState([]);
  const [agent, setAgent] = useState("");
  const admin = isAdmin();
  useEffect(() => {
    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
    };
  }, []);

  // get the instance  of the two  userId and  houseId
  const handleHouseSelection = (agentId, houseId) => {
    setAgent({
      agentId,
      houseId: Number(houseId),
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:4000/users/assing",
        agent
      );

      if (response) {
        toast.success("assigned  successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchHouse = async () => {
    const response = await api("/Details/housesLinkedToTenants", "GET", {}, {});
    setHouse(response.details);
  };

  const fetchUsers = async () => {
    const response = await api("/Users/all", "GET", {}, {});
    setUsers(response.user);
  };

  useEffect(() => {
    fetchUsers();
    fetchHouse();

    if (socket === null) return;

    socket.emit("allUsers", users);

    socket.on("getAllUsers", (res) => {
      setUsers(res);
    });

    fetchUsers();

    return () => {
      // component is being unmounted
      socket.off("disconnect");
    };
  }, [socket]);

  useEffect(() => {
    if (socket === null) return;
    // socket.emit("updating", id, state);
    socket.on("updatingUser", (res) => {
      updateStatus(res);
    });
  }, []);

  const updateStatus = async (id, state) => {
    const response = await axios.patch(
      `http://localhost:4000/Users/userStatus/${id}?Active=` + state
    );
  };

  const verifyingUser = async (id, verified) => {
    const response = await axios.patch(
      `http://localhost:4000/Users/verifyUser/${id}?verified=` + verified
    );
  };

  const deactivate = (id) => {
    let state = "inActive";
    updateStatus(id, state);
  };

  const activate = (id) => {
    let state = "active";
    updateStatus(id, state);
  };

  const Verify = (id) => {
    let verified = 1;
    verifyingUser(id, verified);
  };

  const handelDelete = async (id) => {
    const res = await axios.delete(`http://localhost:4000/Users/${id} `);
    fetchUsers();
  };

  useEffect(() => {
    if (socket === null) return;
    // socket.emit("updating", users?.id)
  }, [socket]);

  return (
    <>
      <div className="card w-full p-6 bg-base-100 shadow-xl ">
        <p>Manage Users </p>
        <div className="divider mt-2"></div>
        {/* Team Member list in table format loaded constant */}
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th>id</th>
                <th>Email</th>
                <th>Role</th>
                <th>House Managing </th>
                <th>Assign House</th>
                <th>Actions</th>
              </tr>
            </thead>
            {users &&
              users?.map((allUsers) => (
                <tbody key={allUsers.id}>
                  <tr>
                    <td>{allUsers.id}</td>
                    <td>{allUsers.email}</td>
                    <td>{allUsers.role}</td>
                    <td>{allUsers?.agent[0]?.house?.houseName}</td>
                    <td>
                      <select
                        className="p-2 rounded-md"
                        onChange={(e) =>
                          handleHouseSelection(allUsers.id, e.target.value)
                        }
                      >
                        <option value="">Select house ...</option>
                        {house &&
                          house?.map(
                            (h, index) =>
                              !allUsers?.agent[0]?.house?.houseName.includes(
                                h.houseName
                              ) && (
                                <option key={index} value={h.id}>
                                  {h.houseName}
                                </option>
                              )
                          )}
                      </select>
                    </td>

                    <td className="flex gap-2">
                      <button
                        onClick={handleSave}
                        type="submit"
                        className="whitespace-nowrap rounded-full bg-greeen-100 px-2.5 py-0.5 bg-green-200 text-sm text-green-700"
                      >
                        Assign
                      </button>
                      <Link
                        to={`/UpdateUser/${allUsers.id}`}
                        type="button"
                        className="material-symbols-outlined text-decoration-none text-green-700"
                      >
                        edit
                      </Link>
                      <span
                        onClick={() => handelDelete(allUsers.id)}
                        type="button"
                        className="material-symbols-outlined cursor-pointer"
                        style={{ color: "red" }}
                      >
                        delete
                      </span>{" "}
                      <span>
                        {allUsers.Active === "active" ? (
                          <button
                            type="button"
                            className={
                              "whitespace-nowrap rounded-full bg-greeen-100 px-2.5 py-0.5 bg-green-200 text-sm text-green-700"
                            }
                            onClick={() => deactivate(allUsers.id)}
                          >
                            active
                          </button>
                        ) : allUsers.Active === "inActive" ? (
                          <button
                            type="button"
                            onClick={() => activate(allUsers.id)}
                            className="whitespace-nowrap rounded-full bg-red-100 px-2.5 py-0.5 text-sm text-red-700"
                          >
                            inActive
                          </button>
                        ) : null}
                      </span>
                      <button
                        type="button "
                        onClick={() => Verify(allUsers.id)}
                        class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                      >
                        Verify
                      </button>{" "}
                    </td>
                  </tr>
                </tbody>
              ))}
          </table>
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

export default User;
