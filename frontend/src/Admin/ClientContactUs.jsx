import axios from "axios";
import React, { useEffect, useState } from "react";
import MainNav from "./MainNav";
import SideNavigation from "./SideNavigation";
import moment from "moment";

function ClientContactUs() {
  const [contact, setContact] = useState([]);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    getContact();
  }, []);
  const getContact = async () => {
    const response = await axios.get(
      "http://localhost:4000/contacts/contactUs/"
    );
    setContact(response.data);
  };
  const handelDelete = async (id) => {
    await axios.delete(`http://localhost:4000/contacts/${id} `);
    getContact();
  };

  return (
    <>
  

        <div className="card w-full p-6 bg-base-100 shadow-xl ">
                    <p>Questions</p>
            <div className="divider mt-2"></div>
                {/* Team Member list in table format loaded constant */}
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                    <tr>
                    <th>email</th>
                    <th>subject</th>
                    <th>Descripton</th>
                    <th>Posted Date</th>
                    <th>Delete</th>
                    <th>mail</th>
                    </tr>
                    </thead>
                    <tbody >
                    {contact.map((information) => (

                       <tr key={information.id}>
                        <td>{information.email}</td>
                        <td>{information.subject}</td>
                        <td>{information.description}</td>
                        <td>     
                           <strong>
                           {}{moment(information.createdAt).format(
                             "YYYY/MM/DD   h:mm:ss"
                           )}
                        </strong>
                      </td>
                       <td>    
                        <span
                          onClick={() => handelDelete(information.id)}
                          type="button"
                          className="material-symbols-outlined"
                          style={{ color: "red" }}
                        >
                        delete
                       </span>
                       </td>
                      < td>  
                        <a
                        href="/ClientMessageForm"
                        type="button"
                        className="material-symbols-outlined"
                        style={{ color: "blue" }}
                    >
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

export default ClientContactUs;
