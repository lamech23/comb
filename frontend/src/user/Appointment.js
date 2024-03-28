import axios from "axios";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { isAdmin } from "../utils/Decoded";
const localizer = momentLocalizer(moment);

function Appointment() {
  const [appointment, setAppointment] = useState([]);
  const [date, setDate] = useState(new Date());

  const user = isAdmin?.userId
  let id = user?.id;

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

  const events = appointment.map((appointments) => ({
    start: moment(appointments?.createdAt).toDate(),
    end: moment(appointments?.createdAt).toDate(),
    title: "Appointment",
  }));

  return (
    <>
      <div className="">
        <div style={{ height: "500px" }}>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ margin: "50px" }}
          />
        </div>
      </div>
    </>
  );
}

export default Appointment;
