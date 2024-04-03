import axios from "axios";
import React, { useEffect, useState } from "react";
import { isUser } from "../utils/Decoded";
import { api } from "../utils/Api";


function UserHouse() {
  const [userInfomation, setUserInformation] = useState([]);

  try {
    useEffect(() => {
      fettchUserInfo();
    }, []);
    const fettchUserInfo = async () => {
      // const user = JSON.parse(localStorage.getItem("credentials"));
      const user = isUser()?.userId
      let id = user.id;

      const response = await api(
        `/Details/byUserId?user_id=` + id, "GET", {}, {}
      );
      setUserInformation(response.details);
    };
  } catch (error) {}
  return (
    <>



      <div className="card w-full p-6 bg-base-100 shadow-xl ">
                    <p>Houses</p>
            <div className="divider mt-2"></div>
                {/* Team Member list in table format loaded constant */}
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                    <tr>
                    <th>image</th>
                      <th>title</th>
                      <th>Category</th>
                      <th>property Type</th>
                      <th>location</th>
                      <th>Description</th>
                      <th>contact</th>
                      <th>price</th>
                    </tr>
                    </thead>
                    <tbody>
                  {userInfomation.map((details) => (
                    <tr  key={details.id}>
                      <td>
                      {details?.images?.map(
                  (img, imgIndex) =>
                    imgIndex === 0 && (
                        <img
                          src={img.image}
                          width="100px"
                          height="100px"
                          style={{ borderRadius: "20px" }}
                          alt=""
                          id="imgAd"
                        />
                        )
                        )}
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
                        
                        <strong>{details.type}</strong>
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

                ))}
                    </tbody>
                </table>
            </div>
       </div>
    </>
  );
}

export default UserHouse;
