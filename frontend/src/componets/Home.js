import React, { useContext, useState } from 'react'
import a from '../componets/images/a.jpg'
import b from '../componets/images/b.jpg'
import c from '../componets/images/c.jpg'
import {Link} from 'react-router-dom'
import Cards from './Cards'
// import Upload from '../page/Upload'
 import GetInTouch from '../componets/GetInTouch';
import Footer from './Footer'
import Services from './Services'





function Home() {

  const [search ,setSearch]=useState('')
//   const [searchResult ,setSearchResult]=useState([])
// const [details , setDetails]=useState([])

// const filterSearch = details.filter((house=>{
//   return house.category.toLowerCase().include(search.toLocaleLowerCase())
// }))
// setSearchResult(filterSearch)

  return (
    <>
    
        <div className="container-lg bg-warning rounded  border my-5" >
            <div className=" row justify-content-center align-item-center my-5">
            {/* <form className="d-flex "  tabindex="-1" >
        <input className="form-control me-2" type="search" placeholder="Search" 
          value={search} onChange={ (e) => setSearch(e.target.value)}
        
        />
        <button className="btn btn-outline-success" type="submit"><i class="bi bi-search"></i></button>
      </form> */}
                <div className="col-md-5 text-center text-md-start">
                    <h1>

         
                        <div className="display-2">Welcome to Kausi Property </div>
                        
                        <div className="display-5 text-muted">
                            Customer Satisfaction is our Necessity And Goal 
                            </div>
                          {/* offcanvas button here  */}
                      
                          <Link to="#sidebar" className=" text-muted "  role="button" data-bs-toggle="offcanvas"arial-control="sidebar">
                            <h5 className='d-block mt-5 text-muted '>Click  for more</h5>
                            </Link>
                            

                    </h1>
            </div>
        <div className="col-md-5 text-center d-none d-md-block  " >
    <div id="carousel-pictures" className="carousel slide carousel-fade" data-bs-ride="carousel">


  
    <div className="carousel-inner mx-1 my-5 rounded border">
        <div className="carousel-item active">
        <img src={a}className="img-fluid rounded border" style={{ height:'400px'}} alt="" />
        <div className="carousel-caption d-none d-md-block">
        <p>For a reason we belive kausi is the best option for you</p>
      </div>
    </div>


    <div className="carousel-item">
         <img src={b}className="img-fluid  rounded border" style={{ height:'400px'}} alt="" />
         <div className="carousel-caption d-none d-md-block">
        <p> Quality and recurrent service is a neccesity, here at kausi that is available </p>
      </div>
    </div>
   

    <div className="carousel-item">
        <img src={c}className="img-fluid  rounded border" style={{ height:'400px'}} alt="" /> 
        <div className="carousel-caption d-none d-md-block">
        <p> Customer Satisfaction is a trumph to us kausi as a company  </p>
    </div>
    </div>
  
  </div>
  
</div>
    </div>
        </div>
        {/* sidebar */}
        <div className="offcanvas offcanvas-start"  tabIndex="-1" id="sidebar"
         aria-labelledby="sidebar-lable" >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title"id='sidebar-lable'> For more infomation please Login or Register with us</h5>
            <button type="button"  className="btn-close"  data-bs-dismiss="offcanvas" aria-label="close"></button>
            
          </div>
          <div className="offcanvas-body">
          <div className='display-6'>


                </div>
                <div className="my-3">
                <button className="btn btn-secondary" type='button'>
                  Post
                </button>
                
                </div>

                <div className='dropdwon '>
                  <button className='btn btn-secondary dropdown-toggle' type="button" id="filter" data-bs-toggle="dropdown" aria-expanded="false">Available for you </button>
                <ul className="dropdown-menu" aria-labelledby='filter'>
                  <div className='ms-2 '>
                  
                  <h5 className='text-decoration-underline text-muted fst-italic mt-3'>House filters</h5>

                  <li>Single Room</li>
                  <li>Bedsiter</li>
                  <li>One bedroom</li>
                  <li>Two bedroom</li>
                  <li>Three bedroom</li>
                  <li>Own compound</li>

                  <div>
                    <h5 className='text-decoration-underline text-muted fst-italic mt-3'>Categories</h5>
                   
                    <li>Houses for sale</li>
                    <li>Houses for rent</li>
                    <li>Land for sale</li>
                    <li>BnB HOUSE</li>

                  </div>
                  </div>
                </ul>
                </div>
                
             
            </div>
         </div>
      </div>
    
    <Cards/>

    <Services/>
    <GetInTouch/>
     
      <Footer/>

    </>
  )
}

export default Home