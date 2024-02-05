import React, { useEffect, useState } from 'react'
import UserGroupIcon  from '@heroicons/react/24/outline/UserGroupIcon'
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Graph from "../utils/Graph";
import HomeIcon from '@heroicons/react/24/outline/HomeIcon'

function Stats() {
    const [newsLetter, setNewsLetter] = useState([]);
    const [count, setCount] = useState();
    const [counts, setCounts] = useState(0);
    const [users, setUsers] = useState(0);
    const [activeUser, setActiveUser] = useState(0);
    const [tenant, setTenant] = useState(0);
    const [landowner, setLandOwner] = useState(0);
    let navigate = useNavigate();
    const [allUsers, setAllUsers] =useState([])
  
    try {
      useEffect(() => {
        fetchAllDEtails();
        fetchNewsLetters();
        fetchTotalNews();
        fetchUsers()
      }, [setCount, setCounts]);

      const fetchUsers = async () => {
        const response = await axios.get("http://localhost:4000/Users/all");
        setAllUsers(response.data);
      };

      //house

      const fetchAllDEtails = async () => {
        const response = await axios.get("http://localhost:4000/Total");
        setCount(response.data);
      };
  
      //newsLetter
      const fetchNewsLetters = async () => {
        const response = await axios.get(
          "http://localhost:4000/news/newsLetter/Sub"
        );
        setNewsLetter(response.data);
      };
      const fetchTotalNews = async () => {
        const response = await axios.get(
          "http://localhost:4000/Total/newsLetters"
        );
        setCounts(response.data.count);
        setUsers(response.data.count2);
        setActiveUser(response.data.activeUser);
        setTenant(response.data.Tenant);
        setLandOwner(response.data.Landlord);
      };
    }catch(error){
        console.log(error);

    }
  return (
    <div>
        


        <div class="container-fluid px-4 mt-5">
        <div className="grid lg:grid-cols-4 mt-2 md:grid-cols-2 grid-cols-1 gap-6">

            <div className="stats shadow">
              <div className="stat">
                  <div className='stat-figure  dark:text-slate-700'><HomeIcon className='w-8 h-8'/></div>
                  <div className="stat-title dark:text-slate-300">Houses</div>
                  <div className='stat-value dark:text-slate-300'>{count}</div>
              </div>
             </div>

             <div className="stats shadow">
              <div className="stat">
                  <div className='stat-figure  dark:text-slate-700'><UserGroupIcon className='w-8 h-8'/></div>
                  <div className="stat-title dark:text-slate-300">users</div>
                  <div className='stat-value dark:text-slate-300'>{users}</div>
              </div>
             </div>

             <div className="stats shadow">
              <div className="stat">
                  <div className='stat-figure  dark:text-slate-700'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                  </svg></div>
                  <div className="stat-title dark:text-slate-300">Newsletter</div>
                  <div className='stat-value dark:text-slate-300'>{counts}</div>
              </div>
             </div>

             <div className="stats shadow">
              <div className="stat">
                  <div className='stat-figure  dark:text-slate-700'><UserGroupIcon className='w-8 h-8'/></div>
                  <div className="stat-title dark:text-slate-300">Active Users</div>
                  <div className='stat-value dark:text-slate-300'>{activeUser}</div>
              </div>
             </div>

             <div className="stats shadow">
              <div className="stat">
                  <div className='stat-figure  dark:text-slate-700'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
                    </svg>
                    </div>
                  <div className="stat-title dark:text-slate-300">Tenants</div>
                  <div className='stat-value dark:text-slate-300'>{tenant}</div>
              </div>
             </div>

             <div className="stats shadow">
              <div className="stat">
                  <div className='stat-figure  dark:text-slate-700'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                  </svg>
                  </div>
                  <div className="stat-title dark:text-slate-300">Landlords</div>
                  <div className='stat-value dark:text-slate-300'>{landowner}</div>
              </div>
             </div>
         </div>
        <div>
        <Graph users={allUsers } />
        </div>
        </div>



  
        <ToastContainer
          position="top-left"
          autoClose={3000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
    
    </div>
  )
}

export default Stats