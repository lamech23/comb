import React, { useEffect, useState, Fragment } from "react";
// import MainNav from "../Admin/MainNav";
import SideNavigation from "../Admin/SideNavigation";
import axios from "axios";
import { Link, useLocation, useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { toast, ToastContainer } from "react-toastify";
import { usePDF } from "react-to-pdf";
import RegisterTenant from "./RegisterTenant";
import { Dialog, Transition } from "@headlessui/react";
import { api } from "../utils/Api";
import moment from "moment";

function House() {
  const [tenant, setTenant] = useState([]);
  const [house, setHouse] = useState([]);
  let houseName = useLocation().pathname.split("/")[2];
  const [price, setPrice] = useState("");
  const { user } = useAuthContext();
  const [getWater, setGetWater] = useState([]);
  const [getGarbage, setGetGarbage] = useState([]);
  const [display, setDisplay] = useState(false);
  const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });
  const [payments, setPayments] = useState([]);

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenRate, setIsOpenRate] = useState(false);
  const [isGarbage, setIsGarbage ] = useState(false);
  const [query, setQuery] = useState("");
  const [months, setMonths] = useState("");
  const keys = ["tenantsName", "phoneNumber", "houseNumber"];
  const month = ["createdAt"];

  const [currentMonth, setCurrentMonth] = useState(moment().format("MMM"));

  // Function to handle starting a new month
  const startNewMonth = () => {
    const nextMonth = moment().add(1, "months").format("MMM");

    setCurrentMonth(nextMonth);

  };

  console.log(getGarbage);


  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  function closeModalRate() {
    setIsOpenRate(false);
  }

  function openModalRate() {
    setIsOpenRate(true);
  }

  function openGarbage(){
    setIsGarbage(true)

  }
  function closeGarbage(){
    setIsGarbage(false)

  }
  // water bill total
  const waterUnits = getWater
    ?.map((house) => {
      return house.price;
    })
    .slice(-1)[0];

  // let houseIdArray = house?.map((house) => house.id);
  let houseIdArray = house?.map((house) => house.id);

  let houseId = houseIdArray ? houseIdArray[0] : null;

  const visitedHouseId = house?.find(
    (house) => house?.houseName === houseName
  )?.id;

  const getHouse = async () => {
    const response = await api(
      `/Details/housesLinkedToTenants/`,
      "GET",
      {},
      {}
    );
    setHouse(response.details);
  };

  useEffect(() => {
    const getTenantinfo = async () => {
      try {
        const response = await api(
          `/houseRegister/${visitedHouseId}`,
          "GET",
          {},
          {}
        );
        setTenant(response.detailsWithTotal);
      } catch (error) {
        console.log(error);
      }
    };
    getTenantinfo();
    getHouse();
  }, [houseName, houseId]);

  // guard clause
  if (isNaN(price) || price < 0) {
    toast.error("Number must be a positive value");
    // return;
  }

  // creating water reading
  const createWater = async (e) => {
    e.preventDefault();
    const waterDetails = {
      price: price,
      house_id: visitedHouseId,
    };
    try {
      const res = await api("/water/", "POST", {}, waterDetails);
      if (res) {
        setPrice("");
        toast.success("added succesfuly");
        setIsOpen(false);
      }
    } catch (error) {
      toast.error(JSON.stringify(error.message) || "field cannot be empty");
    }
  };


    // creating garbage reading
    const createGarbage = async (e) => {
      e.preventDefault();
      const garbageDetails = {
        price: price,
        house_id: visitedHouseId,
      };
      try {
        const res = await api("/garbage/", "POST", {}, garbageDetails);
        if (res) {
          setPrice("");
          toast.success("added succesfuly");
          setIsOpen(false);
        }
      } catch (error) {
        toast.error(JSON.stringify(error.message) || "field cannot be empty");
      }
    };
  

  // getting water retes

  useEffect(() => {
    const getWaterRates = async () => {
      try {
        const res = await api(
          `/water/fetchWater/${visitedHouseId}`,
          "GET",
          {},
          {}
        );
        setGetWater(res?.getWater);
      } catch (error) {
        toast.error("water rates not found " || error.massage);
      }
    };
    getWaterRates();


    const getGarbagePrice = async () => {
      try {
        const res = await api(
          `/garbage/fetch-garbage/${visitedHouseId}`,
          "GET",
          {},
          {}
        );
        setGetGarbage(res?.getGarbage);
      } catch (error) {
        toast.error("garbage price not found " || error.massage);
      }
    };
    getGarbagePrice();

    const getPayments = async (id) => {
      try {
        const response = await api(
          `/Tenant/fetchPayment/?userId=${id}`,
          "GET",
          {},
          {}
        );
        setPayments(response.totalAdditionalPayments);
      } catch (error) {}
    };
    if (visitedHouseId) {
      getPayments(visitedHouseId);
    }
  }, [visitedHouseId]);

  const filteredProducts = tenant?.filter((item) => {
    // Check if the item matches the search query
    const matchesQuery = keys.some((key) => {
      const value = item[key];
      return (
        value &&
        typeof value === "string" &&
        value.toLowerCase().includes(query)
      );
    });

   
    //   const value = item.createdAt.includes(months)
         
     

    // return matchesQuery  


  const value = month.some(month => item.createdAt.includes(months));

  // Return value if it's true, otherwise return matchesQuery
  return matchesQuery;
  });

  // console.log(query);
  const monthsShort = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const finalReport = filteredProducts?.map((tenants) => {
    // Initialize total amount for the current tenant
    let totalAmountForTenant = 0;

    let totalAmountsObj = {};

    payments &&
      Object.values(payments).map((paymentData, index) => {
        const matchingObjects = Object.values(paymentData)?.filter(
          (obj) => obj.userId === tenants.id
        );

        if (matchingObjects.length > 0) {
          totalAmountForTenant = matchingObjects.reduce(
            (sum, obj) => sum + Number(obj.amount),
            0
          );

          // Map amount values frommonth
          const amountValues = matchingObjects.map(
            (matchObj) => matchObj.amount
          );

          return amountValues;
        }

        totalAmountsObj[tenants.id] = 0;
      });

    if (!totalAmountForTenant) {
      totalAmountForTenant = Number(tenants.rent);
    } else {
      totalAmountForTenant += Number(tenants.rent);
    }
    const totalBalance =
      Number(tenants.balance) + totalAmountForTenant - tenants.rent;
    let water_bill =
      tenants?.totalWaterReadings * waterUnits <= 0
        ? 0
        : tenants?.totalWaterReadings * waterUnits;
    return {
      ...tenants,
      totalAmount: totalAmountForTenant,
      totalBalance: totalBalance,
      water_bill: water_bill,
    };
  });

  useEffect(() => {}, [finalReport]);
  //tenanant deleting
  const handleDeleteTenant = async (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this tenant?"
    );
    if (isConfirmed) {
      await api(`/Tenant/removeTenant/?id=${id}`, "DELETE",{}, {} );
      getTenantinfo();

    } else {
      alert("Action Cancelled");
    }
  };

  return (
    <>
      <div className="text-sm mt-14 px-5">
        <div className="flex gap-4 items-center monthtext-teal-500 text-xl">
          <span className="font-bold">HOUSE:</span>
          <p className="text-red-400">{houseName}</p>
        </div>
        <div className="flex gap-4 items-center text-teal-500 text-xl">
          <span className="font-bold">LANDOWNER:</span>
          <p className="text-red-400">
            {house && house.length > 0 && house[0].houses.email}
          </p>
        </div>
      </div>

      <header className=" mt-10 mb-20">
        <div className="px-10 flex  gap-4 flex-1 items-center justify-start md:justify-between">
          <div className="sm:flex sm:gap-4 space-y-5 lg:space-y-0">
            <button
              type="button"
              onClick={openModal}
              className="block no-underline rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700"
            >
              Add Tenant
            </button>

            <button
              type="button"
              onClick={openModalRate}
              className="block no-underline rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700"
            >
              Add Water Rate
            </button>
            <button
              type="button"
              onClick={openGarbage}
              className="block no-underline rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700"
            >
              Garbage 
            </button>

            <Link
              to={`/payments/${visitedHouseId}`}
              state={getWater}
              className="block no-underline rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700"
              href="/"
            >
              bill water
            </Link>

            <Link
              to={`/addtionalPayments/${visitedHouseId}`}
              className="block no-underline rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700"
              href="/"
            >
              additinal payments
            </Link>
            <Link
              to={`/final-report`}
              className="block no-underline rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700"
              state={finalReport}
            >
              Generate House Report
            </Link>

          <Link
              to={`/addtionalPayments/${houseId}`}
              className="block no-underline rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700"
              href="/"
            >
              Water Report
            </Link>

            <button
              onClick={() => toPDF()}
              className="block no-underline rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700"
            >
              Download
            </button>
            <Link
              to="/report"
              state={houseName}
              className="block no-underline rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700"
            >
              report
            </Link>
          </div>
        </div>
      </header>
      <div className="card w-full p-6 bg-base-100  ">
        <div className="flex flex-row justify-between items-center ">
          <p className="text-3xl font-bold text-teal-600">Tenants</p>

          <div className="flex flex-row gap-4">
            <input
              type="text"
              className="border p-4  rounded-lg "
              value={months}
              placeholder="search by month..."
              onChange={(e) => setMonths(e.target.value)}
            />

            <input
              type="text"
              className="border p-4  rounded-lg "
              value={query}
              placeholder="Search.."
              onChange={(e) => setQuery(e.target.value)}
            />
                <button
            onClick={startNewMonth}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Start New Month
          </button>
          </div>
      
        </div>

        <div className="divider mt-2"></div>
        {/* Team Member list in table format loaded constant */}
        <div className="overflow-x-auto w-full">
          <table ref={targetRef} className="table w-full">
            <thead>
              <tr>
                <th>id </th>
                <th>House Number</th>
                <th>Tenant Name </th>
                <th>payable Rent</th>
                <th> Paid Rent</th>

                <th className="flex flex-row">
                  <th> additinalPayments</th>
                  <th> date</th>
                  <th> paymentType</th>
                </th>
                <th>Rent Deposit</th>
                <th>prev water reading</th>
                <th>current water reading</th>
                <th>Water units</th>

                <th>Water per unit (Ksh)</th>
                <th>Water Bill</th>
                <th>Previous Balance</th>
                <th>Garbage price (Ksh)</th>
                <th>Phone Number</th>
                <th>Next_of_kin </th>
                <th>balance C/F</th>
                <th>Total</th>
                <th> Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts?.map((tenants, index) => (
                <tr key={tenants.id}>
                  <td className="border text-gray-600 text-sm  ">
                    {index + 1}
                  </td>
                  <td className="border text-gray-600 text-sm  ">
                    {tenants.houseNumber}
                  </td>
                  <td className="border text-gray-600 text-sm  ">
                    {tenants.tenantsName}
                  </td>
                  <td className="border text-gray-600 text-sm  ">
                    {tenants.payableRent}
                  </td>
                  <td className="border text-gray-600 text-sm  ">
                    {tenants.rent}
                  </td>
                  <td className="border text-gray-600 text-sm  ">
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
                                    className="flex flex-row justify-center items-center   "
                                  >
                                    <td className="flex flex-row gap-2 text-gray-600 text-sm   p-2">
                                      <p className="whitespace-nowrap rounded-full bg-greeen-100 px-2.5 py-0.5 bg-rose-200 text-sm text-rose-700">
                                        {" "}
                                        {
                                          monthsShort[
                                            new Date(
                                              matchingObject.createdAt
                                            ).getMonth()
                                          ]
                                        }
                                        -{innerIndex + 1}{" "}
                                      </p>
                                      <p className="text-green-400">
                                        {matchingObject.amount}
                                      </p>
                                    </td>
                                    <td className=" text-gray-600 text-sm  ">
                                      {moment(matchingObject.dateTime).format(
                                        "MMM Do YY"
                                      )}
                                    </td>
                                    <td className=" text-gray-600 text-sm  ">
                                      {matchingObject.paymentType}
                                    </td>
                                  </tr>
                                )
                              )}
                              <tr className="flex flex-row justify-around  items-center">
                                <td className="    text-green-600">
                                  New Rent: {totalAmount + Number(tenants.rent)}
                                </td>
                              </tr>
                            </React.Fragment>
                          );
                        }

                        return null;
                      })}{" "}
                  </td>
                  <td className="border text-gray-600 text-sm  ">
                    {tenants.rentDeposit}
                  </td>
                  <td className="border text-gray-600 text-sm  ">
                    {tenants.prevReadings}
                  </td>
                  <td className="border text-gray-600 text-sm  ">
                    {tenants.currentReadings <= 0 ? 0 : tenants.currentReadings}
                  </td>
                  <td className="border text-gray-600 text-sm  ">
                    {tenants.totalWaterReadings <= 0
                      ? 0
                      : tenants?.totalWaterReadings}
                  </td>
                  <td className="border text-gray-600 text-sm  ">
                    {getWater &&
                      getWater?.map((house) => house.price).slice(-1)[0]}
                  </td>
           
                  <td
                    className={`border  ${
                      tenants?.totalWaterReadings * waterUnits < 0
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    {tenants?.totalWaterReadings * waterUnits <= 0
                      ? 0
                      : tenants?.totalWaterReadings * waterUnits}
                  </td>
                  <td className="border text-gray-600 text-sm  ">
                    {tenants.previousBalance}
                  </td>
                  <td className="border text-gray-600 text-sm  ">
                    {getGarbage &&
                      getGarbage?.map((house) => house.price).slice(-1)[0]}
                  </td>
                  <td className="border text-gray-600 text-sm  ">
                    {tenants.phoneNumber}
                  </td>
                  <td className="border text-gray-600 text-sm  ">
                    {tenants.nextOfKingNumber}
                  </td>
                  <td
                    className={`border  ${
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
                  <td className="border text-gray-600 text-sm  ">
                    {tenants.totalExpenses}
                  </td> 
               
                  <td className=" lg:flex lg:flex-row lg:gap-2  flex flex-col h-fit text-gray-600 text-sm  ">

                  <Link
                    to={`/RegisterTenant/?edit=${tenants.id}`}
                    state={tenant?.find(
                      (meteData) => meteData.id === tenants.id
                    )}
                    class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                  >
                    {" "}
                    update{" "}
                  </Link>

                  <button
                    onClick={() => handleDeleteTenant(tenants.id)}
                    type="button "
                    class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                  >
                    Delete
                  </button>{" "}

                  </td> 

                </tr>
              ))}
            </tbody>
          </table>
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
      <Transition appear show={isOpenRate} as={Fragment}>
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <form onSubmit={createWater}>
                    <div>
                      <label className="  text-gray-600 text-sm   gap-4 mb-4">
                        Water Rates{" "}
                      </label>
                      <input
                        type="text"
                        class="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none sm:text-sm sm:leading-6"
                        placeholder="Enter water rates"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                      />

                      <div className="mt-4 space-x-3">
                        <button
                          type="submit"
                          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        >
                          {" "}
                          Add
                        </button>

                        <button
                          type="button"
                          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                          onClick={closeModalRate}
                        >
                          close
                        </button>
                      </div>
                    </div>
                  </form>
                </Dialog.Panel>

         
              </Transition.Child>
            </div>
          </div>

        </Dialog>
      </Transition>


      <Transition appear show={isGarbage} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>

      <div className="fixed inset-0 overflow-y-auto">
            <div className="flex  items-center justify-center min-h-full  p-4 text-center">
            <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >

                {/* garbage creation  */}

                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <form onSubmit={createGarbage}>
                    <div>
                      <label className="  text-gray-600 text-sm   gap-4 mb-4">
                        Gabage Rate {" "}
                      </label>
                      <input
                        type="text"
                        class="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none sm:text-sm sm:leading-6"
                        placeholder="Enter garbage  rate (ksh/month)"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                      />

                      <div className="mt-4 space-x-3">
                        <button
                          type="submit"
                          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        >
                          {" "}
                          Add
                        </button>

                        <button
                          type="button"
                          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                          onClick={closeGarbage}
                        >
                          close
                        </button>
                      </div>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>

          </Dialog>


          
      </Transition>
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
                  <RegisterTenant
                    setIsOpen={setIsOpen}
                    closeModal={closeModal}
                    visitedHouseId={visitedHouseId}
                    tenant={tenant}
                  />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default House;
