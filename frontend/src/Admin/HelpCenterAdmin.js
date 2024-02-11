import axios from "axios";
import React, { useEffect, useState } from "react";


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
          
      <div className="card w-full p-6 bg-base-100 shadow-xl ">
                    <p>Help Center</p>
            <div className="divider mt-2"></div>
                {/* Team Member list in table format loaded constant */}
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                    <tr>
                        <th>Email</th>
                        <th>Issue</th>
                        <th>Reply</th>
                    </tr>
                    </thead>
                    <tbody >
                    {getInfo.map((help) => (
                       <tr key={help.id}>
                        <td>{help.email}</td>
                       <td>{help.description}</td>
                        <td>  
                        <a href="/HelpReply" type="button" className="material-symbols-outlined"style={{ color: "blue" }} >
                          email 
                          </a>
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

export default HelpCenterAdmin;
