import React, { useEffect, useState } from "react";
import { api } from "../utils/Api";

function PaymentView() {
  const [payments, setpayments] = useState([]);
  const fetchOpenpayments = async () => {
    const response = await api("/payment/open-payments/", "GET", {}, {});

    setpayments(response?.payments);
  };

  useEffect(() => {
    fetchOpenpayments();
  }, []);

  console.log(payments, "this payment ");

  return (
    <div>
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left rtl:text-right text-gray-200 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase  dark:text-gray-400">
            <tr>
              <th scope="col" class="px-16 py-3">
                <span class="sr-only">Image</span>
              </th>
              <th scope="col" class="px-6 py-3">
                House 
              </th>

              <th scope="col" class="px-6 py-3">
                house Number
              </th>
              <th scope="col" class="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          {payments.map((item) => (
            <tbody>
              <tr class="bg-white border-b  hover:bg-gray-50 dark:hover:bg-gray-100">
                <td class="p-4">
                  <img
                    src={item.image}
                    class="w-16 md:w-32 max-w-full max-h-full"
                    alt="Apple Watch"
                  />
                </td>
                <td class="px-6 py-4 font-semibold text-gray-900 ">
                  {item.house.houseName}
                </td>

                <td class="px-6 py-4 font-semibold text-gray-900 ">
                {item.tenant.houseNumber}

                
                </td>
                <td class=" flex flex-row gap-4  px-6 py-4">

                <a
                    href="#"
                    class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    >
                    confirm
                  </a>
                  <a
                    href="#"
                    class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-900 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    >
                    reject
                  </a>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
}

export default PaymentView;
