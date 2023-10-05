import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import LandOwnerNav from "./LandOwnerNav";
import axios from "axios";

function LandownerDashbard() {
  const [tenant, setTenant] = useState([]);
  const houseName = useLocation().pathname.split("/")[2];
  console.log(houseName);

  try {
    useEffect(() => {
      getTenantinfo();
    }, []);

    const getTenantinfo = async () => {
      const response = await axios.get(
        `http://localhost:4000/houseRegister/specific/`
      );
      setTenant(response.data);
      console.log(response);

      console.log(response);
    };
  } catch (error) {
    console.log(error);
  }

  return (
    <>
      <div className="split">
        <LandOwnerNav />
        <div className="mt-5">
          <div class="table-responsive">
            <table class="table table-primary">
              <thead>
                <tr>
                  <th scope="col">Tenant Name </th>
                  <th scope="col">House Number</th>
                  <th scope="col">Rent</th>
                  <th scope="col">Rent Deposit</th>
                  <th scope="col">Water Reading</th>
                  <th scope="col">Water Bill</th>
                  <th scope="col">Previous Balance</th>
                  <th scope="col">Garbage</th>
                  <th scope="col">Phone Number</th>
                  <th scope="col">Next_of_king_number </th>
                </tr>
              </thead>
              <tbody>
                {tenant.map((tenants) => (
                  <tr key={tenants.id}>
                    <td>{tenants.tenantsName}</td>
                    <td>{tenants.houseNumber}</td>
                    <td>{tenants.rent}</td>
                    <td>{tenants.rentDeposited}</td>
                    <td>{tenants.waterReading}</td>
                    <td>{tenants.waterBlll}</td>
                    <td>{tenants.previousBalance}</td>
                    <td>{tenants.garbage}</td>
                    <td>{tenants.phoneNumber}</td>
                    <td>{tenants.nextOfKingNumber}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default LandownerDashbard;
