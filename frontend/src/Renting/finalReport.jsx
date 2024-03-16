import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

function FinalReport() {
  const reportData = useLocation().state;

  return (
    <>
      <div className="px-40 mt-20">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
        <div class="px-4 py-5 flex-auto">

          <table className=" w-full text-sm text-left rtl:text-right text-black dark:text-gray-400 ">
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

           <tfoot  className="text-right  items-end ">
           <tr class="mt-4">
              <th class="border-b-0 p-3 border-t">
                <p class="text-lg font-semibold pt-2">Total Rent Collected</p>
              </th>

              <th class="border-b-0 p-3 border-t" colspan="3">
                <p class="text-right text-lg font-semibold pt-2"> Ksh 3000</p>
              </th>
            </tr>

            <tr class="mt-4">
              <th class="border-b-0 p-3 border-t">
                <p class="text-lg font-semibold pt-2">Total Water Bill Collected </p>
              </th>

              <th class="border-b-0 p-3 border-t" colspan="3">
                <p class="text-right text-lg font-semibold pt-2"> Ksh 3000</p>
              </th>
            </tr>
            <tr class="mt-4">
              <th class="border-b-0 p-3 border-t">
                <p class="text-lg font-semibold pt-2">Total Balance </p>
              </th>

              <th class="border-b-0 p-3 border-t" colspan="3">
                <p class="text-right text-lg font-semibold pt-2"> Ksh 3000</p>
              </th>
            </tr>
           </tfoot>
          </table>
        </div>
        </div>
      </div>
    </>
  );
}

export default FinalReport;
