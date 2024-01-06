import axios from "axios";
import React, { useEffect, useState } from "react";
import MainNav from "./MainNav";
import SideNavigation from "./SideNavigation";

function HelpCenterAdmin() {
  const [email, setEmail] = useState([]);
  const [getInfo, setGetInfo] = useState([]);

  useEffect(() => {
    getinformation();
  }, []);
  const getinformation = async () => {
    const response = await axios.get("http://localhost:4000/help/helpCenter/");
    setGetInfo(response.data);
  };
  return (
    <>
   

        <div className="mt-4">
          <table className="table">
            <thead>
              <tr>
                <th>Email</th>
                <th>Issue</th>
                <th>Reply</th>
              </tr>
            </thead>

            {getInfo.map((help) => (
              <tbody key={help.id}>
                <tr>
                  <td>
                    {" "}
                    <strong>{help.email}</strong>
                  </td>
                  <td>
                    <strong>{help.description}</strong>
                  </td>
                  <td>
                    <a
                      href="/HelpReply"
                      type="button"
                      className="material-symbols-outlined"
                      style={{ color: "blue" }}
                    >
                      email
                    </a>
                  </td>
                  {/* <td><span  onClick={()=>handelDelete(help.id)} type='button' className='material-symbols-outlined'style={{color:'red'}} >delete</span></td> */}
                </tr>
              </tbody>
            ))}
          </table>
        </div>
    </>
  );
}

export default HelpCenterAdmin;
