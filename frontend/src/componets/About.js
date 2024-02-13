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

      <div className="flex justify-center">
        <div className="text-center">
          <h2 className="text-lg font-bold">A Glance of Kausi</h2>
          <p className="text-md font-light">
            Kausi Housing Agency is committed to ensuring digital accessibility for individuals with disabilities and also those without disabilities. We are continuously working to improve the accessibility of our web experience for everyone despite their geolocation, and we welcome feedback so as to improve on our weaknesses. If you wish to report an issue or seek any of our services,
          </p>
          <p className="text-center mt-10">please let us know.</p>
        </div>
      </div>

      </div>
      <GetInTouch/>
      <Footer/>


    </div>
  )
}

export default About