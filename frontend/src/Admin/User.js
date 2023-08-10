import React, { useEffect, useState } from "react";
import MainNav from "./MainNav";
import SideNavigation from "./SideNavigation";
import axios from "axios";
import "../css/userPage.css";
import { Link, useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthContext } from "../hooks/useAuthContext";

function User() {
  const { user } = useAuthContext();
  const { id } = useParams();
  console.log(id);
  
  const [users, setUsers] = useState([]);

  const updateStatus = async (state) => {
    const response = await axios.patch(
      `http://localhost:4000/Users/userStatus/${id}?Active=`+ state,
    );
    console.log(response);
  };
  useEffect(() => {
    fetchUsers();
  }, []);


  const deactivate = () => {
    let state = "inActive";
    updateStatus(state, id);
  };

  
  const activate = () => {
    let state = "active";
    updateStatus(state, id)
  };

  const fetchUsers = async () => {
    const response = await axios.get("http://localhost:4000/Users/all");
    setUsers(response.data);
  };
  const handelDelete = async (id) => {
    const res = await axios.delete(`http://localhost:4000/Users/${id} `);
    fetchUsers();
  };

  return (
    <>
      <MainNav />
      <div className="split">
        <SideNavigation />

        <div className="mt-4">
          <table className="table">
            <thead>
              <tr>
                <th>id</th>
                <th>Email</th>
                <th>Role</th>
                <th>House</th>
                <th>Edit</th>
                <th>Delete</th>
                <th>status</th>
              </tr>
            </thead>
            {users.map((allUsers) => (
              <tbody key={allUsers.id}>
                <td>{allUsers.id}</td>
                <td>{allUsers.email}</td>
                <td>{allUsers.role}</td>
                <td>{allUsers.house_name}</td>
                <td>
                  <Link
                    to={`/UpdateUser/${allUsers.id}`}
                    type="button"
                    className="material-symbols-outlined text-decoration-none"
                    style={{ color: "blue" }}
                  >
                    edit
                  </Link>
                </td>

                <td>
                  <span
                    onClick={() => handelDelete(allUsers.id)}
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
                        className="btn btn-success"
                        onClick={deactivate}
                      >
                        Activated
                      </button>
                    ) : allUsers.Active === "inActive" ? (
                      <button
                        type="button"
                        onClick={activate}
                        className="btn btn-danger"
                      >
                        Deactivated
                      </button>
                    ) : null}
                  </span>
                </td>
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </>
  );
}

export default User;
