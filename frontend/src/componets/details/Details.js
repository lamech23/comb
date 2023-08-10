import React, { useEffect, useState } from 'react'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import axios from 'axios';
import { Link, Navigate, useNavigate, } from 'react-router-dom';
import'./details.css'
import { useAuthContext } from '../../hooks/useAuthContext';
import {  ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import{ useIsAdmin} from '../../hooks/UseAdmin'
import Pagination from './Pagination';




const Details =()=> {
const[isLoading,setIsLoading]=useState(true)
const[error ,setError]=useState(null)
const navigate = useNavigate();
const{user}=useAuthContext()
const [posts, setPosts] = useState([]);
const [user_id,setUserId]=useState("")
const [currentPage, setCurrentPage] = useState(1);
const [postsPerPage] = useState(4);
const [details , setDetails]=useState([])
const [query, setQuery] = useState("");

    useEffect(()=>{
      const user = JSON.parse(localStorage.getItem("credentials"));
      if (user) setUserId(user.id);
      setTimeout(()=>{
       
        fetchDetails()

        function handleScroll() {
          const images = document.querySelectorAll('#hover');
          images.forEach(image => {
            const imagePosition = image.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (imagePosition - windowHeight <= 0) {
              image.classList.add('visible');
            }
          });
        }
    
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
       },3000,)
    
    },[])

    useEffect(() => {
      const fetchData = async () => {
        const res = await axios.get(`http://localhost:4000/search?q=${query}`);
        setDetails(res.data);
      };
      if (query.length === 0 || query.length > 2) fetchData();
    }, [query]);


    const fetchDetails = async () => {
    
    const response = await axios.get('http://localhost:4000/paginatedHouses/houses',)
    setDetails(response.data)
    setIsLoading(false)
    console.log(response.data,'RESPONSE');

    }

    // Get current posts
const indexOfLastPost = currentPage * postsPerPage;
const indexOfFirstPost = indexOfLastPost - postsPerPage;
const currentPosts = details.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  // Get current posts

  return (
    <>
       

<div className='container-fixed mb-5'>
<input
          className="search align-items-center justify-content-center"
          placeholder="Search..."
          onChange={(e) => setQuery(e.target.value.toLowerCase())}
        />


      <div className='row d-flex align-items-center justify-content-center '  >

      
        {error && <div className='alert alert-danger'>{error}</div>}
      {isLoading && <div class="czv xlds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
       }
      
       
{ currentPosts.map((detail)=>(
        
        <div  key={detail.id} className='  col-lg-8 col-md-4  ms-2 mb-2  justify-content-between card shadow-lg  ' style={{width:'350px' }} id="hover" >
          {/* <Link to={`/MoreDetails/${detail.id}`}> */}
          <img id='detsImg' 
          className='   w-fit mt-2 mb-3' src={`http://localhost:4000/${detail.image}`} width="250px" height="250px" style={{borderRadius:'2px'}} alt=""  />
          {/* </Link> */}
          <div className='truncate'>
        <p className='tra '>
        <strong>{detail.title}</strong><br/>
       <strong>{detail.location}</strong>
       <strong>{detail.description}</strong>
        <strong>{detail.contact}</strong>
        <strong>{detail.price}</strong>
              </p>
            {/* {(user? <Link className='orderPage' to="/OrdersInfo">Order</Link> :<Navigate to= '/' />)} */}
             { <Link type='button' className=' btn   text-decoration-none ' id='see_more' to={`/MoreDetails/${detail.id}`}>See more...</Link> } 

       </div>
              <p className='mt-2 fs-5'><strong>{formatDistanceToNow(new Date(detail.createdAt),{addSuffix:true})}</strong></p>

        </div>

      ))}

     
    </div>
    

</div>
<Pagination
           postsPerPage={postsPerPage}
           totalPosts={details.length}
           paginate={paginate}
           details={currentPosts}
        /> 

          <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
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

export default Details