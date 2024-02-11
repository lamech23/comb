import axios from "axios";
import React, { useEffect, useState } from "react";
import moment from "moment";

function Tours() {
  const [getTours, setGetTours] = useState([]);

  useEffect(() => {
    fetchAllRequestedTours();
  }, []);

  const fetchAllRequestedTours = async () => {
    const response = await axios.get(
      "http://localhost:4000/Details/TourRequest"
    );
    setGetTours(response.data);
  };
  return (
    <>
      <div className="split">

        <div className="mt-4">
          {/* <div>
        
        <input className="form-control me-2" type="search" placeholder="Search" 
            onChange={ (e) => setSearch(e.target.value)}
           // onChange={getRecipe}
         
         />
    </div> */}
          <table className="table">
            <thead>
              <tr>
                <th>Date</th>
                <th>time</th>
              </tr>
            </thead>

            {getTours.map((tours) => (
              <tbody key={tours.id}>
                <tr>
                  {/* <td><img  src={`http://localhost:4000/${details.image}`} width="100px" height="100px" style={{borderRadius:'20px'}} alt="" id='imgAd' /></td> */}
                  <td>
                    {" "}
                    <strong>
                      {moment(tours.createdAt).format("YYYY/MM/DD   h:mm:ss")}
                    </strong>
                  </td>
                  <td>
                    {" "}
                    <strong>{tours.time}</strong>
                  </td>

                  {/* <td><Link to={`/UpdateDetails/${details.id}`} type='button' className='material-symbols-outlined text-decoration-none'style={{color:'blue'}} >edit</Link></td>

          <td><span  onClick={()=>handelDelete(details.id)} type='button' className='material-symbols-outlined'style={{color:'red'}} >delete</span></td> */}
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </>
  );
}

export default Tours;
