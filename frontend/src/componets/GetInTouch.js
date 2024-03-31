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
        <section class="">
            <div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
                <div class="mb-4">
                    <div class="mb-6 max-w-3xl text-center sm:text-center md:mx-auto md:mb-12">
                        <h2
                            class="font-heading mb-4 font-bold tracking-tight text-gray-900 text-3xl sm:text-5xl">
                            Get in Touch
                        </h2>
                    </div>
                </div>
                <div class="flex items-stretch justify-center">
                    <div class="grid ">
                    
                    <p>For us to answer to  your Question please fill out the form to contact us directly</p>
                    
                        <div class="card h-fit max-w-6xl p-5 md:p-12">
                            <h2 class="mb-4 text-2xl font-bold">Ready to Get Started?</h2>
                            <form onSubmit={handelSubmit}>
                                <div class="mb-6">
                                    <div class="mx-0 mb-1 sm:mb-4">
                                        <div class="mx-0 mb-1 sm:mb-4">
                                            <label for="email" class="pb-1 text-xs uppercase tracking-wider"></label>
                                            <input type="email" id="email" autocomplete="email"  placeholder='e.g brian@example.com'
                                                value={email}
                                                onChange={ (e) => setEmail(e.target.value)}
                                                class="mb-2 w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md dark:text-gray-300 sm:mb-0" name="email"/>
                                        </div>
                                    </div>
                                    <div class="mx-0 mb-1 sm:mb-4">
                                        <label for="textarea" class="pb-1 text-xs uppercase tracking-wider"></label
                                        ><textarea id="textarea" name="textarea" cols="30" rows="5"     value={description}
                                          onChange={ (e) => setDescription(e.target.value)} placeholder="Write your message..." class="mb-2 w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md dark:text-gray-300 sm:mb-0"></textarea>
                                    </div>
                                </div>
                                <div class="text-center">
                                    <button type="submit" class="w-full bg-blue-800 text-white px-6 py-3 font-xl rounded-md sm:mb-0">Send Message</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
  )
}

export default GetInTouch