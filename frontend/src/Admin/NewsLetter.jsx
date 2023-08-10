import axios from "axios";
import React, { useEffect, useState } from "react";
import MainNav from "./MainNav";
import SideNavigation from "./SideNavigation";
import moment from "moment";

function NewsLetter() {
  const [NewsLetter, setNewsLetter] = useState([]);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    getNewssletter();
  }, []);

  const getNewssletter = async () => {
    const response = await axios.get("http://localHost:4000/news/NewsLetter");
    setNewsLetter(response.data);
  };

  const handelDelete = async (id) => {
    await axios.delete(`http://localhost:4000/news/deleteNewsLetter/${id} `);
    getNewssletter();
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
                <th>Email</th>
                <th>Date</th>
                <th>Delete</th>
              </tr>
            </thead>

            {NewsLetter.map((news) => (
              <tbody key={news.id}>
                <tr>
                  <td>
                    {" "}
                    <strong>{news.email}</strong>
                  </td>
                  <td>
                    <strong>
                      {moment(news.createdAt).format("YYYY/MM/DD   h:mm:ss")}
                    </strong>
                  </td>
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
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </>
  );
}

export default NewsLetter;
