import React from 'react'
import GetInTouch from '../componets/GetInTouch'
import Footer from './Footer'
import '../css/about.css'


function About() {
  return (
    <div>      
      
    <div className='about mb-4'>
    <p className=' fs-4 text-white  'id='abts'> About us </p>
       </div>
      <div className='container-lg  '>

        <div className="justify-content-center">
        <h2 className='text-center'> A Glance of kausi </h2>
        <p className="lead">kausi Housing Agency is committed to ensuring digital accessibility for individuals with disabilities and also those without disabilities. We are continuously working to improve the accessibility of our web experience for everyone despite their geolocation , and we welcome feedback so as to improve on our weaknesss . If you wish to report an issue or seek any of our services, </p>
        <p className='text-center mt-0'> please let us know.</p>
        </div>
      </div>
      <GetInTouch/>
      <Footer/>


    </div>
  )
}

export default About