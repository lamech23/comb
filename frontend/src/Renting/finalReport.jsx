import React from 'react'

function FinalReport() {
  return (
    <>

<div className='px-40 mt-20'>


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
        <tbody>
            <tr className=" ">
                <th scope="row" className="px-6 py-4 font-medium text-black whitespace-nowrap ">
                  a-2
                </th>
                <td className="px-6 py-4 text-black">
                    lamech 
                </td>
                <td className="px-6 py-4 text-black">
                    ksh 20000
                </td>
                <td className="px-6 py-4 text-black">
                    Ksh 2999
                </td>
                <td className="px-6 py-4 text-black">
                    Ksh 0
                </td>
                
            </tr>
            <tr className=" ">
                <th scope="row" className="px-6 py-4 font-medium text-black whitespace-nowrap ">
                  a-3
                </th>
                <td className="px-6 py-4 text-black">
                    bridson mecha 
                </td>
                <td className="px-6 py-4 text-black">
                    ksh 20000
                </td>
                <td className="px-6 py-4 text-black">
                    Ksh 2999
                </td>
                <td className="px-6 py-4 text-black">
                    Ksh 1000
                </td>
                
            </tr>
            <tr className=" ">
                <th scope="row" className="px-6 py-4 font-medium text-black whitespace-nowrap ">
                  a-4
                </th>
                <td className="px-6 py-4 text-black">
                    brian murimi  
                </td>
                <td className="px-6 py-4 text-black">
                    ksh 20000
                </td>
                <td className="px-6 py-4 text-black">
                    Ksh 2999
                </td>
                <td className="px-6 py-4 text-black">
                    Ksh 200
                </td>
                
            </tr>
        </tbody>
    </table>
</div>
</div>




    </>
  )
}

export default FinalReport