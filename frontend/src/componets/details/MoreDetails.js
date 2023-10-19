import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useAuthContext } from "../../hooks/useAuthContext";
import "../../css/moreDetails.css";
import Calendar from "react-calendar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MoreDetails() {
  const { user } = useAuthContext();
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [contact, setContact] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const { id } = useParams();
  const [details, setDetails] = useState([]);
  const [value, onChange] = useState(new Date());
  //clinte info
  const [first_name, setFirst_name] = useState("");
  const [second_name, setSecond_name] = useState("");
  const [id_number, setId_number] = useState("");
  const [postal_address, setPostal_address] = useState("");
  const [gender, setGender] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [client_id, setClient_id] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [time, setTime] = useState("");
  const [tour_id, setTour_id] = useState("");

  const setDate = (date) => {
    if (date < new Date()) {
      return toast.error(" Date cannot be earlier than today");
    } else {
      setSelectedDate(date);
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("credentials"));
    if (user) setClient_id(user.id);
    const tour = JSON.parse(localStorage.getItem("credentials"));
    if (tour) setTour_id(tour.id);
  }, []);

  const handelSubmit = async (e) => {
    e.preventDefault();

    // const formData = new FormData()
    // formData.append('client_id', client_id)
    try {
      if (
        first_name === "" ||
        second_name === "" ||
        phoneNumber === "" ||
        id_number === "" ||
        postal_address === "" ||
        gender === ""
      ) {
        return toast.error("All fields must be filled in order to submit");
      } else {
        const response = await axios.post("http://localhost:4000/client", {
          first_name: first_name,
          second_name: second_name,
          phoneNumber: phoneNumber,
          id_number: id_number,
          postal_address: postal_address,
          gender: gender,
          client_id: client_id,
        });

        if (response) {
          first_name("");
          second_name("");
          phoneNumber("");
          id_number("");
          postal_address("");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handelSelect = async (e) => {
    e.preventDefault();

    if (selectedDate === "" || time === "") {
      return toast.error("you must select all fields");
    } else {
      const response = await axios.post(
        "http://localhost:4000/ClientTour/tour",
        {
          selectedDate: selectedDate,
          time: time,
          tour_id: tour_id,
        }
      );
    }
  };
  const formData = new FormData();
  formData.append("category", category);
  const fetchDetails = async () => {
    const response = await axios.get(
      `http://localhost:4000/RelatedHouses/?category=${category}`,
      formData
    );
    setDetails(response.data);
  };

  const getMore = async () => {
    const response = await axios.get(`http://localhost:4000/Details/` + id);
    setImage(response.data.image);
    setTitle(response.data.title);
    setLocation(response.data.location);
    setDescription(response.data.description);
    setContact(response.data.contact);
    setPrice(response.data.price);
    setCategory(response.data.category);
  };
  useEffect(() => {
    getMore();
    fetchDetails(id);
  }, [category]);

  const prevent = () => {
    if (user === null) {
      toast.error("please login first ");
    }
  };
  function handleCategoryChange(event) {
    setCategory(event.target.getAttribute("data-category")); // update category state when user selects an option
  }
  return (
    <>
      <div className="container-fixed  align-items-center justify-content-center ">
        <div className="moredetails ">
          <p className=" fs-4" id="ctg">
            <strong className="text-white fs-1 "> {category}</strong>
          </p>
        </div>

        <div></div>
        <div className=" mt-5" style={{ padding: "20px  0 " }}>
          <div className="row  d-flex  ms-5 mt-4">
            <div
              className="  col-lg-8 col-md-6  ms-2 mb-2   "
              style={{ width: "350px" }}
            >
              <img
                className="  ms-5 mt-5 mb-3 "
                src={`http://localhost:4000/${image}`}
                width="350px"
                height="350px"
                style={{ borderRadius: "20px" }}
                alt=""
              />
            </div>

            <div className="col-8 col-lg-4 text-center text-md-start    ms-5 mt-5">
              <div className="text-center fs-3 text-danger">House for sale</div>
              <div className="text-center">
                <p className=" fs-4">
                  {" "}
                  House Category<strong> {category}</strong>
                </p>
                <p className=" fs-4">
                  {" "}
                  <strong> Features {title}</strong>
                </p>
                {/* <p className=' fs-4 ' > <strong>{contact}</strong></p> */}
                <p className=" text-lead ms-4">
                  {" "}
                  <strong>{description}</strong>
                </p>

                <p className=" fs-3">
                  {" "}
                  <strong className="text-danger"> Ksh: {price}</strong>
                </p>
                {/* <a className="btn btn-outline-warning w-75 mb-4" data-bs-toggle="modal" href="#exampleModalToggle" role="button">Procced to buy</a> */}
              </div>
            </div>

            <div className=" col-lg-8  col-md-4 col-xl-3 mt-5">
              <div className="third_card ">
                <a
                  data-bs-toggle="modal"
                  href="#contactAg"
                  role="button"
                  className="request"
                >
                  Contact Agent
                </a>
                <a
                  data-bs-toggle="modal"
                  href="#tour"
                  role="button"
                  className="request mt-5"
                >
                  Request A tour
                </a>
              </div>
            </div>

            <div className="text-center">
              <div
                className="modal fade"
                id="contactAg"
                aria-hidden="true"
                aria-labelledby="exampleModalToggleLabel"
                tabindex="-1"
              >
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-header ">
                      <h1
                        className="modal-title fs-3  "
                        id="exampleModalToggleLabel"
                      >
                        Contact Agent{" "}
                      </h1>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body text-start ">
                      <form onSubmit={handelSubmit} className="formOne">
                        <label className="label-control">First Name</label>
                        <input
                          className="form-control"
                          type="text"
                          placeholder=""
                          onChange={(e) => setFirst_name(e.target.value)}
                          value={first_name}
                        />
                        <label className="label-control">Second Name</label>
                        <input
                          className="form-control"
                          type="text"
                          onChange={(e) => setSecond_name(e.target.value)}
                          value={second_name}
                        />

                        <label className="label-control">Contact</label>
                        <input
                          className="form-control"
                          type="text"
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          value={phoneNumber}
                        />
                        <label className="label-control">Id Number</label>
                        <input
                          className="form-control"
                          type="number"
                          onChange={(e) => setId_number(e.target.value)}
                          value={id_number}
                        />
                        <label className="label-control">Postal Adress</label>
                        <input
                          className="form-control"
                          type="text"
                          onChange={(e) => setPostal_address(e.target.value)}
                          value={postal_address}
                        />
                        <div className="input-group mb-3 mt-3">
                          <label className="input-group-text ">gender</label>
                          <select
                            className="form-select"
                            onChange={(e) => setGender(e.target.value)}
                            value={gender}
                          >
                            <option selected>Choose...</option>
                            <option value="male">male</option>
                            <option value="female">Female</option>
                          </select>
                        </div>
                        {user ? (
                          <button
                            type="submit"
                            className="btn btn-outline-warning w-75 btn-lg mt-2 ms-5 mb-3"
                            data-bs-dismiss="modal"
                          >
                            submit
                          </button>
                        ) : (
                          <div
                            type="submit"
                            className="btn btn-outline-warning w-75 btn-lg mt-2 ms-5 mb-3"
                            data-bs-dismiss="modal"
                            onClick={prevent}
                          >
                            submit
                          </div>
                        )}
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* form-2 */}
            <div className="text-center">
              <div
                className="modal fade"
                id="tour"
                aria-hidden="true"
                aria-labelledby="exampleModalToggleLabel"
                tabindex="-1"
              >
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-header ">
                      <h1
                        className="modal-title fs-3  "
                        id="exampleModalToggleLabel"
                      >
                        Tour with a Buyer's Agent{" "}
                      </h1>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body text-start ">
                      <div>
                        <form onSubmit={handelSelect}>
                          <div className="calendar-container">
                            <Calendar onChange={setDate} value={selectedDate} />
                          </div>
                          <label className="label-control">Select Time</label>
                          <select
                            className="form-control"
                            value={category}
                            onChange={(e) => setTime(e.target.value)}
                          >
                            {" "}
                            <option selected>please select</option>
                            <option value=" 8:00 Am">8:00 Am</option>
                            <option value="8:30 Am">8:30 Am</option>
                            <option value="9:00 Am">9:00 Am</option>
                            <option value="9:30 Am">9:30 Am</option>
                            <option value=" 10:00 Am">10:00 Am</option>
                            <option value="  10:30 Am">10:30 Am</option>
                            <option value="11:00 Am">11:00 Am</option>
                            <option value=" 11:30 Am">11:30 Am</option>
                            <option value="12:00 Pm">12:00 Pm</option>
                            <option value=" 12:30 Pm">12:30 Pm</option>
                            <option value="1:00 Pm">1:00 Pm</option>
                            <option value="1:30 Pm">1:30 Pm</option>
                            <option value=" 2:00 Pm">2:00 Pm</option>
                            <option value=" 2:30 Pm">2:30 Pm</option>
                            <option value="  3:00 Pm">3:00 Pm</option>
                            <option value=" 3:30 Pm">3:30 Pm</option>
                            <option value="4:00 Pm">4:00 Pm</option>
                            <option value=" 4:30 Pm">4:30 Pm</option>
                          </select>
                          <p className="text-center ">
                            <span className="bold">Selected Date:</span>{" "}
                            {selectedDate.toDateString()}
                            {/* <span className='bold'>Time</span>
        {date.toLocaleTimeString()  } */}
                          </p>
                          {user ? (
                            <button
                              type="submit"
                              className="btn btn-outline-warning w-75 btn-lg mt-2 ms-5 mb-3"
                              data-bs-dismiss="modal"
                            >
                              submit
                            </button>
                          ) : (
                            <div
                              type="submit"
                              className="btn btn-outline-warning w-75 btn-lg mt-2 ms-5 mb-3"
                              data-bs-dismiss="modal"
                              onClick={prevent}
                            >
                              submit
                            </div>
                          )}
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* end of for */}
          </div>
        </div>
      </div>
      <div className="text-center mt-5 fs-3 text-danger fw-bold">
        Related House
      </div>

      <div className="row d-flex align-items-center justify-content-center ms-5 mt-5">
        {details.map((detail) => (
          <div
            key={detail.id}
            className="  col-lg-8 col-md-6  ms-2 mb-2  justify-content-between card shadow-lg "
            style={{ width: "350px" }}
            id="hover"
          >
            <Link to={`/MoreDetails/${detail.id}`}>
              <img
                className="  ms-5 mt-5 mb-3"
                src={`http://localhost:4000/${detail.image}`}
                width="250px"
                height="250px"
                style={{ borderRadius: "20px" }}
                alt=""
              />
            </Link>
            <div className="truncate">
              <p className="tra ">
                <strong>{detail.title}</strong>
                <br />
                <strong>{detail.location}</strong>
                <strong>{detail.description}</strong>
                <strong>{detail.contact}</strong>
                <strong>{detail.price}</strong>
              </p>
              <Link
                className="text-decoration-none "
                to={`/DetailsInfo/${detail.id}`}
              >
                See more...
              </Link>
            </div>
            <p className="mt-2 fs-5">
              <strong>
                {formatDistanceToNow(new Date(detail.createdAt), {
                  addSuffix: true,
                })}
              </strong>
            </p>

            <Link to={`/DetailsInfo/${detail.id}`}>
              {" "}
              <button className="btn btn-outline-secondary btn-lg mt-2 ms-5 mb-3">
                Buy Now
              </button>
            </Link>
          </div>
        ))}
      </div>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default MoreDetails;
