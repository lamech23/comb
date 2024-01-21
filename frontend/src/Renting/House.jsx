import React, { useEffect, useState } from "react";
import MainNav from "../Admin/MainNav";
import SideNavigation from "../Admin/SideNavigation";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { toast, ToastContainer } from "react-toastify";

function House() {
  const [tenant, setTenant] = useState([]);
  const [house, setHouse] = useState([]);
  let houseName = useLocation().pathname.split("/")[2];
  const [price, setPrice] = useState("");
  const { user } = useAuthContext();
  let [getWater, setGetWater] = useState([]);
  const [display, setDisplay] = useState(false);
  console.log(getWater);



  // water bill total

  const waterUnits = getWater
    ?.map((house) => {
      return house.price;
    })
    .slice(-1)[0];

  // const waterBill = tenant?.waterReadings?.map(
  //   (units) => units.total * waterUnits
  // );
  // console.log(waterBill);

  const getHouse = async () => {
    const response = await axios.get(
      `http://localhost:4000/houseRegister/houseNames/`
    );
    setHouse(response.data);
  };


  useEffect(() => {
    const getTenantinfo = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/houseRegister/${houseName}`
        );
        setTenant(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getTenantinfo();
    getHouse();
    getWaterRates()
  }, [houseName]);

  // guard clause
  if (isNaN(price) || price < 0) {
    toast.error("Number must be a positive value");
    return;
  }

  // creating water reading

  const visitedHouseId = house?.find(house => house.house_name === houseName)?.id;


  const createWater = async (e) => {
    e.preventDefault();
    const waterDetails = {
      price: price,
      house_id: visitedHouseId,
    };
    try {
      const res = await axios.post(
        "http://localhost:4000/water/",
        waterDetails,
        {
          headers: {
            authorization: `Bearer ${user?.token}`,
            Accept: "application/json",
          },
        }
      );
      if (res) {
        setPrice("");
        toast.success("Added successfully");
        // Fetch updated water rates after adding
        getWaterRates();
      }
    } catch (error) {
      toast.error(JSON.stringify(error.message) || "Field cannot be empty");
    }
  };
  

  
  //
  const handleWaterButton = () => {
    if (display) {
      document.querySelector("#content").style.display = "none";
    } else {
      setDisplay(true);
      document.querySelector("#content").style.display = "block";
    }
  };

  // getting water retes
<<<<<<< HEAD
  useEffect(() => {
    const getWaterRates = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/water/fetchWater/${visitedHouseId}`
        );
        setGetWater(res.data?.getWater);
      } catch (error) {
        toast.error("water rates not found " || error.massage);
      }
    };
    getWaterRates();
  }, []);

=======
  const getWaterRates = async () => {
    try {
      const res = await axios.get(
        `http://localhost:4000/water/fetchWater/${visitedHouseId}`
      );
      setGetWater(res.data?.getWater);
      
    } catch (error) {
      // toast.error("water rates not found "|| error.massage)/
    }
  };
  const waterPrice =getWater.map((house)=>{
    return house.price ? house.price : 0;
  }).slice(-1)[0]




 
