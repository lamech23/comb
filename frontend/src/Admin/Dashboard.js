import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import logo from "../componets/images/logo.jpg";
import "../css/dashboard.css";
import MainNav from "./MainNav";
import SideNavigation from "./SideNavigation";
import { useAuthContext } from "../hooks/useAuthContext";
import { useIsAdmin } from "../hooks/UseAdmin";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Graph from "../utils/Graph";

function Dashboard() {
  const { user } = useAuthContext();
  const { dispatch } = useAuthContext();
  const role = useIsAdmin();
  const [newsLetter, setNewsLetter] = useState([]);
  const [counts, setCounts] = useState(0);
  const [users, setUsers] = useState(0);
  const [activeUser, setActiveUser] = useState(0);
  const [tenant, setTenant] = useState(0);
  const [landowner, setLandOwner] = useState(0);
  let navigate = useNavigate();

  try {
    useEffect(() => {
      fetchNewsLetters();
      fetchTotalNews();
    }, [ setCounts]);


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
  } catch (error) {}


  return (
    <>
      <MainNav />
      <SideNavigation />
    </>
  );
}

export default Dashboard;
