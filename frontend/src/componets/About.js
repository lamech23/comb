import React from 'react'
import GetInTouch from '../componets/GetInTouch'
import Footer from './Footer'
import '../css/about.css'
import Team from './Team'
import Navbar from './Navbar'


function About() {
  return (
    <div>      
      <Navbar/>

    <div className='about  mb-4'>
    <p className=' fs-4 text-white  'id='abts'> About us </p>
       </div>
      <div className='c '>

      <div className="flex justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold  ">A Glance of Kausi</h2>
          <p className=" leading-9    text-lg font-light whitespace-wrap text-balance font-serif">
            Kausi Housing Agency is committed to ensuring digital accessibility for individuals with disabilities and also those without disabilities. We are continuously working to improve the accessibility of our web experience for everyone despite their geolocation, and we welcome feedback so as to improve on our weaknesses. If you wish to report an issue or seek any of our services,
          </p>
          
        </div>
      </div>

      </div>
      <Team/>
      <GetInTouch/>
      <Footer/>


    </div>
  )
}

export default About