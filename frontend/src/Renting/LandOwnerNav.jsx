import React from 'react'
import { Link } from 'react-router-dom'

function LandOwnerNav() {
  return (
    <>
    <div className="d-flex " id="wrapper">
            <div className="sideNav p-2">
              
                <div className="list-group list-group-flush my-3" id='one'>
                    <a href="#" className="list-group-item list-group-item-action second-text active  fs-5 fw-bold "><i
                            className="fas fa-tachometer-alt me-2 fs-3 "></i>Dashboard</a>
    
                    <Link to='/UserProfile'  className="list-group-item list-group-item-action bg-transparent second-text fw-bold  fs-5"><i
                            className="fas fa-project-diagram me-2 "></i>House  </Link>
                            
    
                    < Link to={`/ChangeProfile/`} className="list-group-item list-group-item-action bg-transparent second-text fw-bold fs-5"><i
                            className="fas fa-chart-line me-2"></i> Profile</Link>
    
                            
                  
    
                   
                  
                            
                </div>
            </div>
         
           
        </div>
    

    </>
  )
}

export default LandOwnerNav