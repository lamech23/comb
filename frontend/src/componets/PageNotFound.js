import React from 'react'
import '../css/pageNotFound.css'
import pagenotfound from '../componets/images/pagenotfound.jpg'

function PageNotFound() {
  return (
    <>
     <div className='flex flex-col justify-center items-center mt-60'>
     <h1 className='oops'>Oops..! 404 Page Not Found</h1>
        <p>Looks like you came to the wrong page on our server</p>
        <img  className=' fourImage flex justify-center items-center object-center w-2/6' src={pagenotfound} alt="" />
     </div>


    </>
  )
}

export default PageNotFound