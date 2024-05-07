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
  const [agent, setAgent] = useState([]);
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
  const [isGarbage, setIsGarbage] = useState(false);
  const [query, setQuery] = useState("");
  const [months, setMonths] = useState("");
  const month = ["createdAt"];
  const keys = ["tenantsName", "phoneNumber", "houseNumber"];

  const [currentMonth, setCurrentMonth] = useState(moment().format("MMM"));

  const [pagination, setPagination] = useState({});
  const [pageNum, setPageNum] = useState(1);
  // Function to handle starting a new month
  const startNewMonth = (direction) => {
    const currentMoment = moment(currentMonth, "MMM");

    let nextMonth;

    if (direction === "next") {
      nextMonth = currentMoment.add(1, "months").format("MMM");
    } else if (direction === "previous") {
      nextMonth = currentMoment.subtract(1, "months").format("MMM");
    }

    setCurrentMonth(nextMonth);
  };

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

  function openGarbage() {
    setIsGarbage(true);
  }
  function closeGarbage() {
    setIsGarbage(false);
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

  const getAgent = async () => {
    const response = await api(`/Details/relevant-agent/`, "GET", {}, {});
    setAgent(response?.relevantAgent);
  };

  const assignedAgent = agent?.find((house) => house.houseId == visitedHouseId);

  useEffect(() => {
    const getTenantinfo = async () => {
      try {
        const response = await api(
          `/houseRegister/${visitedHouseId}`,
          "GET",
          {},
          {}
        );
        setPagination(response?.pagination);
      } catch (error) {
        console.log(error);
      }
    };
    getTenantinfo();
    getHouse();
    getAgent();
  }, [houseName, houseId]);

  console.log(pagination);

  const handleNext = async () => {
    const nextPage = pagination.currentPage + 1;
    setPageNum(nextPage);

    try {
      // Fetch data for the next page
      const response = await api(
        `/houseRegister/${visitedHouseId}/?page=${nextPage}`,
        "GET",
        {},
        {}
      );
      setPagination(response.pagination);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle error as needed
    }
  };


  const handleprev = async () => {
    const prevPage = pagination.currentPage - 1;
    setPageNum(prevPage);

    try {
      const response = await api(
        `/houseRegister/${visitedHouseId}/?page=${prevPage}`,
        "GET",
        {},
        {}
      );
      setPagination(response.pagination);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  

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
        setPayments(response?.totalAdditionalPayments);
      } catch (error) {}
    };
    if (visitedHouseId) {
      getPayments(visitedHouseId);
    }
  }, [visitedHouseId]);

  const filteredProducts = pagination?.currentPosts?.filter((item) => {
    // Check if the item matches the search query
    const matchesQuery = keys.some((key) => {
      const value = item[key];
      return (
        value &&
        typeof value === "string" &&
        value.toLowerCase().includes(query)
      );
    });

    const matchesMonth = month.some((key) => {
      const value = item[key];
      const formatedDate = moment(value).format("MMM").toLowerCase();
      return (
        value && typeof value === "string" && formatedDate.includes(months)
      );
    });
    return matchesMonth ? matchesMonth : matchesQuery;
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
      await api(`/Tenant/removeTenant/?id=${id}`, "DELETE", {}, {});
      getTenantinfo();
    } else {
      alert("Action Cancelled");
    }
  };

  return (
    <>
      <article class=" bg-white p-4  sm:p-6 lg:p-8 mt-4  ">
        <div class="flex items-start sm:gap-8 ">
          <div className="border p-10 rounded-lg shadow-md shadow-green-200 ">
            <div className="flex flex-row gap-10 flex-wrap ">
              <div
                class=" sm:grid sm:size-20 sm:shrink-0 sm:place-content-center sm:rounded-full sm:border-2 sm:border-green-500 "
                aria-hidden="true"
              >
                <div class="flex items-center gap-1">
                  <span class="h-8 w-0.5 rounded-full bg-green-500"></span>
                  <span class="h-6 w-0.5 rounded-full bg-green-500"></span>
                  <span class="h-4 w-0.5 rounded-full bg-green-500"></span>
                  <span class="h-6 w-0.5 rounded-full bg-green-500"></span>
                  <span class="h-8 w-0.5 rounded-full bg-green-500"></span>
                </div>
              </div>
              <div>
                <strong class="rounded border border-green-500 bg-green-500 px-3 py-1.5 text-[10px] font-medium text-white">
                  Landlord / Owner
                </strong>

                <h3 class="mt-4 text-lg font-medium sm:text-xl">
                  <span class="hover:underline">
                    {house && house.length > 0 && house[0].houses.email}
                  </span>
                </h3>
              </div>

              <div>
                <strong class="rounded border border-green-500 bg-green-500 px-3 py-1.5 text-[10px] font-medium text-white">
                  Landlord-since
                </strong>

                <h3 class="mt-4 text-lg font-medium sm:text-xl">
                  <span class="hover:underline">
                    {moment(
                      house && house.length > 0 && house[0].houses.createdAt
                    ).format("MMM Do YY")}
                  </span>
                </h3>
              </div>

              <div>
                <strong class="rounded border border-green-500 bg-green-500 px-3 py-1.5 text-[10px] font-medium text-white">
                  House Agent
                </strong>

                <h3 class="mt-4 text-lg font-medium sm:text-xl">
                  <span class="hover:underline">
                    {assignedAgent?.agent?.email}
                  </span>
                </h3>
              </div>
            </div>

            <div class="mt-4 sm:flex sm:items-center sm:gap-2">
              <div class="flex items-center gap-1 text-gray-500">
                <svg
                  class="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>

                <p class="text-xs font-medium">
                  {moment(
                    house && house.length > 0 && house[0].houses.createdAt,
                    "YYYYMMDD"
                  ).fromNow()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </article>

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
              onClick={() => startNewMonth("previous")}
              class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Previous Month
            </button>
            <button
              onClick={() => startNewMonth("next")}
              class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Start Month
            </button>
          </div>
        </div>

        <div className="divider mt-2"></div>
        {/* Team Member list in table format loaded constant */}
        <div class="mt-24 m-10 overflow-hidden">     
             <table ref={targetRef} class="font-inter w-full table-auto border-separate border-spacing-y-1 overflow-scroll text-left md:overflow-auto">
          <thead class="w-full rounded-lg bg-[#222E3A]/[6%] text-base font-semibold text-gray-800">              <tr>
                <th className="whitespace-nowrap px-2.5 py-3 text-sm font-normal text-[#212B36]">Number </th>
                <th className="whitespace-nowrap px-2.5 py-3 text-sm font-normal text-[#212B36]">House Number</th>
                <th className="whitespace-nowrap px-2.5 py-3 text-sm font-normal text-[#212B36]">Tenant Name </th>
                <th className="whitespace-nowrap px-2.5 py-3 text-sm font-normal text-[#212B36]">payable Rent</th>
                <th className="whitespace-nowrap px-2.5 py-3 text-sm font-normal text-[#212B36]"> Paid Rent</th>

                <th className="flex flex-row">
                  <th> additinalPayments</th>
                  <th> date</th>
                  <th> paymentType</th>
                </th>
                <th className="whitespace-nowrap px-2.5 py-3 text-sm font-normal text-[#212B36]">Rent Deposit</th>
                <th className="whitespace-nowrap px-2.5 py-3 text-sm font-normal text-[#212B36]">prev water reading</th>
                <th className="whitespace-nowrap px-2.5 py-3 text-sm font-normal text-[#212B36]">current water reading</th>
                <th className="whitespace-nowrap px-2.5 py-3 text-sm font-normal text-[#212B36]">Water units</th>

                <th className="whitespace-nowrap px-2.5 py-3 text-sm font-normal text-[#212B36]">Water per unit (Ksh)</th>
                <th className="whitespace-nowrap px-2.5 py-3 text-sm font-normal text-[#212B36]">Water Bill</th>
                <th className="whitespace-nowrap px-2.5 py-3 text-sm font-normal text-[#212B36]">Previous Balance</th>
                <th className="whitespace-nowrap px-2.5 py-3 text-sm font-normal text-[#212B36]">Garbage price (Ksh)</th>
                <th className="whitespace-nowrap px-2.5 py-3 text-sm font-normal text-[#212B36]">Phone Number</th>
                <th className="whitespace-nowrap px-2.5 py-3 text-sm font-normal text-[#212B36]">Next_of_kin </th>
                <th className="whitespace-nowrap px-2.5 py-3 text-sm font-normal text-[#212B36]">balance C/F</th>
                <th className="whitespace-nowrap px-2.5 py-3 text-sm font-normal text-[#212B36]">Total</th>
                <th className="whitespace-nowrap px-2.5 py-3 text-sm font-normal text-[#212B36]"> Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts?.map((tenants, index) => (
                      <tr key={index} class="cursor-pointer bg-[#f6f8fa] drop-shadow-[0_0_10px_rgba(34,46,58,0.02)] hover:shadow-2xl">
                  <td  class="rounded-l-lg py-4 pl-3 text-sm font-normal text-[#637381]">
                    {index + 1}
                  </td>
                  <td  class="rounded-l-lg py-4 pl-3 text-sm font-normal text-[#637381]">
                    {tenants.houseNumber}
                  </td>
                  <td  class="rounded-l-lg py-4 pl-3 text-sm font-normal text-[#637381]">
                    {tenants.tenantsName}
                  </td>
                  <td  class="rounded-l-lg py-4 pl-3 text-sm font-normal text-[#637381]">
                    {tenants.payableRent}
                  </td>

                  <td  class="rounded-l-lg py-4 pl-3 text-sm font-normal text-[#637381]">
                  {moment(tenants.createdAt).format("MMM") !== currentMonth ? 0 : tenants.rent}
                  </td>
                  <td  class="rounded-l-lg py-4 pl-3 text-sm font-normal text-[#637381]">
                    {payments &&
                      Object.values(payments).map((paymentData, index) => {
                        const matchingObjects = Object.values(
                          paymentData
                        ).filter((obj) => obj.userId === tenants.id);

                        const paymentsForCurrentMonth = matchingObjects.filter(
                          (payment) => {
                            const isCurrentMonth =
                              moment(payment.dateTime).format("MMM") ===
                              currentMonth;

                            return isCurrentMonth;
                          }
                        );

                        if (paymentsForCurrentMonth.length > 0) {
                          const totalAmount = paymentsForCurrentMonth.reduce(
                            (sum, obj) => sum + Number(obj.amount),
                            0
                          );

                          return (
                            <React.Fragment key={index}>
                              {paymentsForCurrentMonth.map(
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
                                  New Rent: { moment(tenants.createdAt).format("MMM") !== currentMonth? totalAmount + 0 :totalAmount+ Number(tenants.rent)}
                                </td>
                              </tr>
                            </React.Fragment>
                          );
                        }

                        return null;
                      })}{" "}
                  </td>
                  <td  class="rounded-l-lg py-4 pl-3 text-sm font-normal text-[#637381]">
                    {tenants.rentDeposit}
                  </td>
                  <td  class="rounded-l-lg py-4 pl-3 text-sm font-normal text-[#637381]">
                    {tenants.prevReadings}
                  </td>
                  <td  class="rounded-l-lg py-4 pl-3 text-sm font-normal text-[#637381]">
                    {tenants.currentReadings <= 0 ? 0 : tenants.currentReadings}
                  </td>
                  <td  class="rounded-l-lg py-4 pl-3 text-sm font-normal text-[#637381]">
                    {tenants.totalWaterReadings <= 0
                      ? 0
                      : tenants?.totalWaterReadings}
                  </td>
                  <td  class="rounded-l-lg py-4 pl-3 text-sm font-normal text-[#637381]">
                    {getWater &&
                      getWater?.map((house) => house.price).slice(-1)[0]}
                  </td>

                  <td
                    className={`  ${
                      tenants?.totalWaterReadings * waterUnits <= 0
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {tenants?.totalWaterReadings * waterUnits <= 0
                      ? 0
                      : tenants?.totalWaterReadings * waterUnits}
                  </td>
                  <td  class="rounded-l-lg py-4 pl-3 text-sm font-normal text-[#637381]">
                    {tenants.previousBalance}
                  </td>
                  <td  class="rounded-l-lg py-4 pl-3 text-sm font-normal text-[#637381]">
                    {getGarbage &&
                      getGarbage?.map((house) => house.price).slice(-1)[0]}
                  </td>
                  <td  class="rounded-l-lg py-4 pl-3 text-sm font-normal text-[#637381]">
                    {tenants.phoneNumber}
                  </td>
                  <td  class="rounded-l-lg py-4 pl-3 text-sm font-normal text-[#637381]">
                    {tenants.nextOfKingNumber}
                  </td>
                  <td
                    className={` rounded-l-lg py-4 pl-3 text-sm font-normal text-[#637381]  ${
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
                            )) -
                        tenants?.totalWaterReadings * waterUnits >=
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
                          .reduce((sum, totalAmount) => sum + totalAmount, 0)) +
                      -tenants?.totalWaterReadings * waterUnits}
                  </td>
                  <td  class="rounded-l-lg py-4 pl-3 text-sm font-normal text-[#637381]">
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
          <div className="flex flex-row justify-center items-center  gap-4">
        <button className="border p-2 " onClick={handleprev}>
          prev
        </button>

        <div className="flex flex-row justify-center items-center">
          {pagination?.totalPages?.map((number) => (
            <div key={number} className="">
              <a className="page-link ">
                <p
                  className={`flex flex-row gap-4 border p-2 cursor-pointer ${
                    pageNum == number ? "bg-teal-600" : "bg-white"
                  }
              `}
                >
                  {" "}
                  {number}
                </p>
              </a>
            </div>
          ))}
        </div>

        <button className="border p-2 " onClick={handleNext}>
          next
        </button>
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
                        Gabage Rate{" "}
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
