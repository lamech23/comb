import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Calendar } from 'primereact/calendar';


function AdditinalPaymants() {
  let houseName = useLocation().pathname.split("/")[2];
  const [date, setDate]=useState(null)

  const [tenant, setTenant] = useState([]);
  // console.log(houseName);

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
  return (
    <>
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
              >
                {tenants.currentReadings <= 0 ? 0 : tenants.currentReadings}
              </td>

              <td>
              {/* <Calendar value={date} onChange={(e) => setDate(e.value)} /> */}
              </td>

              <td className="border text-black border-slate-700">
                {tenants.totalWaterReadings <= 0
                  ? 0
                  : tenants?.totalWaterReadings}
              </td>

              <td className="border text-black border-slate-700">
                {/* {getWater &&
                      getWater?.map((house) => house.price).slice(-1)[0]} */}
              </td>
              <td
                className={`border border-slate-700 ${
                  tenants?.totalWaterReadings < 0
                    ? "text-red-600"
                    : "text-green-600"
                }`}
              >
                {tenants?.totalWaterReadings <= 0
                  ? 0
                  : tenants?.totalWaterReadings}
              </td>
            </tr>
          ))}
          <tr></tr>
        </tbody>
      </table>
    </>
  );
}

export default AdditinalPaymants;
