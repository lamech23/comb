import React from 'react'

function WaterBill({tenant, waterUnits, state}) {
  return (
    <div>
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
  )
}

export default WaterBill