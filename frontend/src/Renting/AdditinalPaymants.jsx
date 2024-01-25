import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Calendar } from "primereact/calendar";

function AdditinalPaymants() {
  let houseName = useLocation().pathname.split("/")[2];
  const [dateTime, setDateTime] = useState({});
  const [amount, setAmount] = useState(null);
  const [paymentType, setPaymentType] = useState("");

  const [updatedUsers, setUpdatedUsers] = useState({});


  const [tenant, setTenant] = useState([]);


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
  }, []);

  const creatingPayment = async (e) => {
    e.preventDefault();

    const updatedPayment = Object.entries(updatedUsers).map(([id, values]) => ({
      id,
         amount: values.amount,
        paymentType: values.paymentType,
        dateTime: values.dateTime,
    }));
    console.log(updatedPayment);
    const response = await axios.post(
      `http://localhost:4000/Tenant/registerPayment/`,
      { updatedPayment }
    );

  };
  return (
    <>
      <div className=" flex flex-col justify-center items-center gap-20 mt-20  ">
        <form onSubmit={creatingPayment}>
          <table className=" table-auto border-separate border-spacing-2 border border-slate-400   ">
            <thead className="">
              <tr>
                <th className="border border-slate-600">id </th>
                <th className="border border-slate-600">House Number</th>
                <th className="border border-slate-600">Tenant Name </th>

                <th className="border border-slate-600">payments</th>
                <th className="border border-slate-600">Paid Date</th>
                <th className="border border-slate-600">PaymentType</th>
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
              <tr></tr>
            </tbody>
          </table>
          <button
            type="submit"
            className="border p-2 mt-4 rounded-lg bg-blue-400 text-white leading-3 text-[1rem] font-thin  lg:hover:bg-blue-600"
          >
            {" "}
            add payments
          </button>
        </form>
      </div>
    </>
  );
}

export default AdditinalPaymants;
