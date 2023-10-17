import React, { useEffect, useState } from "react";
import MainNav from "../Admin/MainNav";
import SideNavigation from "../Admin/SideNavigation";
import axios from "axios";
import "../css/admin.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function RegisterTenant() {
  const [tenantsName, setTenantsName] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [rent, setRent] = useState("");
  const [rentDeposit, setRentDeposit] = useState("");
  const [waterReading, setWaterReadiing] = useState("");
  const [waterBill, setWaterBill] = useState("");
  const [garbage, setGarbage] = useState("");
  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [nextOfKingNumber, setNextOfKingNumber] = useState("");
  const [password, setPassword] = useState("");
  const [houseName, setHouseName] = useState("");
  const [previousBalance, setPreviousBalance] = useState("");
  const [house, setHouse]=useState([])

  const [users, setUsers] = useState([]);
  const tenantInfo = [...users]
 

 



  useEffect(()=>{
  const getHouse =async ()=>{
   const response = await axios.get( `http://localhost:4000/houseRegister/houseNames/`)
   setHouse(response.data)


  }
  getHouse()
  const fetchUsers = async () => {
    const response = await axios.get("http://localhost:4000/Users/all");
    setUsers(response.data);
  };

  fetchUsers()
  
},[])
const tenants = tenantInfo.filter((tenant)=>tenant.role === "tenant")
console.log(tenants);

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      }
    );
    console.log(response.data);

    toast.success("Succesfully registerd tenant");
  };
  return (
    <>
      <MainNav />
      <div className="split">
        <SideNavigation />

        <div className="row">
          <div className="w-fit">
            <h3 className="house_top"> Tenant Details</h3>

            <form onSubmit={handleSubmit}>
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
              <label for="" className="form-label">
                Registerd tenants
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
                <option value=""> select tenant</option>
                {tenants&&
                  tenants?.map((tenant)=>(
                    <option className="text-red visible" key={tenant.id} value={tenant.id}>{tenant.email} </option>
                  ))
                }

                </select>
              <label for="" className="form-label">
                House Name
              </label>
              <select
                type="text"
                name="houseName"
                id=""
                className="form-control"
                placeholder=""
                value={houseName}
                onChange={(e) => setHouseName(e.target.value)}
              >
                <option value=""> select house</option>
                {
                  house.map((houses)=>(
                    <option className="text-red visible" key={houses.id} value={houses.id}>{houses.house_name} </option>
                  ))
                }

                </select>

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
              

              <button
                className="btn btn-outline-success mt-3 justifiy-content-center "
                type="submit"
                style={{ width: "100%" }}
              >
                submit
              </button>
            </form>
          </div>
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
