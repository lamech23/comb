import React, { useEffect, useState } from "react";
import UserGroupIcon from "@heroicons/react/24/outline/UserGroupIcon";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import Graph from "../utils/Graph";
import PieGraph from "../utils/PieGraph";
import HomeIcon from "@heroicons/react/24/outline/HomeIcon";
import { api } from "../utils/Api";
import TransactionGraph from "../utils/TransactionGraph";

function Stats() {
  const [newsLetter, setNewsLetter] = useState([]);
  const [houses, setHousesCount] = useState();
  const [counts, setCounts] = useState(0);
  const [users, setUsers] = useState(0);
  const [activeUser, setActiveUser] = useState(0);
  const [tenant, setTenant] = useState(0);
  const [landowner, setLandOwner] = useState(0);
  let navigate = useNavigate();
  const [allUsers, setAllUsers] = useState([]);
  const [payments, setpayments] = useState([]);
  const [allPayments, setAllPayments] = useState([]);
  const [payment, setPayment] = useState([]);


  try {
    useEffect(() => {
      fetchNewsLetters();
      fetchTotalNews();
      fetchUsers();
      fetchOpenpayments();
      fetchAllPayments();
    }, [setCounts]);

    const fetchUsers = async () => {
      const response = await api("/Users/all", "GET", {}, {});
      setAllUsers(response.user);
    };

    //newsLetter
    const fetchNewsLetters = async () => {
      const response = await api("/news/newsLetter/Sub", "GET", {}, {});

      setNewsLetter(response.data);
    };

    // get all payments  with status open
    const fetchOpenpayments = async () => {
      const response = await api("/payment/open-payments/", "GET", {}, {});

      setpayments(response?.payments);
    };

    const fetchAllPayments = async () => {
      const response = await api("/payment/all-payments/", "GET", {}, {});

      setAllPayments(response?.payment);
    };

    const fetchTotalNews = async () => {
      try {
        const response = await api("/Total/get-stats", "GET", {}, {});

        const { count3, count, count2, activeUser, Tenant, Landlord } =
          response;

        setHousesCount(count3);
        setCounts(count);
        setUsers(count2);
        setActiveUser(activeUser);
        setTenant(Tenant);
        setLandOwner(Landlord);
      } catch (error) {
        console.log("Error fetching total news:", error);
      }
    };
  } catch (error) {
    console.log(error);
  }
useEffect(()=>{

  
  const getPayments = async () => {
    try {
      const response = await api(
        `/Tenant/payments-analytics`,
        "GET",
        {},
        {}
      );
      setPayment(response?.mergedData?.paymentData);
    } catch (error) {}
  };
  getPayments()
},[])
console.log(payment);
  return (
    <div>
      <div className="container-fluid px-4 mt-5">
        <div className="grid lg:grid-cols-4 mt-2 md:grid-cols-2 grid-cols-1 gap-6">
          <div className="stats shadow">
            <div className="stat">
              <div className="stat-figure  dark:text-slate-700">
                <HomeIcon className="w-8 h-8" />
              </div>
              <div className="stat-title dark:text-slate-300">Houses</div>
              <div className="stat-value dark:text-slate-300">{houses}</div>
            </div>
          </div>

          <div className="stats shadow">
            <div className="stat">
              <div className="stat-figure  dark:text-slate-700">
                <UserGroupIcon className="w-8 h-8" />
              </div>
              <div className="stat-title dark:text-slate-300">users</div>
              <div className="stat-value dark:text-slate-300">{users}</div>
            </div>
          </div>

          <div className="stats shadow">
            <div className="stat">
              <div className="stat-figure  dark:text-slate-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                  />
                </svg>
              </div>
              <div className="stat-title dark:text-slate-300">Newsletter</div>
              <div className="stat-value dark:text-slate-300">{counts}</div>
            </div>
          </div>

          <div className="stats shadow">
            <div className="stat">
              <div className="stat-figure  dark:text-slate-700">
                <UserGroupIcon className="w-8 h-8" />
              </div>
              <div className="stat-title dark:text-slate-300">Active Users</div>
              <div className="stat-value dark:text-slate-300">{activeUser}</div>
            </div>
          </div>

          <div className="stats shadow">
            <div className="stat">
              <div className="stat-figure  dark:text-slate-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z"
                  />
                </svg>
              </div>
              <div className="stat-title dark:text-slate-300">Tenants</div>
              <div className="stat-value dark:text-slate-300">{tenant}</div>
            </div>
          </div>

          <div className="stats shadow">
            <div className="stat">
              <div className="stat-figure  dark:text-slate-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"
                  />
                </svg>
              </div>
              <div className="stat-title dark:text-slate-300">Landlords</div>
              <div className="stat-value dark:text-slate-300">{landowner}</div>
            </div>
          </div>

          <div className="  stats shadow ">
            <div className="relative stat">
              <div className="stat-figure  dark:text-slate-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
                  />
                </svg>
              </div>
              <Link
                to={"/admin/payment-view"}
                className="stat-title dark:text-slate-300 hover:dark:text-slate-700"
              >
                Payments Requests{" "}
              </Link>
              <div className="stat-value dark:text-red-600">
                {payments.length}
              </div>
            </div>
          </div>
        </div>
        <div className="grid  lg:grid-cols-4 xl:grid-cols-6  grid-cols-2 gap-4 mt-10">
          {/* Graph Component */}
          <div className="col-span-2 ">
            <div className=" rounded-lg  p-4 basis-1/4">
              <h2 className="text-xl font-bold mb-4">User Statistics</h2>
              <Graph users={allUsers} />
            </div>
          </div>

          {/* PieGraph Component */}
          <div className="col-span-2">
            <div className=" rounded-lg  p-4">
              <h2 className="text-xl font-bold mb-4">Payment Request Breakdown</h2>
              <PieGraph payments={allPayments} />
            </div>
          </div>

          {/* PieGraph Component */}
          <div className="col-span-2">
            <div className=" rounded-lg  p-4">
              <h2 className="text-xl font-bold mb-4">Monthly Payments Transaction </h2>
              <TransactionGraph payments={payment} />
            </div>
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
    </div>
  );
}

export default Stats;
