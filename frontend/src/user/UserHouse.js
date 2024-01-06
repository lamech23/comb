import axios from "axios";
import React, { useEffect, useState } from "react";
import UserNav from "./UserNav";

function UserHouse() {
  const [userInfomation, setUserInformation] = useState([]);

  try {
    useEffect(() => {
      fettchUserInfo();
    }, []);
    const fettchUserInfo = async () => {
      const user = JSON.parse(localStorage.getItem("credentials"));
      let id = user.id;

      const response = await axios.get(
        `http://localhost:4000/Details?user_id=` + id
      );
      setUserInformation(response.data);
    };
  } catch (error) {}
  return (
    <>
      <div className="">
        <div className="mt-4">
          <table className="table">
            <thead>
              <tr>
                <th>image</th>
                <th>title</th>
                <th>Category</th>
                <th>location</th>
                <th>Description</th>
                <th>contact</th>
                <th>price</th>
              </tr>
            </thead>

            {userInfomation.map((details) => (
              <tbody key={details.id}>
                <tr>
                  <td>
                    <img
                      src={`http://localhost:4000/${details.image}`}
                      width="100px"
                      height="100px"
                      style={{ borderRadius: "20px" }}
                      alt=""
                      id="imgAd"
                    />
                  </td>
                  <td>
                    {" "}
                    <strong>{details.title}</strong>
                  </td>
                  <td>
                    {" "}
                    <strong>{details.category}</strong>
                  </td>

                  <td>
                    {" "}
                    <strong>{details.location}</strong>
                  </td>
                  <td>
                    {" "}
                    <strong>{details.description}</strong>
                  </td>
                  <td>
                    {" "}
                    <strong>{details.contact}</strong>
                  </td>
                  <td>
                    <strong>{details.price}</strong>
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

export default UserHouse;
