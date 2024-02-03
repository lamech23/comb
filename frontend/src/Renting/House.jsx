import React, { useEffect, useState } from "react";
import MainNav from "../Admin/MainNav";
import SideNavigation from "../Admin/SideNavigation";
import axios from "axios";
import { Link, useLocation, useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { toast, ToastContainer } from "react-toastify";
import { usePDF } from "react-to-pdf";
import RegisterTenant from "./RegisterTenant";

function House() {
  const [tenant, setTenant] = useState([]);
  const [house, setHouse] = useState([]);
  let houseName = useLocation().pathname.split("/")[2];
  const [price, setPrice] = useState("");
  const { user } = useAuthContext();
  const [getWater, setGetWater] = useState([]);
  const [display, setDisplay] = useState(false);
  const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });
  const [payments, setPayments] = useState([]);

  // water bill total
  const waterUnits = getWater
    ?.map((house) => {
      return house.price;
    })
    .slice(-1)[0];
    //houseId
    let houseIdArray = house?.map((house) => house.id);
    let houseId = houseIdArray ? houseIdArray[0] : null;

  const getHouse = async () => {
    const response = await axios.get(
      `http://localhost:4000/Details/fetchHousesByName/`
    );
    setHouse(response.data);
    // console.log(response.data);
  };
  useEffect(() => {
    const getTenantinfo = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/houseRegister/${houseId}`
        );
        setTenant(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getTenantinfo();
    getHouse();
  }, [houseName, houseId]);
  console.log(tenant);

  // guard clause
  if (isNaN(price) || price < 0) {
    toast.error("Number must be a positive value");
    // return;
  }

  // creating water reading
  const visitedHouseId = house?.find(
    (house) => house?.houseName === houseName
  )?.id;
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
            authorization: ` Bearer ${user?.token}`,
            Accept: "application/json",
          },
        }
      );
      if (res) {
        setPrice("");
        toast.success("added succesfuly");
      }
    } catch (error) {
      toast.error(JSON.stringify(error.message) || "field cannot be empty");
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

    const getPayments = async (id) => {
      try {
        const response = await axios.get(
          `http://localhost:4000/Tenant/fetchPayment/?userId= ${id}`
        );
        setPayments(response.data?.totalAdditionalPayments);
      } catch (error) {}
    };
    getPayments();
  }, [tenant]);

  return (
    <>
      <div className=" flex flex-col justify-center items-center gap-20 px-80  ">
        <div className=" text-sm mt-14 ">
          <div className=" flex gap-4 text-teal-500 text-3xl ">
            {" "}
            HOUSE: <p className="text-red-400">{houseName}</p>
          </div>
          <div className=" flex gap-4 text-teal-500 text-3xl ">
            {" "}
            LANDOWNER: <p className="text-red-400">
            {house && house.length > 0 && <p>{house[0].houses.email}</p>}

            </p>
          </div>


          <header className="bg-white mt-10 mb-20">
  <div className="mx-auto flex  flex-wrap h-16 max-w-screen-xl  items-center gap-8 ">
  
    <div className="flex  gap-4 flex-1 items-center justify-start md:justify-between">
      <nav aria-label="Global" className=" md:block ">
      <div className="sm:flex sm:gap-4">
          <a
            className="block no-underline rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700"
            href="/"
          >
            water rates
          </a>

          <a
            className="block no-underline rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700"
            href="/"
          >
            bill water
          </a>

          <a
            className="block no-underline rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700"
            href="/"
          >
            additinal payments
          </a>

          <a
            className="block no-underline rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700"
            href="/"
          >
            Download
          </a>
        </div>
      </nav>

   
    </div>
  </div>
</header>


          <table
            ref={targetRef}
            className=" table-auto border-separate border-spacing-2 border border-slate-400   "
          >
            <thead className="">
              <tr>
                <th className="border border-slate-600">id </th>
                <th className="border border-slate-600">House Number</th>
                <th className="border border-slate-600">Tenant Name </th>
                <th className="border border-slate-600">payable Rent</th>
                <th className="border border-slate-600"> Paid Rent</th>

                <th className="border border-slate-600 flex flex-row justify-start items-center gap-20">
                  additinalPayments
                  <th className=" border-slate-600"> date</th>
                  <th className=" border-slate-600"> paymentType</th>
                </th>
                <th className="border border-slate-600">Rent Deposit</th>
                <th className="border border-slate-600">prev water reading</th>
                <th className="border border-slate-600">
                  current water reading
                </th>
                <th className="border border-slate-600">Water units</th>

                <th className="border border-slate-600">Water per unit</th>
                <th className="border border-slate-600">Water Bill</th>
                <th className="border border-slate-600">Previous Balance</th>
                <th className="border border-slate-600">Garbage</th>
                <th className="border border-slate-600">Phone Number</th>
                <th className="border border-slate-600">
                  Next_of_king_number{" "}
                </th>
                <th className="border border-slate-600">balance C/F</th>
                <th className="border border-slate-600">Total</th>
                <th> water readings</th>
              </tr>
            </thead>
            <tbody>
              {tenant?.detailsWithTotal?.map((tenants) => (
                <tr key={tenants.id}>
                  <td className="border text-black border-slate-700">
                    {tenants.id}
                  </td>

                  <td className="border text-black border-slate-700">
                    {tenants.houseNumber}
                  </td>
                  <td className="border text-black border-slate-700">
                    {tenants.tenantsName}
                  </td>

                  <td className="border text-black border-slate-700">
                    {tenants.payableRent}
                  </td>
                  <td className="border text-black border-slate-700">
                    {tenants.rent}
                  </td>

                  <td className="border text-black border-slate-700">
                    {payments &&
                      Object.values(payments).map((paymentData, index) => {
                        const matchingObjects = Object.values(
                          paymentData
                        ).filter((obj) => obj.userId === tenants.id);

                        if (matchingObjects.length > 0) {
                          const totalAmount = matchingObjects.reduce(
                            (sum, obj) => sum + Number(obj.amount),
                            0
                          );

                          return (
                            <React.Fragment key={index}>
                              {matchingObjects.map(
                                (matchingObject, innerIndex) => (
                                  <tr
                                    key={`${index}-${innerIndex}`}
                                    className="flex flex-row justify-around items-center "
                                  >
                                    <td className="border text-black border-slate-700 p-2">
                                      Payment {innerIndex + 1}:{" "}
                                      {matchingObject.amount}
                                    </td>
                                    <td className="border text-black border-slate-700">
                                      {matchingObject.dateTime}
                                    </td>
                                    <td className="border text-black border-slate-700">
                                      {matchingObject.paymentType}
                                    </td>
                                  </tr>
                                )
                              )}
                              <tr key={`total-${index}`}>
                                <td className="border  border-slate-700  text-green-600">
                                  Total Rent:{" "}
                                  {totalAmount + Number(tenants.rent)}
                                </td>
                              </tr>
                            </React.Fragment>
                          );
                        }

                        return null; // Return null if userId doesn't match
                      })}{" "}
                  </td>

                  <td className="border text-black border-slate-700">
                    {tenants.rentDeposit}
                  </td>
                  <td className="border text-black border-slate-700">
                    {tenants.prevReadings}
                  </td>
                  <td className="border text-black border-slate-700">
                    {tenants.currentReadings <= 0 ? 0 : tenants.currentReadings}
                  </td>

                  <td className="border text-black border-slate-700">
                    {tenants.totalWaterReadings <= 0
                      ? 0
                      : tenants?.totalWaterReadings}
                  </td>

                  <td className="border text-black border-slate-700">
                    {getWater &&
                      getWater?.map((house) => house.price).slice(-1)[0]}
                  </td>
                  <td
                    className={`border border-slate-700 ${
                      tenants?.totalWaterReadings * waterUnits < 0
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    {tenants?.totalWaterReadings * waterUnits <= 0
                      ? 0
                      : tenants?.totalWaterReadings * waterUnits}
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
                  <td
                    className={`border border-slate-700 ${
                      tenants?.balance +
                        (payments &&
                          Object.values(payments)
                            .map((paymentData, index) => {
                              const matchingObjects = Object.values(
                                paymentData
                              ).filter((obj) => obj.userId === tenants.id);

                              if (matchingObjects.length > 0) {
                                const totalAmount = matchingObjects.reduce(
                                  (sum, obj) => sum + Number(obj.amount),
                                  0
                                );
                                return totalAmount;
                              }

                              return 0; // Return 0 if userId doesn't match
                            })
                            .reduce(
                              (sum, totalAmount) => sum + totalAmount,
                              0
                            )) >=
                      0
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {tenants?.balance +
                      (payments &&
                        Object.values(payments)
                          .map((paymentData, index) => {
                            const matchingObjects = Object.values(
                              paymentData
                            ).filter((obj) => obj.userId === tenants.id);

                            if (matchingObjects.length > 0) {
                              const totalAmount = matchingObjects.reduce(
                                (sum, obj) => sum + Number(obj.amount),
                                0
                              );
                              return totalAmount;
                            }

                            return 0; // Return 0 if userId doesn't match
                          })
                          .reduce((sum, totalAmount) => sum + totalAmount, 0))}
                  </td>
                  <td className="border text-black border-slate-700">
                    {tenants.totalExpenses}
                  </td>

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
                </tr>
              ))}
              <tr></tr>
            </tbody>
          </table>

          {/* <AdditinalPaymants houseName={houseName}/> */}
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
        {/* addtinal paymant section  */}
        <Link
          to={`/payments/${houseId}`}
          state={getWater}
          className=" text-[1.3rem] text-black-600 group-hover:block border p-2 rounded-lg bg-green-200 lg:hover:bg-green-800"
        >
          bill Water
        </Link>
        <Link
          to={`/addtionalPayments/${houseId}`}
          className=" text-[1.3rem] text-black-600 group-hover:block border p-2 rounded-lg bg-green-200 lg:hover:bg-green-800"
        >
          Addtinal payments
        </Link>
        <button onClick={() => toPDF()}>Download PDF</button>
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
      <RegisterTenant houseId={houseId} tenant={tenant}/>
    </>
  );
}

export default House;
