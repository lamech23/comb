import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import LandOwnerNav from "./LandOwnerNav";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
import setHeader from "../componets/Api"

function LandownerDashbard() {
  const [tenant, setTenant] = useState([]);
  const {user} =useAuthContext()



  try {
    useEffect(() => {
      getTenantInfo();
      
    }, []);
    const getTenantInfo = async () => {
        const response = await axios.get(
          `http://localhost:4000/houseRegister/specific/` ,
          {
            headers: {
              authorization: ` Bearer ${user?.token}`,
              Accept: "application/json",
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setTenant(response.data)
        console.log(response.data);
        
      }
      } catch (error) {

        console.log("Error", error);
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
                  <th scope="col">houseName  </th>
                </tr>
              </thead>
              <tbody>
                {tenant?.map((tenants) => (
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
                    <td>{tenants.houseName}</td>
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
