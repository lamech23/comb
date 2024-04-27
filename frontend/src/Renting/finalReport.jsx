import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

function FinalReport() {
  const reportData = useLocation().state;
  console.log(reportData);

  // total calculation for rent
  const finalRentSum = reportData
    ?.map((data) => data.totalAmount)
    .reduce((prev, next) => prev + next, 0);

  // total calculation for  water_bill
  const finalWaterBillSum = reportData
    ?.map((data) => data.water_bill)
    .reduce((prev, next) => prev + next, 0);

  // total calculation for  balance
  const finalBalanceSum = reportData
    ?.map((data) => data.totalBalance)
    .reduce((prev, next) => prev + next, 0);


  let totalSum = finalRentSum + finalWaterBillSum + finalBalanceSum;
  let totalSumWithCommision = Math.floor((10 / 100) * totalSum);

  let netTotal = totalSum - totalSumWithCommision;

  return (
    <>
      <div className="px-40 mt-20">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-20">
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
                ${metaDeta.totalBalance < 0 ? "text-red-600" : "text-green-600"}
                px-6 py-4`}
                      >
                        Ksh {metaDeta.totalBalance}
                      </td>
                    </tr>
                  </tbody>
                ))}
            </table>            
          </div>
        </div>

    

        <table className=" w-full border text-sm text-left rtl:text-right mb-40 text-black dark:text-gray-400 ">
              <thead className="">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    
                  </th>
                  <th scope="col" className="px-6 py-3">
        
                  </th>
                  <th scope="col" className="px-6 py-3">
               
                  </th>
                </tr>
              </thead>
           
                  <tbody>
                    <tr className=" ">
                    <td class="border-b-0 p-3 text-center  text-lg font-semibold pt-2">
                       Total Rent Collected
                      </td>

                      <td class="border-b-0 p-3  text-lg font-semibold pt-2">
                      </td>

                    <td class="border-b-0 p-3  text-green-500 text-lg font-semibold  pt-2">
                      {" "} 
                       {finalRentSum}
                    </td>
                    </tr>

                    <tr className=" ">
                    <td class="border-b-0 p-3 text-center border-t text-lg font-semibold pt-2">
                      Total Water Bill Collected{" "}
                      </td>

                      <td class="border-b-0 p-3 border-t text-lg font-semibold pt-2">
                      </td>

                    <td class="border-b-0 p-3 border-t text-green-500 text-lg font-semibold  pt-2">
                      {" "} 
                       {finalWaterBillSum}
                    </td>
                    </tr>

                    <tr className=" ">
                    <td class="border-b-0 p-3 text-center border-t text-lg font-semibold pt-2">
                       Total Balance
                      </td>

                      <td class="border-b-0 p-3 border-t text-lg font-semibold pt-2">
                      </td>

                    <td class={`text-lg font-semibold border-b-0 p-3 border-t  ${
                        finalBalanceSum < 0 ? "text-red-600" : "text-green-600"
                      } `}
                    >
                      {" "}
                      {finalBalanceSum}
                    </td>
                    </tr>

                    <tr className=" ">
                    <td class="border-b-0 p-3 text-center border-t text-lg font-semibold pt-2">
                      Total Water Bill Collected{" "}
                      </td>

                      <td class="border-b-0 p-3 border-t text-lg font-semibold pt-2">
                      </td>

                    <td class="border-b-0 p-3 border-t text-green-500 text-lg font-semibold  pt-2">
                      {" "} 
                       {finalWaterBillSum}
                    </td>
                    </tr>

                    <tr className=" ">
                     <td class="border-b-0 p-3 text-center border-t text-lg font-semibold pt-2">
                       Total Collection{" "}
                      </td>

                      <td class="border-b-0 p-3 border-t text-lg font-semibold pt-2">
                      </td>

                    <td class="border-b-0 p-3 border-t text-green-500 text-lg font-semibold  pt-2">
                      {" "} 
                      {totalSum}
                    </td>
                    </tr>


                    <tr className=" ">
                     <td class="border-b-0 p-3 text-center border-t text-lg font-semibold pt-2">
                       Commission 10%{" "}
                      </td>

                      <td class="border-b-0 p-3 border-t text-lg font-semibold pt-2">
                      </td>

                    <td class="border-b-0 p-3 border-t text-green-500 text-lg font-semibold  pt-2">
                      {" "} 
                      {totalSumWithCommision}
                    </td>
                    </tr>

                    <tr className=" ">
                    <td class="border-b-0 p-3 text-center border-t text-lg font-semibold pt-2">
                       Net Total{" "}
                      </td>

                      <td class="border-b-0 p-3 border-t text-lg font-semibold pt-2">
                      </td>

                    <td class="border-b-0 p-3 border-t text-green-500 text-lg font-semibold  pt-2">
                      {" "} 
                      {netTotal}
                    </td>
                    </tr>
                  </tbody>
            </table>
      </div>
    </>
  );
}

export default FinalReport;
