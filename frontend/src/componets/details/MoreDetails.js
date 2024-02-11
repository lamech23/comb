import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useAuthContext } from "../../hooks/useAuthContext";
import "../../css/moreDetails.css";
import Calendar from "react-calendar";
import { ToastContainer, toast } from "react-toastify";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
function MoreDetails() {
  const { user } = useAuthContext();
  const [image, setImage] = useState([]);
  const [title, setTitle] = useState("");

  const [description, setDescription] = useState("");
  const [contact, setContact] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [units, setUnits] = useState("");
  const { id } = useParams();
  const [details, setDetails] = useState([]);
  const [location, setLocation] = useState("");
  //clinte info
  const [names, setNames] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [client_id, setClient_id] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [time, setTime] = useState("");
  const [tour_id, setTour_id] = useState("");
  const [tenant, setTenant] = useState([]);
  const [requestTour, setRequestTour] = useState("");
  const [reason, setReason] = useState("");
  const [type, setType] = useState("");

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
        names === "" ||
        email === "" ||
        phoneNumber === "" ||
        details === "" ||
        gender === ""
      ) {
        return toast.error("All fields must be filled in order to submit");
      } else {
        const response = await axios.post("http://localhost:4000/client", {
          names: names,
          email: email,
          phoneNumber: phoneNumber,
          gender: gender,
          client_id: client_id,
          details: details,
        });

        if (response) {
          names("");
          email("");
          phoneNumber("");
          details("");
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

  const breakNumberIntoDigits = (number) => {
    return Array.from({ length: number }, (_, index) => index + 1);
  };

  const getMore = async () => {
    const response = await axios.get(`http://localhost:4000/Details/` + id);
    setImage(response.data.images);
    setTitle(response.data.title);
    setLocation(response.data.location);
    setDescription(response.data.description);
    setContact(response.data.contact);
    setPrice(response.data.price);
    setCategory(response.data.category);
    setUnits(response.data.units);
    setType(response.data.type);
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
    setCategory(event.target.getAttribute("data-category"));
  }

  useEffect(() => {
    const getTenantinfo = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/houseRegister/${id}`
        );
        setTenant(response.data?.detailsWithTotal);
      } catch (error) {
        console.log(error);
      }
    };
    getTenantinfo();
  }, []);

  return (
    <>
      <div className="container-fixed  align-items-center justify-content-center ">
        <div className="moredetails ">
          <p className=" fs-4" id="ctg">
            <strong className="text-white fs-1 "> {category}</strong>
          </p>
        </div>

        <div className=" mt-5" style={{ padding: "20px  0 " }}>
          <div className=" flex flex-row justify-center items-center flex-wrap  ms-5 mt-4">
            <div className=" flex-1 ">
              <Carousel>
                {image?.map((imageUrl, index) => (
                  <div key={index}>
                    <img
                      src={imageUrl.image}
                      className=" block w-full rounded-lg "
                      width="250px"
                      height="250px"
                      alt={`Image ${index}`}
                    />
                  </div>
                ))}
              </Carousel>
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
                <p className=" text-lead ms-4">
                  {" "}
                  <strong>{description}</strong>
                </p>

                <p className=" fs-3">
                  {
                    type == 'renting'? null :  <strong className="text-danger"> Ksh: {price}</strong>

                  }

                </p>
              </div>
            </div>

            {type == 'renting' ? (
              <div className="flex-1">
                <div className="flex flex-col items-center gap-10">
                  <a
                    data-bs-toggle="modal"
                    href="#contactAg"
                    role="button"
                    className="border p-10 bg-teal-600 text-2xl uppercase rounded-lg no-underline text-teal-900 animated-button"
                  >
                    Contact Agent
                  </a>
                </div>
              </div>
            ): null}

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
                        <label className="label-control"> Names </label>
                        <input
                          className="form-control"
                          type="text"
                          placeholder=""
                          onChange={(e) => setNames(e.target.value)}
                          value={names}
                        />
                        <label className="label-control"> Email </label>
                        <input
                          className="form-control"
                          type="email"
                          onChange={(e) => setEmail(e.target.value)}
                          value={email}
                        />

                        <label className="label-control">Contact / Phone</label>
                        <input
                          className="form-control"
                          type="text"
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          value={phoneNumber}
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

                        <div className="mb-3">
                          <label className="label-control">
                            Request a Tour
                          </label>
                          <div className="form-check">
                            <input
                              type="radio"
                              className="form-check-input"
                              id="requestTourYes"
                              name="requestTour"
                              value="yes"
                              checked={requestTour === "yes"}
                              onChange={() => setRequestTour("yes")}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="requestTourYes"
                            >
                              Yes
                            </label>
                          </div>
                          <div className="form-check">
                            <input
                              type="radio"
                              className="form-check-input"
                              id="requestTourNo"
                              name="requestTour"
                              value="no"
                              checked={requestTour === "no"}
                              onChange={() => setRequestTour("no")}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="requestTourNo"
                            >
                              No
                            </label>
                          </div>
                        </div>

                        {requestTour === "yes" && (
                          <div className="modal-body text-start">
                            {/* Content for 'Yes' option */}
                            <div>
                              <form onSubmit={handelSelect}>
                                <div className="calendar-container">
                                  <Calendar
                                    onChange={setDate}
                                    value={selectedDate}
                                  />
                                </div>
                                <label className="label-control">
                                  Select Time
                                </label>
                                <label className="label-control">
                                  Select Time
                                </label>
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

                                <label className="label-control">
                                  {" "}
                                  Reason for visit{" "}
                                </label>
                                <textarea
                                  className="form-control"
                                  type="text"
                                  onChange={(e) => setReason(e.target.value)}
                                  value={reason}
                                  placeholder="Enter your reason..."
                                />
                              </form>
                            </div>
                          </div>
                        )}

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

            {/* end of for */}
          </div>
        </div>
      </div>
            {
              type == 'renting'? (
                
      <div className="flex flex-row  justify-center gap-20 items-center mb-40">
      <div className="flex flex-col  justify-center items-center  flex-wrap ">
        <p className="text-lg text-[2.4rem] text-teal-400"> Occupied </p>
        <div className={` m-2`}>
          <div className="w-32 h-32  bg-red-600 relative">
            <div className="top-0 left-0 w-full h-6 bg-blue-500"></div>
            <div className="top-6 bottom-0 left-0 right-0 bg-gray-500 "></div>
            <div className="bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-12 bg-brown-600"></div>
          </div>
        </div>
      </div>

      <div className="flex flex-col  justify-center items-center  flex-wrap ">
        <p className="text-lg text-[2.4rem] text-teal-400"> vaccant </p>
        <div className={` m-2`}>
          <div className="w-32 h-32  bg-green-500 relative">
            <div className="top-0 left-0 w-full h-6 bg-blue-500"></div>
            <div className="top-6 bottom-0 left-0 right-0 bg-gray-500 "></div>
            <div className="bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-12 bg-brown-600"></div>
          </div>
        </div>
      </div>
    </div>
              ) :null
            }
      <div className="flex flex-wrap justify-center">
        {breakNumberIntoDigits(Number(units)).map((digit, digitIndex) => (
          <div
            key={digitIndex}
            className={`flex flex-row justify-center items-center border m-2 ${
              tenant?.some((t) => Number(t.houseNumber.slice(2)) === digit)
                ? "bg-red-600"
                : "bg-green-500"
            }`}
          >
            <div className="w-32 h-32  relative">
              <div className="top-0 left-0 w-full h-6 bg-blue-500"></div>
              <div className="top-6 bottom-0 left-0 right-0 bg-gray-500 "></div>
              <div className="bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-12 bg-brown-600"></div>
              <div className=" flex flex-row justify-center items-center h-9 text-3xl text-white">
                <p>
                  {/* {
                  tenant?.map((symbol)=> symbol.houseNumber.slice(0, 1) )
                } */}
                  a-
                </p>
                <p>{digit}</p>
              </div>
            </div>
          </div>
        ))}
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
