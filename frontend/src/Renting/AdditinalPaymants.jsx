import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Calendar } from "primereact/calendar";
import { api } from "../utils/Api";

function AdditinalPaymants() {
  let houseId = useLocation().pathname.split("/")[2];
  const [dateTime, setDateTime] = useState({});
  const [amount, setAmount] = useState(null);
  const [paymentType, setPaymentType] = useState("");

  const [updatedUsers, setUpdatedUsers] = useState({});

  const [tenant, setTenant] = useState([]);

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
  }, []);

  const creatingPayment = async (e) => {
    e.preventDefault();

    const updatedPayment = Object.entries(updatedUsers).map(([id, values]) => ({
      id,
      amount: values.amount,
      paymentType: values.paymentType,
      dateTime: values.dateTime,
    }));
    const response = await api(
      "/Tenant/registerPayment/",
      "POST",
      {},
      { updatedPayment }
    );
  };
  return (
    <>
      <div className="card w-full p-6 bg-base-100 shadow-xl ">
        <p>Additional Payment</p>
        <div className="divider mt-2"></div>
        {/* Team Member list in table format loaded constant */}
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th>id </th>
                <th>House Number</th>
                <th>Tenant Name </th>
                <th>payments</th>
                <th>Paid Date</th>
                <th>PaymentType</th>
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
                    <input
                      type="text"
                      value={amount}
                      onChange={(e) =>
                        setUpdatedUsers({
                          ...updatedUsers,
                          [tenants.id]: {
                            ...updatedUsers[tenants.id],
                            amount: e.target.value, // Fix the property name to "amount"
                          },
                        })
                      }
                    />
                  </td>
                  <td className="border text-black border-slate-700">
                    <Calendar
                      value={dateTime}
                      onChange={(e) =>
                        setUpdatedUsers({
                          ...updatedUsers,
                          [tenants.id]: {
                            ...updatedUsers[tenants.id],
                            dateTime: e.target.value,
                          },
                        })
                      }
                    />
                  </td>

                  <select
                    id="paymenyType"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500
                      focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                        dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={paymentType}
                    onChange={(e) =>
                      setUpdatedUsers({
                        ...updatedUsers,
                        [tenants.id]: {
                          ...updatedUsers[tenants.id],
                          paymentType: e.target.value,
                        },
                      })
                    }
                  >
                    <option>payment Type</option>
                    <option value="mpesa">Mpesa</option>
                    <option value="bank">Bank </option>
                    <option value="cash">Cash</option>
                  </select>
                </tr>
              ))}
            </tbody>
          </table>

          <form onSubmit={creatingPayment}>
            <button
              type="submit"
              className="border p-2 mt-4 rounded-lg bg-blue-400 text-white leading-3 text-[1rem] font-thin  lg:hover:bg-blue-600"
            >
              {" "}
              add payments
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AdditinalPaymants;
