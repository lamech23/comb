import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Calendar } from "primereact/calendar";
import { toast, ToastContainer } from "react-toastify";

function BillWater() {
  let houseId = useLocation().pathname.split("/")[2];
  const [date, setDate] = useState(null);
  const [updatedUsers, setUpdatedUsers] = useState({});
  const [tenant, setTenant] = useState([]);
  const state = useLocation().state; // am  using one for to create and update

  // water bill total

  const waterUnits = state
    ?.map((house) => {
      return house.price;
    })
    .slice(-1)[0];

  useEffect(() => {
    const getTenantinfo = async () => {
      try {
        const response = await axios.get(
          ` http://localhost:4000/houseRegister/${houseId}`
        );
        setTenant(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getTenantinfo();
  }, []);

  console.log(tenant);

  const handleUpdate = async () => {
    try {
      // Filter out only the updated tenants
      const updatedTenants = Object.entries(updatedUsers).map(
        ([id, values]) => ({
          id,
          currentReadings: values.currentReadings,
          entryDate: values.entryDate,
          house_id: values.houseId,
        })
      );
      // Send a batch update request to the server
      const response = await axios.put(
        `http://localhost:4000/Tenant/updateWaterBill`,
        { updatedTenants }
      );
      toast.success("Added successfully");
    } catch (error) {
      toast.error("Number must be a positive value");
    }
  };

  return (
    <>
      <div className=" px-20 shadow-xl shadow-indigo-100 rounded-lg mt-16">
        <div className="flex flex-col justify-center items-center mt-10">
          <div className="card w-full p-6 bg-base-100  ">
            <p>Bill Water</p>
            <div className="divider mt-2"></div>
            {/* Team Member list in table format loaded constant */}
            <div className="overflow-x-auto w-full">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>id </th>
                    <th>House Number</th>
                    <th>Tenant Name </th>

                    <th>prev water reading</th>
                    <th>current water reading</th>
                    <th>Entry Date </th>
                    <th>Water units</th>

                    <th>Water per unit</th>
                    <th>Water Bill</th>
                  </tr>
                </thead>
                {tenant?.detailsWithTotal?.map((tenants) => (
                  <tr key={tenants.id}>
                    <td>{tenants.id}</td>

                    <td>{tenants.houseNumber}</td>
                    <td>{tenants.tenantsName}</td>

                    <td>{tenants.prevReadings}</td>
                    <td
                      class="rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none sm:text-sm sm:leading-6"
                      contentEditable={true}
                      onBlur={(e) =>
                        setUpdatedUsers({
                          ...updatedUsers,
                          [tenants.id]: {
                            ...updatedUsers[tenants.id],
                            currentReadings: e.target.innerText,
                          },
                        })
                      }
                    >
                      {tenants.currentReadings <= 0
                        ? 0
                        : tenants.currentReadings}
                    </td>

                    <td class="rounded-md mr-2 border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none sm:text-sm sm:leading-6">
                      <Calendar
                        className=" focus:outline-none w-full"
                        value={date}
                        onChange={(e) =>
                          setUpdatedUsers({
                            ...updatedUsers,
                            [tenants.id]: {
                              ...updatedUsers[tenants.id],
                              entryDate: e.value,
                            },
                          })
                        }
                      />
                    </td>

                    <td>
                      {tenants.totalWaterReadings <= 0
                        ? 0
                        : tenants?.totalWaterReadings}
                    </td>

                    <td>
                      {state && state?.map((house) => house.price).slice(-1)[0]}
                    </td>

                    <td
                      className={`${
                        tenants?.totalWaterReadings * waterUnits < 0
                          ? "text-red-600"
                          : "text-green-600"
                      }`}
                    >
                      {tenants?.totalWaterReadings * waterUnits <= 0
                        ? 0
                        : tenants?.totalWaterReadings * waterUnits}
                    </td>
                  </tr>
                ))}
              </table>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleUpdate();
                }}
              >
                <button
                  type="submit "
                  class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                >
                  Bill water
                </button>{" "}
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
        </div>

        {/* water reportsection  */}
        <div className="flex flex-col mt-20">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline- align-middle">
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                      >
                        Tenant Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                      >
                        House Number
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                      >
                        Water Units
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                      >
                        Rates
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                      >
                        Bill
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  {tenant?.detailsWithTotal?.map((tenants) => (
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-600">
                          {tenants.tenantsName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-600">
                          {tenants.houseNumber}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-600">
                          {tenants.totalWaterReadings <= 0
                            ? 0
                            : tenants?.totalWaterReadings}{" "}
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-600">
                          {state &&
                            state?.map((house) => house.price).slice(-1)[0]}
                        </td>
                        <td
                          className={`px-6 py-4 whitespace-nowrap text-sm ${
                            tenants?.totalWaterReadings * waterUnits < 0
                              ? "text-red-600"
                              : "text-green-600"
                          }`}
                        >
                          {tenants?.totalWaterReadings * waterUnits <= 0
                            ? 0
                            : tenants?.totalWaterReadings * waterUnits}{" "}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                          <button
                            type="button"
                            className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-rose-600 hover:text-rose-800 disabled:opacity-50 disabled:pointer-events-none dark:text-rose-500 dark:hover:text-rose-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  ))}
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BillWater;
