import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Calendar } from "primereact/calendar";
import { toast, ToastContainer } from "react-toastify";

function BillWater() {
  let houseName = useLocation().pathname.split("/")[2];
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
          ` http://localhost:4000/houseRegister/${houseName}`
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
      const updatedTenants = Object.entries(updatedUsers).map(([id, values]) => ({
        id,
        currentReadings: values.currentReadings, 
        entryDate: values.entryDate,
      }));
      
  
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
        <table className=" table-auto border-separate border-spacing-2 border border-slate-400   ">
          <thead className="">
            <tr>
              <th className="border border-slate-600">id </th>
              <th className="border border-slate-600">House Number</th>
              <th className="border border-slate-600">Tenant Name </th>

              <th className="border border-slate-600">prev water reading</th>
              <th className="border border-slate-600">current water reading</th>
              <th className="border border-slate-600">Entry Date </th>
              <th className="border border-slate-600">Water units</th>

              <th className="border border-slate-600">Water per unit</th>
              <th className="border border-slate-600">Water Bill</th>
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
                  {tenants.prevReadings}
                </td>
                <td
                  className="border text-black border-slate-700"
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

                <td className="border text-black border-slate-700">
                  <Calendar
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

                <td className="border text-black border-slate-700">
                  {tenants.totalWaterReadings <= 0
                    ? 0
                    : tenants?.totalWaterReadings}
                </td>

                <td className="border text-black border-slate-700">
                  {state && state?.map((house) => house.price).slice(-1)[0]}
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
              </tr>
            ))}
            <tr></tr>
          </tbody>
        </table>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleUpdate();
          }}
        >
          <button type="submit">Bill</button>
        </form>

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
