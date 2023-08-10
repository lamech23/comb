import axios from 'axios'
import React, { useState } from 'react'
import {  ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function GetInTouch() {

    const [email ,setEmail]=useState('')
    const [subject  ,setSubject]=useState('')
    const [description ,setDescription]=useState('')
    
    const handelSubmit =async(e)=>{
        e.preventDefault()

if(email==='',subject==='',description===''){
    return toast.error('All  fields must be filled')
}else{

        const response =await axios.post('http://localhost:4000/contacts',{
            email:email,
            subject:subject,
            description:description,
        })

if(response){
    setEmail('')
    setSubject('')
    setDescription('')
}
      
    }

}



  return (
    <div>
        <div className="container-lg border-top">
            <div className=" card text-center mt-5 bg-light">
                <h2>Get in Touch</h2>
                <p>For us to answer to  your Question please fill out the form to contact us directly</p>
                <div className=" row justify-content-center">
                <div className="col-lg-6 ">
                    <form onSubmit={handelSubmit}>

                    <label className='form-label'> Email Address</label>
                        {/* icons */}

                    <div className="input-group mb-4">
                        <span className="input-group-text">
                        <i className="bi bi-envelope-fill"></i>
                        </span>
                    <input type="text " className='form-control' id='email' placeholder='e.g brian@example.com'
                    value={email}
                    onChange={ (e) => setEmail(e.target.value)}
                    />

                        <span className="input-group-text">
                            
                        <i className="bi bi-question-circle"></i>

                        </span>

                    </div>

                    <label  className='text-start'>Name</label>
                        {/* icons */}

                   
                    <label  className="form-lable">What is your question about</label>
                    {/* icons */}
                    <div className="input-group">
                        <span className="input-group-text">
                        <i className="bi bi-question-circle"></i>

                        </span>
                        <input type="query" className="form-control" id='query' placeholder='' 
                        value={subject}
                        onChange={ (e) => setSubject(e.target.value)}
                        
                        />
                    </div>
                    <div className="form-floating mt-5 mb-4">
                        
                        <textarea className="form-control text" id='query'style={{height:'140px'}} placeholder="query"
                        value={description}
                        onChange={ (e) => setDescription(e.target.value)}
                        />
                        <lable for="query"  >Your comment...</lable>
                        
                    </div>
                    <div className="text-center mb-4">
                        <button className="btn btn-info">Submit</button>
                    </div>

                    </form>
                    
                </div>
                
                </div>

            </div>
        </div>

    


    </div>
  )
}

export default GetInTouch