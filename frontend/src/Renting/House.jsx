import React, { useEffect, useState } from 'react'
import MainNav from '../Admin/MainNav'
import SideNavigation from '../Admin/SideNavigation'
import axios from 'axios'
import { useParams } from 'react-router-dom'


function House() {

    const [tenant, setTenant]= useState([])
    const [count, setCount]= useState(0)
    console.log(count);
    
    
// console.log(id);
  
    useEffect(() => {
        const getTenantinfo = async () => {
          try {
            const response = await axios.get(`http://localhost:4000/houseRegister/`);
            setTenant(response.data);
          } catch (error) {
            console.log(error);
          }
        };
    
        const subTotal = async (id) => {
        const res = await axios.get(`http://localhost:4000/houseRegister/total/${id}`)
        setCount(res.data)
        console.log(setCount(res.data));
        console.log(res);

        }
        getTenantinfo();
        subTotal()

      }, []);

  
  return (
    <>
     <MainNav/>
    <div className=' lg:flex flex-row block gap-20  '>
    <SideNavigation />
    <div className=" text-sm mt-14 ">
            <table className=" table-auto border-separate border-spacing-2 border border-slate-400   ">
                <thead className=''>
                    <tr>
                        <th className='border border-slate-600'>Tenant Name </th>
                        <th className='border border-slate-600'>id </th>
                        <th className='border border-slate-600'>email </th>
                        <th className='border border-slate-600'>House Name</th>
                        <th className='border border-slate-600'>House Number</th>
                        <th className='border border-slate-600'>Rent</th>
                        <th className='border border-slate-600'>Rent Deposit</th>
                        <th className='border border-slate-600'>Water Reading</th>
                        <th className='border border-slate-600'>Water Bill</th>
                        <th className='border border-slate-600'>Previous Balance</th>
                        <th className='border border-slate-600'>Garbage</th>
                        <th className='border border-slate-600'>Phone Number</th>
                        <th className='border border-slate-600'>Next_of_king_number </th>
                        <th className='border border-slate-600'>total</th>
                    </tr>
                </thead>
                <tbody >
                {tenant.map((tenants)=>(
                    <tr key={tenants.id}>
                        <td className='border border-slate-700'>{tenants.id}</td>
                        <td className='border border-slate-700'>{tenants.tenantsName}</td>
                        <td className='border border-slate-700'>{tenants.email}</td>
                        <td className='border border-slate-700'>{tenants.houseName}</td>
                        <td className='border border-slate-700'>{tenants.houseNumber}</td>
                        <td className='border border-slate-700'>{tenants.rent}</td>
                        <td className='border border-slate-700'>{tenants.rentDeposit}</td>
                        <td className='border border-slate-700'>{tenants.waterReading}</td>
                        <td className='border border-slate-700'>{tenants.waterBill}</td>
                        <td className='border border-slate-700'>{tenants.previousBalance}</td>
                        <td className='border border-slate-700'>{tenants.garbage}</td>
                        <td className='border border-slate-700'>{tenants.phoneNumber}</td>
                        <td className='border border-slate-700'>{tenants.nextOfKingNumber}</td>
                        <td className='border border-slate-700'>{()=> count(tenants.id)}</td>

                    </tr>
                   ))}
                   <tr>
                   </tr>
                </tbody>
            </table>
        </div>
        
    
    

    </div>
    </>
  )
}

export default House