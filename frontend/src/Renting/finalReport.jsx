import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

function FinalReport() {
  const reportData = useLocation().state;

  return (
    <>
      <div className="px-40 mt-20">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
          <table className="w-full text-sm text-left rtl:text-right text-black dark:text-gray-400 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-100 dark:text-black">
              <tr>
                <th scope="col" className="px-6 py-3">
                  House Number
                </th>
                <th scope="col" className="px-6 py-3">
                  Tenant Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Rent
                </th>
                <th scope="col" className="px-6 py-3">
                  Water Bill
                </th>
                <th scope="col" className="px-6 py-3">
                  Balance
                </th>
              </tr>
            </thead>
            {reportData &&
              reportData.map((metaDeta, index) => (
                <tbody key={index}>
                  <tr className=" ">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-black whitespace-nowrap "
                    >
                      {metaDeta.houseNumber}
                    </th>
                    <td className="px-6 py-4 text-black">
                      {metaDeta.tenantsName}
                    </td>
                    <td className="px-6 py-4 text-black">
                      ksh {metaDeta.totalAmount}
                    </td>
                    <td className="px-6 py-4 text-black">
                      Ksh {metaDeta.water_bill}
                    </td>
                    <td
                      className={`
                ${metaDeta.balance < 0 ? "text-red-600" : "text-green-600"}
                px-6 py-4`}
                    >
                      Ksh {metaDeta.balance}
                    </td>
                  </tr>
                </tbody>
              ))}
          </table>
        </div>
      </div>
    </>
  );
}

export default FinalReport;
