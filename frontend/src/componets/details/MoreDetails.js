import axios from "axios";
import React, { useEffect, useState, Fragment } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useAuthContext } from "../../hooks/useAuthContext";
import "../../css/moreDetails.css";
import Calendar from "react-calendar";
import { ToastContainer, toast } from "react-toastify";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { Dialog, Transition } from '@headlessui/react'

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
  const [isOpen, setIsOpen] = useState(false);

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

  console.log(type);

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <>
    <div className="container mx-auto mb-10">
      <div className="flex flex-wrap lg:flex-row justify-between items-center mt-4">
        <div className="w-full lg:w-7/12">
          <Carousel>
            {image?.map((imageUrl, index) => (
              <div key={index}>
                <img
                  src={imageUrl.image}
                  className="block w-full rounded-lg"
                  alt={`Image ${index}`}
                />
              </div>
            ))}
          </Carousel>
        </div>

          <div className=" w-full lg:w-5/12 flex justify-center items-center">
            <div className=" mt-4 lg:mt-0 ">
                <h3 className="font-bold pb-3">House Information</h3>
              <div className="text-center sm:text-left">
                <p className="text-lg lg:text-xl">Category: <span className="font-bold">{category}</span> </p>
                <p className="text-lg lg:text-xl">Features: <span className="font-bold">{title}</span> </p>
                <p className="text-lg">Description: <span className="font-bold">{description}</span></p>
                {type === 'renting' ? null : (
                  <p className="text-lg">
                    <strong className="text-red-500">Ksh: {price}</strong>
                  </p>
                )}
              </div>

                <div>
                    {type === 'renting' && (
                      <div className="flex flex-row pt-10 sm:mt-0 gap-7 mb-10">
                        <div className="flex flex-col items-center">
                          <p className="text-lg text-[2.4rem] text-teal-400">Occupied</p>
                          <div className="w-20 h-20 bg-red-600 relative">
                            <div className="top-0 left-0 w-full h-6 bg-blue-500"></div>
                            <div className="top-6 bottom-0 left-0 right-0 bg-gray-500 "></div>
                            <div className="bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-12 bg-brown-600"></div>
                          </div>
                        </div>

                        <div className="flex flex-col items-center">
                          <p className="text-lg text-[2.4rem] text-teal-400">Vacant</p>
                          <div className="w-20 h-20 bg-green-500 relative">
                            <div className="top-0 left-0 w-full h-6 bg-blue-500"></div>
                            <div className="top-6 bottom-0 left-0 right-0 bg-gray-500 "></div>
                            <div className="bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-12 bg-brown-600"></div>
                          </div>
                        </div>
                      </div>
                    )}
                </div>

                  <div>
                  {type == 'renting' ? (
                      <div className="flex-1">
                          <div className="flex flex-col items-center gap-10">
                              <a onClick={openModal} className="block cursor-pointer no-underline rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700">
                                 Contact Agent
                               </a>
                          </div>
                      </div>
                    ): null}
                  </div>

            </div>
          </div>
      </div>
    </div>


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
            <div className="w-20 h-20  relative">
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto mt-5 px-2">
        {details.map((detail) => (
          <div key={detail.id} className="justify-self-center col-span-1 justify-items-center mb-5 p-5 bg-white rounded-lg shadow-lg" >
            <Link to={`/MoreDetails/${detail.id}`}>
              <img
                className="mx-auto my-5 "
                src={`http://localhost:4000/${detail.image}`}
                width="250px"
                height="250px"
                style={{ borderRadius: "20px" }}
                alt=""
              />
            </Link>
            <div className="truncate">
              <p className="text-center">
                <strong>{detail.title}</strong>
                <br />
                <p>{detail.location}</p>
                <p>{detail.description}</p>
                <p>{detail.contact}</p>
                <p>{detail.price}</p>
              </p>
            </div>
            <p className="text-center mt-2 text-lg">
                {formatDistanceToNow(new Date(detail.createdAt), {
                  addSuffix: true,
                })}
            </p>
            <Link to={`/DetailsInfo/${detail.id}`} className="block w-full mt-2">
              <button className="btn-outline-secondary btn-lg w-full">
                Buy Now
              </button>
            </Link>

              <div class="mt-6 flex items-center justify-end gap-x-6">
                <Link  to={`/DetailsInfo/${detail.id}`}>
                  <button  onClick={closeModal} type="button" class="text-sm font-semibold leading-6 text-gray-900">See more...</button>
                </Link>
                 
                  <button type="submit" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    <Link className="text-white" to={`/DetailsInfo/${detail.id}`}>
                      Buy Now
                    </Link>
                  </button>
              </div>
          </div>
        ))}
      </div>



      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full  transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <form onSubmit={handelSubmit}> 
                  <div class="space-y-12">
                    <div class=" border-gray-900/10">
                      <h2 class="text-base font-semibold leading-7 text-gray-900"> Contact Agent</h2>

                      <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div class="sm:col-span-3">
                          <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900">Name</label>
                          <div class="mt-2">
                            <input type="text" onChange={(e) => setNames(e.target.value)}  value={names} autocomplete="given-name"
                             class="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none sm:text-sm sm:leading-6"/>
                          </div>
                        </div>

                        <div class="sm:col-span-3">
                          <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900">Contact / Phone</label>
                          <div class="mt-2">
                            <input type="text" onChange={(e) => setPhoneNumber(e.target.value)}  value={phoneNumber} autocomplete="given-name"
                             class="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none sm:text-sm sm:leading-6"/>
                          </div>
                        </div>

                        <div class="sm:col-span-3">
                          <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email</label>
                          <div class="mt-2">
                            <input    onChange={(e) => setEmail(e.target.value)}  value={email} type="email" autocomplete="email" 
                            class="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none sm:text-sm sm:leading-6"/>
                          </div>
                        </div>

                        <div class="sm:col-span-3">
                          <label for="country" class="block text-sm font-medium leading-6 text-gray-900">gender</label>
                          <div class="mt-2">
                            <select  onChange={(e) => setGender(e.target.value)} value={gender} autocomplete="country-name" 
                            class="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none sm:text-sm sm:leading-6">
                            <option selected>Choose...</option>
                            <option value="male">male</option>
                            <option value="female">Female</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class=" border-gray-900/10">
                      <div class="space-y-10">
                        <fieldset>
                          <legend class="text-sm font-semibold leading-6 text-gray-900">Request a Tour</legend>
                          <div class=" space-y-6">
                            <div class="flex items-center gap-x-3">
                              <input  checked={requestTour === "yes"} onChange={() => setRequestTour("yes")} name="push-notifications" type="radio" 
                              class="h-4 w-4 border-gray-300 text-indigo-600 focus:outline-none"/>
                              <label for="push-everything" class="block text-sm font-medium leading-6 text-gray-900">Yes</label>
                            </div>
                            <div class="flex items-center gap-x-3">
                              <input   checked={requestTour === "no"}
                               onChange={() => setRequestTour("no")} name="push-notifications" type="radio"
                               class="h-4 w-4 border-gray-300 text-indigo-600 focus:outline-none"/>
                              <label for="push-email" class="block text-sm font-medium leading-6 text-gray-900">No</label>
                            </div>            
                          </div>
                        </fieldset>
                      </div>
                    </div>
                  </div>

                  {requestTour === "yes" && (
                    <>
                       <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                       <div class="sm:col-span-3">
                         <label for="country" class="block text-sm font-medium leading-6 text-gray-900">Select Time</label>
                         <div class="mt-2">
                           <select   value={category}  onChange={(e) => setTime(e.target.value)} autocomplete="country-name" 
                              class="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none sm:text-sm sm:leading-6">
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
                         </div>
                       </div>

                       <div class="sm:col-span-3">
                          <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Reason for visit</label>
                          <div class="mt-2">
                            <textarea    onChange={(e) => setEmail(e.target.value)}  value={email} type="email" autocomplete="email" 
                            class="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none sm:text-sm sm:leading-6"/>
                          </div>
                        </div>

                        <div class="sm:col-span-3">
                          <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Pick A Date</label>
                          <div class="mt-2">
                            <Calendar
                              onChange={setDate}
                               value={selectedDate}
                             />
                          </div>
                        </div>
                      </div>

                        <p className="pt-10">
                        <span className="bold">Selected Date:</span>{" "} {selectedDate.toDateString()}
                        </p>
                   </>
                   )}
                    <div class="mt-6 flex items-center justify-end gap-x-6">
                      <button  onClick={closeModal} type="button" class="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
                      <button type="submit" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
                    </div>
                  </form>    
                  <div className="text-center">
                </div>                       
 
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>

          
        </Dialog>
      </Transition>
      
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
