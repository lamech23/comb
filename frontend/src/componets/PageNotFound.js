import React from 'react'
import '../css/pageNotFound.css'
import pagenotfound from '../componets/images/pagenotfound.jpg'

function PageNotFound() {
  return (
    <>
     <div className='justify-content-center' id='div-one'>
     <h1 className='oops'>Oops..! 404 Page Not Found</h1>
        <p>Looks like you came to the wrong page on our server</p>
        <img  className='fourImage' src={pagenotfound} alt="" />
     </div>


    </>
  )
}

export default PageNotFound