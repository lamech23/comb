import React, { useState } from 'react'
import LandOwnerNav from './LandOwnerNav'
import axios from 'axios'
import { useAuthContext } from '../hooks/useAuthContext'

function CreateHouse() {
  const [house_name, setHouse_name]=useState('')
  const [user_id, setUser_id_] =useState("")
  const {user }= useAuthContext()

  const handelSubmit = async(e) =>{
    e.preventDefault()
    try {
      if(user){setUser_id_(user.id)}
      const response  = await axios.post("http://localhost:4000/houseRegister/houseName",{
        house_name: house_name,
      user_id: user_id      })
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>

      <div className="split">
        <LandOwnerNav />


        
<div class="mb-6">
  <form onSubmit={handelSubmit}>

  <label for="username-success" class="block mb-2 text-sm font-medium text-green-700 dark:text-green-500">Please  Enter Your House Nane</label>
  <input 
  type="text" id="username-success" 
  class="bg-green-50 border border-green-500 text-green-900 placeholder-green-700 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-green-100 dark:border-green-400"
   placeholder="eg: K-10 , K-11"
   onChange={e => setHouse_name(e.target.value)}
   />
  <p class="mt-2 text-sm text-green-600 dark:text-green-500"><span class="font-medium">Alright!</span> Username available!</p>
   <button className='border p-3  text-teal-400 hover:bg-teal-700' type='submit'> submit</button>
  </form>
</div>


        
</div>
    </>
  )
}

export default CreateHouse