import React, { useEffect, useState } from "react";
import MainNav from "../Admin/MainNav";
import SideNavigation from "../Admin/SideNavigation";
import axios from "axios";
import "../css/admin.css";

import { ToastContainer, toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { Calendar } from "primereact/calendar";

function RegisterTenant({ houseId, tenant, closeModal,setIsOpen }) {

  
  const state = useLocation().state; // am  using one for to create and update
  const id = useLocation().state?.id;
  // const user = document.cookie
  const { user } = useAuthContext();

  const [tenantsName, setTenantsName] = useState(state?.tenantsName || "");
  const [houseNumber, setHouseNumber] = useState(state?.houseNumber || "");
  const [rent, setRent] = useState(state?.rent || "");
  const [rentDeposit, setRentDeposit] = useState(state?.rentDeposit || "");
  const [waterReading, setWaterReadiing] = useState(state?.waterReading || "");
  const [waterBill, setWaterBill] = useState(state?.waterBill || "");
  const [garbage, setGarbage] = useState(state?.garbage || "");
  const [userName, setUserName] = useState(state?.phoneNumber || "");
  const [phoneNumber, setPhoneNumber] = useState(state?.phoneNumber || "");

  const [prevReadings, setPrevReadings] = useState(state?.prevReadings || "");
  const [currentReadings, setCurrentReadings] = useState(
    state?.currentReadings || ""
  );

  const [email, setEmail] = useState(state?.email || "");
  const [nextOfKingNumber, setNextOfKingNumber] = useState(
    state?.nextOfKingNumber || ""
  );
  const [password, setPassword] = useState("");
  const [houseName, setHouseName] = useState(state?.houseName || "");
  const [previousBalance, setPreviousBalance] = useState(
    state?.previousBalance || ""
  );
  const [house_id, setHouseId] = useState(state?.houseName || "");
  const [house, setHouse] = useState([]);
  // const [house_id, setHouse_id] = useState("")
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [payableRent, setPaybleRent] = useState(state?.payableRent || "");
  const [date, setDate] = useState(state?.date || null);
  // console.log(payableRent);
  const  selectedTenantId = tenant?.detailsWithTotal?.find((tenant)=> tenant.email)


  const tenantInfo = [...users];

  const  registeredTenants = tenant?.detailsWithTotal?.map((tenant)=> tenant.email)
  useEffect(() => {
    const getHouse = async () => {
      const response = await axios.get(
        `http://localhost:4000/Details/fetchHousesByName/`
      );
      setHouse(response.data);
    };
    getHouse();

    const fetchUsers = async () => {
      const response = await axios.get("http://localhost:4000/Users/all");
      setUsers(response.data);
    };

    fetchUsers();
  }, []);
  const tenants = tenantInfo.filter((tenant) => tenant.role === "tenant");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (state) {
        await axios.patch(
          `http://localhost:4000/Tenant/change/${id}`,
          {
            tenantsName: tenantsName,
            houseNumber: houseNumber,
            rent: rent,
            email: email,
            rentDeposit: rentDeposit,
            password: password,
            waterReading: waterReading,
            waterBill: waterBill,
            garbage: garbage,
            userName: userName,
            phoneNumber: phoneNumber,
            nextOfKingNumber: nextOfKingNumber,
            houseName: houseName,
            previousBalance: previousBalance,
            prevReadings: prevReadings,
            currentReadings: currentReadings,
            house_id: house_id,
            tenant_id: id,
            
          },
          {
            headers: {
              authorization: ` Bearer ${user?.token}`,
              Accept: "application/json",
            },
          }
        );
        // navigate(`House/${houseName}`)
        toast.success("Succesfully upadated");
      } else {
      }
      const response = await axios.post(
        "http://localhost:4000/Tenant/registerTenant",
        {
          tenantsName: tenantsName,
          houseNumber: houseNumber,
          rent: rent,
          email: email,
          rentDeposit: rentDeposit,
          password: password,
          waterReading: waterReading,
          waterBill: waterBill,
          garbage: garbage,
          userName: userName,
          phoneNumber: phoneNumber,
          nextOfKingNumber: nextOfKingNumber,
          houseName: houseName,
          previousBalance: previousBalance,
          prevReadings: prevReadings,
          payableRent: payableRent,
          houseId: houseId,
          date: date
        }
      );
      if (response) {
        setTenantsName("");
        setHouseName("");
        setRent("");
        setEmail("");
        setRentDeposit("");
        setWaterReadiing("");
        setWaterBill("");
        setGarbage("");
        setUserName("");
        setNextOfKingNumber("");
        setHouse("");
        setPreviousBalance("");
        setIsOpen(false);
      }

      toast.success("Succesfully registerd tenant");
    } catch (error) {
      // Handle errors here
      console.error("Error occurred:", error.message);
      toast.error("An error occurred. Please try again later.");
    }
  };

  return (
    <>
      <div className=" px-60 mt-40">
      <div className="mt-4">
                    <button
                      type="button"
                      className=" material-symbols-outlined text-red-600"
                      // className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                     close
                    </button>
                  </div>
        <div className="space-y-12">
          <h3 className=" flex flex-row justify-center   text-center mt-4 "> Tenants Details for  <p className=" px-4  text-md font-medium text-red-700 hover:bg-gray-50 focus:relative">  {email}</p></h3>

          <form onSubmit={handleSubmit}>
            <section className=" mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 ">
              <div class="sm:col-span-3">
                <label for="" className="form-label">
                  Email
                </label>
                <select
                  type="text"
                  name="houseName"
                  id=""
                  className="form-control"
                  placeholder=""
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                >
                  <option value=""> select email </option>
                  {tenants.map((client) => (
                      !registeredTenants?.includes(client.email) && (
                        <option
                          className="text-red visible"
                          key={client.id}
                          value={client.email}
                        >
                          {client.email}
                        </option>
                      )
                  ))}
                </select>
              </div>

              <div class="sm:col-span-3">
                <label for="" className="form-label">
                  {" "}
                  Tenant Name
                </label>
                <input
                  type="text"
                  name="tenantName"
                  id="house_name"
                  className="form-control"
                  placeholder=""
                  value={tenantsName}
                  onChange={(e) => setTenantsName(e.target.value)}
                />
              </div>

              <div class="sm:col-span-3">
                <label for="" className="form-label">
                  House No
                </label>
                <input
                  type="text"
                  name="houseNumber"
                  id=""
                  className="form-control"
                  placeholder=""
                  value={houseNumber}
                  onChange={(e) => setHouseNumber(e.target.value)}
                />
              </div>

              <div class="sm:col-span-3">
                <label for="" className="form-label">
                  payable Rent
                </label>
                <input
                  type="number"
                  name="rent"
                  id=""
                  className="form-control"
                  placeholder=""
                  value={payableRent}
                  onChange={(e) => setPaybleRent(e.target.value)}
                />
              </div>
              <div class="sm:col-span-3">
                <label for="" className="form-label">
                  Rent
                </label>
                <input
                  type="number"
                  name="rent"
                  id=""
                  className="form-control"
                  placeholder=""
                  value={rent}
                  onChange={(e) => setRent(e.target.value)}
                />
              </div>

              {rent.length  >= 5 ? 
                <div class="sm:col-span-3 ">
                  <label for="" className="form-label">
                    paid Date
                  </label>
                  <div className="border">
                    <Calendar
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>
                </div> : null
              }
              <div class="sm:col-span-3">
                <label for="" className="form-label">
                  Rent Deposit
                </label>
                <input
                  type="number"
                  name="rentDeposit"
                  id=""
                  className="form-control"
                  placeholder=""
                  value={rentDeposit}
                  onChange={(e) => setRentDeposit(e.target.value)}
                />
              </div>
              <div class="sm:col-span-3">
                <label for="" className="form-label">
                  Water reading
                </label>

                <input
                  type="number"
                  name="waterReading"
                  id=""
                  className="form-control"
                  placeholder=""
                  value={waterReading}
                  onChange={(e) => setWaterReadiing(e.target.value)}
                />
              </div>
              <div class="sm:col-span-3">
                <label for="" className="form-label">
                  Water Bill
                </label>

                <input
                  type="number"
                  name="waterBill"
                  id=""
                  className="form-control"
                  placeholder=""
                  value={waterBill}
                  onChange={(e) => setWaterBill(e.target.value)}
                />
              </div>

              <div class="sm:col-span-3">
                <label for="" className="form-label">
                  Previous Balance
                </label>
                <input
                  type="number"
                  name="previousBalance"
                  id=""
                  className="form-control"
                  placeholder=""
                  value={previousBalance}
                  onChange={(e) => setPreviousBalance(e.target.value)}
                />
              </div>

              <div class="sm:col-span-3">
                <label for="" className="form-label">
                  Garbage
                </label>
                <input
                  type="number"
                  name="garbage"
                  id=""
                  className="form-control"
                  placeholder=""
                  value={garbage}
                  onChange={(e) => setGarbage(e.target.value)}
                />
              </div>
              <div class="sm:col-span-3">
                <label for="" className="form-label">
                  User name
                </label>
                <input
                  type="text"
                  name="userName"
                  id=""
                  className="form-control"
                  placeholder=""
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>

              <div class="sm:col-span-3">
                <label for="" className="form-label">
                  Phone Number
                </label>
                <input
                  type="number"
                  name="phoneNumber"
                  id=""
                  className="form-control"
                  placeholder=""
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <div class="sm:col-span-3">
                <label for="" className="form-label">
                  Next Of King
                </label>
                <input
                  type="number"
                  name="nextOfKingNumber"
                  id=""
                  className="form-control"
                  placeholder=""
                  value={nextOfKingNumber}
                  onChange={(e) => setNextOfKingNumber(e.target.value)}
                />
              </div>

              <div class="sm:col-span-3">
                <label for="" className="form-label">
                  prev readings
                </label>
                <input
                  type="text"
                  name="prevReading"
                  id=""
                  className="form-control"
                  placeholder=""
                  value={prevReadings}
                  onChange={(e) => setPrevReadings(e.target.value)}
                />
              </div>
              {state && (
                <div class="sm:col-span-3 space-y-6">
                  <div>
                    <label for="" className="form-label">
                      current Reading
                    </label>
                    <input
                      type="text"
                      name="currentReadings"
                      id=""
                      className="form-control"
                      placeholder=""
                      value={currentReadings}
                      onChange={(e) => setCurrentReadings(e.target.value)}
                    />
                  </div>
                </div>
              )}

              {state ? (
                <button
                  className="  border  p-2 bg-blue-200 mt-3 hover:bg-blue-400  "
                  type="submit"
                >
                  update
                </button>
              ) : (
                <button
                  className="border  p-2 bg-blue-200 mt-3 hover:bg-blue-400 "
                  type="submit"
                >
                  create
                </button>
              )}

                  
            </section>
          </form>
        </div>
      </div>
      <ToastContainer
        position="top-left"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default RegisterTenant;
