import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/userPage.css";
import { Link, useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthContext } from "../hooks/useAuthContext";
import io from "socket.io-client";
import { ServerUrl } from "../utils/ServerUrl";

function User() {
  const [socket, setSocket] = useState(null);
  const newSocket = io(ServerUrl);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
    };
  }, []);

  const fetchUsers = async () => {
    const response = await axios.get("http://localhost:4000/Users/all");
    setUsers(response.data);
  };

  useEffect(() => {
    fetchUsers();

    if (socket === null) return;

    socket.emit("allUsers", users);

    socket.on("getAllUsers", (res) => {
      console.log(res);
      setUsers(res)
    });

    fetchUsers();

    return ()=>{
      // component is being unmounted
      socket.off("disconnect")
    }
  }, [socket]);

  useEffect(()=>{
    if (socket === null) return;
    // socket.emit("updating", id, state);
    socket.on("updatingUser", (res) => {
    updateStatus(res)
  })
  },[])

  const updateStatus = async (id, state) => {
    const response = await axios.patch(
      `http://localhost:4000/Users/userStatus/${id}?Active=` + state
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
                    <p>Help Center</p>
            <div className="divider mt-2"></div>
                {/* Team Member list in table format loaded constant */}
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                    <tr>
                    <th>id</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Edit</th>
                    <th>Delete</th>
                    <th>status</th>
                    </tr>
                    </thead>
                    {users.map((allUsers) => (
                    <tbody key={allUsers.id}>
                       <tr>
                       <td>{allUsers.id}</td>
                      <td>{allUsers.email}</td>
                      <td>{allUsers.role}</td>
                       <td>
                <Link
                  to={`/UpdateUser/${allUsers.id}`}
                  type="button"
                  className="material-symbols-outlined text-decoration-none text-green-700"
                >
                  edit
                </Link>
              </td>

              <td>
                <span
                  onClick={handelDelete}
                  type="button"
                  className="material-symbols-outlined"
                  style={{ color: "red" }}
                >
                  delete
                </span>
              </td>

              <td>
                {" "}
                <span>
                  {allUsers.Active === "active" ? (
                    <button
                      type="button"
                      className={"whitespace-nowrap rounded-full bg-greeen-100 px-2.5 py-0.5 text-sm text-green-700"}
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
              </td>
                      </tr>        
                    </tbody>
                ))}
                </table>
            </div>
       </div>

    </>
  );
}

export default User;
