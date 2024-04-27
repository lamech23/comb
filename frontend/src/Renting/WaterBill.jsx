import React from 'react'

function WaterBill({tenant, waterUnits, state}) {
  return (
    <div>

            <div className="flex flex-col mt-20">
      <span className='mb-10 font-bold text-3xl capitalize text-green-500 '> Water report </span>

          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline- align-middle">
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-200">
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
                     
                    </tr>
                  </thead>
                  {tenant?.map((tenants) => (
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
                     
                      </tr>
                    </tbody>
                  ))}
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default WaterBill