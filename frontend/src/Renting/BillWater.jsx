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

  const handleUpdate = async () => {
    try {
      // Filter out only the updated tenants
      const updatedTenants = Object.entries(updatedUsers).map(
        ([id, values]) => ({
          id,
          currentReadings: values.currentReadings,
          entryDate: values.entryDate,
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
      <div className="flex flex-col justify-center items-center mt-10">

        <div className="card w-full p-6 bg-base-100 shadow-xl ">
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
                      <td>
                        {tenants.id}
                      </td>

                      <td>
                        {tenants.houseNumber}
                      </td>
                      <td>
                        {tenants.tenantsName}
                      </td>

                      <td>
                        {tenants.prevReadings}
                      </td>
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
                        {tenants.currentReadings <= 0 ? 0 : tenants.currentReadings}
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
          <button type="submit" className="border p-2 mt-4 rounded-lg bg-blue-400 text-white leading-3 text-[1rem] font-thin  lg:hover:bg-blue-600">Bill</button>
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
    </>
  );
}

export default BillWater;
