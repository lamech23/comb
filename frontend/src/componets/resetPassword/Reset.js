import axios from 'axios';
import React, { useState } from 'react'
import {  ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useNavigate, useParams } from 'react-router-dom';


function Reset() {
  const [password, setPassword] =useState("")
  const [confirmPassword, setConfirmPassword] =useState("")
  const {id}=useParams()
  let navigate = useNavigate()


  const resetPassword = async (e) => {
    e.preventDefault();
    try {
      const response=  await axios.put(`http://localhost:4000/users/reset/ ${id}`, {
       password: password,
       confirmPassword: confirmPassword
       
      })


      if(response){
        setConfirmPassword("")
        setPassword("")

        toast.success("Password updated")
      }

     
     } catch (error) {
      if (error.response?.status === 400) {
        return toast.error("Password Does Not Much")
      }
    }
  };
  return (
    

<>
<div className='log'>
<div className='container-fluid '>
        <div className=" login_page align-center justify-content center">
            <h5 className='text-center text-info'>Enter new password </h5>
            <form className='col' onSubmit={resetPassword} >
        
                    <label htmlFor="Email" className='form-Label fw-bold mt-4'> password </label>
                    <div className="input-group">
                <span className="input-group-text">
                <i class="bi bi-lock-fill"></i>


                </span>
                    <input type="password" name="password" className='form-control' 

                     value={password} onChange={ (e) => setPassword(e.target.value)}
                     />
                     </div>

                     <label htmlFor="Email" className='form-Label fw-bold mt-4'> confirm password </label>
                    <div className="input-group">
                <span className="input-group-text">
                <i class="bi bi-lock-fill"></i>


                </span>
                    <input type="password" name="password" className='form-control'

                     value={confirmPassword} onChange={ (e) => setConfirmPassword(e.target.value)}
                     />
                     </div>
             
                <button  type='submit' className="btn btn-success mt-4 "  style={{width:"100%"}}>Submit</button>

            </form>
            {/* {error && <div className='   alert alert-danger mt-5 text-center w-5' id='errors'>{error}</div>} */}
            </div>
            {/* {error && <div className='alert alert-danger mt-5 text-center w-5' id='errors'>{error}</div>} */}

        
                
       <div/>
       </div>
       </div>
              <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        />
                
    </>
   
  )
}

export default Reset