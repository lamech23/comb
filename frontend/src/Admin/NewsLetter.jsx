import axios from "axios";
import React, { useEffect, useState } from "react";
import moment from "moment";

function NewsLetter() {
  const [NewsLetter, setNewsLetter] = useState([]);
  const [date, setDate] = useState(new Date());
  

  useEffect(() => {
    getNewssletter();
  }, []);

  const getNewssletter = async () => {
    const response = await axios.get("http://localHost:4000/news/newsLetter");
    setNewsLetter(response.data);
  };

  const handelDelete = async (id) => {
    await axios.delete(`http://localhost:4000/news/deleteNewsLetter/${id} `);
    getNewssletter();
  };
  return (
    <>

        <div className="card w-full p-6 bg-base-100 shadow-xl ">
                    <p>News Latter</p>
            <div className="divider mt-2"></div>
                {/* Team Member list in table format loaded constant */}
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                    <tr>
                    <th>Email</th>
                    <th>Date</th>
                    <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody >
                    {NewsLetter.map((news) => (
                       <tr key={news.id}>
                        <td>{news.email}</td>
                       <td>  {moment(news.createdAt).format("YYYY/MM/DD   h:mm:ss")}</td>
                        <td>  
                        <span
                          onClick={() => handelDelete(news.id)}
                          type="button"
                          className="material-symbols-outlined"
                          style={{ color: "red" }}
                        >
                          delete
                        </span>
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

export default NewsLetter;
