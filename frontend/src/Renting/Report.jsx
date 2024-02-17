import React, { useEffect, useState } from "react";
import logo from "../componets/images/logo.jpg";
import axios from "axios";
import { useLocation } from "react-router-dom";

function Report() {
  const [house, setHouse] = useState([]);
  const [tenant, setTenant] = useState([]);
  const [payments, setPayments] = useState([]);
  const houseName = useLocation().state;
  const [getWater, setGetWater] = useState([]);

  const visitedHouseId = house?.find(
    (house) => house?.houseName === houseName
  )?.id;

  const getHouse = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/Details/fetchHousesByName/`
      );
      setHouse(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getTenantinfo = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/houseRegister/${visitedHouseId}`
      );
      setTenant(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getPayments = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/Tenant/fetchPayment/?userId=${visitedHouseId}`
      );
      setPayments(response.data?.totalAdditionalPayments);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTenantinfo();
    getHouse();
    getWaterRates();
    if (visitedHouseId) {
      getPayments(visitedHouseId);
    }
  }, [visitedHouseId, houseName]);
  // this is the additinal payments
  const totalRent = Object.values(payments)
    .map((paymentData) => {
      const matchingObjects = Object.values(paymentData);
      if (matchingObjects.length > 0) {
        const totalAmount = matchingObjects.reduce(
          (sum, obj) => sum + (Number(obj.amount) || 0),
          0
        );
        return totalAmount;
      }
    })
    .reduce((prev, next) => prev + next, 0);
  //get the rent
  const allRent = tenant?.detailsWithTotal
    ?.map((amnt) => {
      return Number(amnt.rent);
    })
    .reduce((prev, next) => prev + next, 0);

  const totalRentPaid = totalRent + allRent;

  const getWaterRates = async () => {
    try {
      const res = await axios.get(
        `http://localhost:4000/water/fetchWater/${houseId}`
      );
      setGetWater(res.data?.getWater);
    } catch (error) {
      toast.error("water rates not found " || error.massage);
    }
  };
  const waterUnits = getWater
    ?.map((house) => {
      return house.price;
    })
    .slice(-1)[0];
  const totalWater = tenant?.detailsWithTotal
    ?.map((amnt) => {
      return Number(amnt.totalWaterReadings);
    })
    .reduce((prev, next) => prev + next, 0);

  const totaWaterBil = waterUnits * totalWater;
  // console.log(totaWaterBil);

  //garbage
  const totalGarbage = tenant?.detailsWithTotal
    ?.map((amnt) => {
      return Number(amnt.totalWaterReadings);
    })
    .reduce((prev, next) => prev + next, 0);

  const subTotal = totalRentPaid + totaWaterBil + totalGarbage;

  const expectedAmount = 700000;
  const balance = subTotal - expectedAmount;
  return (
    <>
      <section className="py-20 bg-gray-200">
        <div className="max-w-5xl mx-auto py-16 bg-white">
          <article className="overflow-hidden">
            <div className="bg-[white] rounded-b-md">
              <div className="p-9">
                <div className="space-y-6 text-slate-700">
                  <div className="w-16 h-16">
                    <img className=" mx-auto" src={logo} alt="logo" class="" />
                  </div>

                  <p className=" text-teal-300 text-md font-extrabold tracking-tight uppercase font-body">
                    Fryeton property agencies
                  </p>
                  <p className=" flex gap-4  text-teal-300 text-md font-extrabold tracking-tight uppercase font-body">
                    House :
                    <p className="text-teal-300 text-base font-medium leading-6">
                      {houseName}
                    </p>
                  </p>
                  <p className=" flex gap-4 text-teal-300 text-md font-extrabold tracking-tight uppercase  font-body">
                    LANDOWNER :
                    <p className="text-teal-300 leading-6">
                      {" "}
                      {house && house.length > 0 && (
                        <p>{house[0].houses.email}</p>
                      )}
                    </p>
                  </p>
                </div>
              </div>
              {/* <div className="p-9">
     <div className="flex w-full">
      <div className="grid grid-cols-4 gap-12">
       <div className="text-sm font-light text-slate-500">
        <p className="text-sm font-normal text-slate-700">
         Invoice Detail:
        </p>
        <p>Unwrapped</p>
        <p>Fake Street 123</p>
        <p>San Javier</p>
        <p>CA 1234</p>
       </div>
       <div className="text-sm font-light text-slate-500">
        <p className="text-sm font-normal text-slate-700">Billed To</p>
        <p>The Boring Company</p>
        <p>Tesla Street 007</p>
        <p>Frisco</p>
        <p>CA 0000</p>
       </div>
       <div className="text-sm font-light text-slate-500">
        <p className="text-sm font-normal text-slate-700">Invoice Number</p>
        <p>000000</p>

        <p className="mt-2 text-sm font-normal text-slate-700">
         Date of Issue
        </p>
        <p>00.00.00</p>
       </div>
       <div className="text-sm font-light text-slate-500">
        <p className="text-sm font-normal text-slate-700">Terms</p>
        <p>0 Days</p>

        <p className="mt-2 text-sm font-normal text-slate-700">Due</p>
        <p>00.00.00</p>
       </div>
      </div>
     </div>
    </div> */}

              <div className="p-9">
                <div className="flex flex-col mx-0 mt-8">
                  <table className="min-w-full divide-y divide-slate-500">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-normal text-slate-700 sm:pl-6 md:pl-0"
                        >
                          Description
                        </th>

                        <th
                          scope="col"
                          className="py-3.5 pl-3 pr-4 text-right text-sm font-normal text-slate-700 sm:pr-6 md:pr-0"
                        >
                          Amount
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-slate-200">
                        <td className="py-4 pl-4 pr-3 text-sm sm:pl-6 md:pl-0">
                          <div className="font-medium text-slate-700">
                            Total Rent
                          </div>
                          {/* <div className="mt-0.5 text-slate-500 sm:hidden">
                            1 unit at $0.00
                          </div> */}
                        </td>

                        <td className="py-4 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                          KSH {totalRentPaid}
                        </td>
                      </tr>

                      <tr className="border-b border-slate-200">
                        <td className="py-4 pl-4 pr-3 text-sm sm:pl-6 md:pl-0">
                          <div className="font-medium text-slate-700">
                            Total Water
                          </div>
                          {/* <div className="mt-0.5 text-slate-500 sm:hidden">
                            1 unit at $0.00
                          </div> */}
                        </td>

                        <td className="py-4 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                          KSH {totaWaterBil}
                        </td>
                      </tr>
                      <tr className="border-b border-slate-200">
                        <td className="py-4 pl-4 pr-3 text-sm sm:pl-6 md:pl-0">
                          <div className="font-medium text-slate-700">
                            Total Garbage
                          </div>
                          {/* <div className="mt-0.5 text-slate-500 sm:hidden">
                            1 unit at $0.00
                          </div> */}
                        </td>

                        <td className="py-4 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                          KSH {totalGarbage}
                        </td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr>
                        <th
                          scope="row"
                          colspan="1"
                          className="hidden pt-6 pl-6 pr-3 text-sm font-light text-right text-slate-500 sm:table-cell md:pl-0"
                        >
                          Subtotal
                        </th>

                        <td className="pt-6 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                          KSH {subTotal}
                        </td>
                      </tr>
                      <tr>
                        <th
                          scope="row"
                          colspan="1"
                          className="hidden pt-6 pl-6 pr-3 text-sm font-light text-right text-slate-500 sm:table-cell md:pl-0"
                        >
                          Expected
                        </th>

                        <td className="pt-6 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                          KSH {expectedAmount}
                        </td>
                      </tr>
                      <tr>
                        <th
                          scope="row"
                          colspan="1"
                          className="hidden pt-4 pl-6 pr-3 text-sm font-light text-right text-slate-500 sm:table-cell md:pl-0"
                        >
                          Balance
                        </th>

                        <td
                          className={`pt-4 pl-3 pr-4 text-sm text-right  sm:pr-6 md:pr-0 ${
                            balance < 0 ? "font-medium text-red-500" :  "text-green-600"
                          }`}
                        >
                          KSH  {balance}
                        </td>
                      </tr>
                      <tr>
                        <th
                          scope="row"
                          colspan="1"
                          className="hidden pt-4 pl-6 pr-3 text-sm font-normal text-right text-slate-700 sm:table-cell md:pl-0"
                        >
                          Total collection
                        </th>

                        <td className="pt-4 pl-3 pr-4 text-sm font-normal text-right text-slate-700 sm:pr-6 md:pr-0">
                          KSH {subTotal}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>

              <div className="mt-48 p-9">
                <div className="border-t pt-9 border-slate-200">
                  <div className="text-sm font-light text-slate-700">
                    <p>
                      Payment terms are 14 days. Please be aware that according
                      to the Late Payment of Unwrapped Debts Act 0000,
                      freelancers are entitled to claim a 00.00 late fee upon
                      non-payment of debts after this time, at which point a new
                      invoice will be submitted with the addition of this fee.
                      If payment of the revised invoice is not received within a
                      further 14 days, additional interest will be charged to
                      the overdue account and a statutory rate of 8% plus Bank
                      of England base of 0.5%, totalling 8.5%. Parties cannot
                      contract out of the Act’s provisions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}

export default Report;
