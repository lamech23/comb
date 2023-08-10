import axios from "axios";
import React, { useEffect, useState } from "react";
import UserNav from "./UserNav";
import moment from "moment";

function Appointment() {
  const [appointment, setAppointment] = useState([]);
  const [date, setDate] = useState(new Date());

  const user = JSON.parse(localStorage.getItem("credentials"));
  let id = user.id;

  try {
    useEffect(() => {
      getAppointments();
    }, []);

    const appointments = [];

    const getAppointments = async () => {
      const response = await axios.get(
        `http://localhost:4000/ClientTour/specificTourRequest?tour_id=` + id
      );
      appointments.push(response.data);

      setAppointment(appointments);
    };
  } catch (error) {}
  return (
    <>
      <div className="split">
        <UserNav />

        <div className=" container-fluid  mt-5">
          {appointment.map((appointments) => (
            <div className="mt-5 row" key={appointment.id}>
              <div
                className="card  mb-3 shadow-lg"
                style={{ maxWidth: "20rem" }}
                id="cardOne"
              >
                <div className="display-5 text-center text-info">
                  <i class="bi bi-calendar-event"></i>
                </div>
                <div className="display-6  text-center text-mute">
                  scheduled date
                </div>

                <div className="card-body text-center">
                  {/* <h5 className="card-title">Primary card title</h5> */}
                  <p className="card-text text-danger fs-6">
                    {moment(appointments?.createdAt).format("YYYY/MM/DD   ")}{" "}
                  </p>
                </div>
              </div>

              {/* card two */}
              <div
                className="card  mb-3 shadow-lg"
                style={{ maxWidth: "20rem" }}
                id="cardOne"
              >
                <div className="display-5 text-center text-info">
                  <i class="bi bi-alarm"></i>
                </div>
                <div className="display-6  text-center text-mute">
                  scheduled time
                </div>

                <div className="card-body text-center">
                  {/* <h5 className="card-title">Primary card title</h5> */}
                  <p className="card-text text-danger fs-6">
                    {appointments?.time}{" "}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Appointment;