>>>>>>> mohamed
  return (
    <>
      <div className=" flex flex-col justify-center items-center gap-20  ">
        <div className=" text-sm mt-14 ">
          <div className=" flex gap-4 text-teal-500 text-3xl ">
            {" "}
            HOUSE: <p className="text-red-400">{houseName}</p>
          </div>
          <div className=" flex gap-4 text-teal-500 text-3xl ">
            {" "}
            LANDOWNER: <p className="text-red-400">{tenant?.landownerEmail}</p>
          </div>

          <table className=" table-auto border-separate border-spacing-2 border border-slate-400   ">
            <thead className="">
              <tr>
                <th className="border border-slate-600">id </th>
                <th className="border border-slate-600">Tenant Name </th>
                <th className="border border-slate-600">email </th>
                <th className="border border-slate-600">House Name</th>
                <th className="border border-slate-600">House Number</th>
                <th className="border border-slate-600">Rent</th>
                <th className="border border-slate-600">Rent Deposit</th>
                <th className="border border-slate-600">Water Reading</th>
                <th className="border border-slate-600">Water per unit</th>
                <th className="border border-slate-600">Water Bill</th>
                <th className="border border-slate-600">Previous Balance</th>
                <th className="border border-slate-600">Garbage</th>
                <th className="border border-slate-600">Phone Number</th>
                <th className="border border-slate-600">
                  Next_of_king_number{" "}
                </th>
                <th className="border border-slate-600">total</th>
              </tr>
            </thead>
            <tbody>
              {tenant?.detailsWithTotal?.map((tenants) => (
                <tr key={tenants.id}>
                  <td className="border text-black border-slate-700">
                    {tenants.id}
                  </td>
                  <td className="border text-black border-slate-700">
                    {tenants.tenantsName}
                  </td>
                  <td className="border text-black border-slate-700">
                    {tenants.email}
                  </td>
                  <td className="border text-black border-slate-700">
                    {tenants.houseName}
                  </td>
                  <td className="border text-black border-slate-700">
                    {tenants.houseNumber}
                  </td>
                  <td className="border text-black border-slate-700">
                    {tenants.rent}
                  </td>
                  <td className="border text-black border-slate-700">
                    {tenants.rentDeposit}
                  </td>
                  <td className="border text-black border-slate-700">
                    {tenants.waterReading}
                  </td>

                  <td className="border text-black border-slate-700">
<<<<<<< HEAD
                    {getWater &&
                      getWater?.map((house) => house.price).slice(-1)[0]}
=======
                      {waterPrice }
>>>>>>> mohamed
                  </td>
                  <td
                    className={`border border-slate-700 ${
                      tenants?.totalWaterReadings * waterUnits < 0
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    {tenants?.totalWaterReadings * waterUnits}
                  </td>
                  <td className="border text-black border-slate-700">
                    {tenants.previousBalance}
                  </td>
                  <td className="border text-black border-slate-700">
                    {tenants.garbage}
                    

                  </td>
                  <td className="border text-black border-slate-700">
                    {tenants.phoneNumber}
                  </td>
                  <td className="border text-black border-slate-700">
                    {tenants.nextOfKingNumber}
                  </td>
                  <td className="border text-black border-slate-700">
                    {tenants.totalExpenses}
                  </td>
<<<<<<< HEAD

                  <Link
                    to={`/RegisterTenant/?edit=${tenants.id}`}
                    state={tenant?.detailsWithTotal?.find(
                      (meteData) => meteData.id === tenants.id
                    )}
                    className="text-green-600 no-underline"
                  >
                    {" "}
                    update{" "}
                  </Link>
=======
>>>>>>> mohamed
                </tr>
              ))}
              <tr></tr>
            </tbody>
          </table>
        </div>
        {/* water section  */}
        <div className="flex  gap-2 ">
          <button
            type="button "
            className="text-3xl text-red-400 m-3 font-bold  border rounded-lg p-2 bg-orange-300 shadow-lg w-fit h-fit "
            onClick={handleWaterButton}
          >
            Add Water Rates{" "}
          </button>
          <section className="mb-4" id="content" style={{ display: "none" }}>
            <form onSubmit={createWater}>
              <div className="flex flex-col border rounded-lg w-fit  shadow-lg p-4">
                <label className="  text-white text-2xl gap-4 mb-4">
                  Water Rates{" "}
                </label>
                <input
                  type="text"
                  className="p-2 rounded-lg w-96"
                  placeholder="Enter water rates"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />

                <button
                  type="submit"
                  className="material-symbols-outlined text-red-500 mt-4"
                >
                  {" "}
                  Add
                </button>
              </div>
            </form>
          </section>
        </div>
        {/* garbage section */}
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

export default House;
