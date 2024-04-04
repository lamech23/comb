
  import "./App.css";
  import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
  import React, { lazy } from 'react'
  import Home from "./componets/Home";
  import About from "./componets/About";
  import Contacts from "./componets/Contacts";
  import Navbar from "./componets/Navbar";
  import Footer from "./componets/Footer";
  import Login from "./Auth/Login";
  import { ModuleLoginContext } from "./context/ModuleLogInContext";
  import { useEffect, useState } from "react";
  import { ModalSignUpContext } from "./context/ModalSignUpContext";
  import SignUp from "./componets/SignUp";
  import BuyHouse from "./componets/BuyHouse";
  import Maisonette from "./componets/Maisonette";
  import BnbHouse from "./componets/BnbHouse";
  import DetailsForm from "./componets/details/DetailsForm";
  import MoreDetails from "./componets/details/MoreDetails";
  import { useAuthContext } from "./hooks/useAuthContext";
  import AddHouse from "./Admin/AddHouse";
  import UpdateDetails from "./Admin/UpdateDetails";
  import Settings from "./user/Settings";
  import CheckOut from "./componets/details/CheckOut";
  import ForgotPassword from "./componets/resetPassword/ForgotPassword";
  import Pagination from "./componets/details/Pagination";
  import PageNotFound from "./componets/PageNotFound";
  import Profile from "./user/Profile";
  import Reset from "./componets/resetPassword/Reset";
  import Search from "./componets/Search";
  import ClientMessageForm from "./Admin/ClientMessageForm";
  import UpadetUser from "./Admin/UpadetUser";
  import Services from "./componets/Services";
  import Details from "./componets/details/Details";
  import { Calendar } from "react-calendar";
  import Cards from "./componets/Cards";
  import HelpCenter from "./componets/HelpCenter";
  import Tours from "./Admin/Tours";
  import HelpReply from "./Admin/HelpReply";
  import HouseRegistration from "./Renting/HouseRegistration";
  import LandownerDashbard from "./Renting/LandownerDashbard";
  import LandOwnerNav from "./Renting/LandOwnerNav";
  import House from "./Renting/House";
  import RegisterTenant from "./Renting/RegisterTenant";
  import CreateHouse from "./Renting/CreateHouse";
  import AddingHouse from "./user/AddingHouse";
  import BilWater from "./Renting/BillWater";
  import AdditinalPaymants from "./Renting/AdditinalPaymants";
  import Report from "./Renting/Report";
  import CreateUser from "./Admin/CreateUser";
  import FinalReport from "./Renting/finalReport";
  import Team from "./componets/Team";
  import HouseCategory from "./componets/HouseCategory";
  import WaterBill from "./Renting/WaterBill";
  import { getAccessTokenFromCookie ,getUserRoles } from "./utils/AccesToken";
import ChangeProfile from "./user/ChangeProfile";
import SignUpProcess from "./componets/SignUpProcess";
import AllRequest from "./componets/AllRequest";

  const DashLayout = lazy(() => import('./Dashboard/Layout'))
  const ProfileLayout = lazy(() => import('./Profile/Layout'))

  function App() {
    // const { user } = useAuthContext();

    const accessToken = getAccessTokenFromCookie();
    const isAuthenticated = () => !!accessToken;
    
    const userRoles = getUserRoles();
    const isAdmin = userRoles && userRoles.includes('admin');
    const isAgent = userRoles && userRoles.includes('agent');

    const adminAuthenticate = () => isAdmin;
    const agentAuthenticate = () => isAgent;

    return (
        <div>
          <BrowserRouter>
            <div>
              <Routes>
                <Route path="/DetailsForm" element={<DetailsForm />} />
                <Route path="/" element={<Home />} />
                <Route path="/About" element={isAuthenticated() ? <About /> : <Navigate to="/" />} />
                <Route path="/Details" element={ <Details /> } />
                <Route path="/Maisonette" element={isAuthenticated() ? <Maisonette /> : <Navigate to="/" />} />
                <Route path="/MoreDetails/:id" element={isAuthenticated() ? <MoreDetails /> : <Navigate to="/" />} />
                <Route path="/BuyHouse" element={isAuthenticated() ? <BuyHouse /> : <Navigate to="/" />} />
                <Route path="/BnbHouse" element={isAuthenticated() ? <BnbHouse /> : <Navigate to="/" />} />
                <Route path="/Login" element={isAuthenticated() ? <Navigate to="/" /> : <Login />}/>
                <Route path="/Cards" element={isAuthenticated() ? <Cards /> : <Navigate to="/" />} />
                <Route path="/UpdateDetails/:id" element={isAuthenticated() ? <UpdateDetails /> : <Navigate to="/" />} />
                <Route path="/Settings" element={isAuthenticated() ? <Settings /> : <Navigate to="/" />} />
                <Route path="/Checkout" element={isAuthenticated() ? <CheckOut /> : <Navigate to="/" />} />
                <Route path="/ForgotPassword" element={isAuthenticated() ? <ForgotPassword /> : <Navigate to="/" />} />
                <Route path="/Reset/:id" element={isAuthenticated() ? <Reset /> : <Navigate to="/" />} />
                <Route path="/Pagination" element={isAuthenticated() ? <Pagination /> : <Navigate to="/" />} />
                {/* <Route path="/profile/:id" element={isAuthenticated() ? <Profile /> : <Navigate to="/" />} /> */}
                <Route path="/Search" element={isAuthenticated() ? <Search /> : <Navigate to="/" />} />
                <Route path="/Calender" element={isAuthenticated() ? <Calendar /> : <Navigate to="/" />} />
                <Route path="/ClientMessageForm" element={isAuthenticated() ? <ClientMessageForm /> : <Navigate to="/" />} />
                <Route path="/UpdateUser/:id" element={isAuthenticated() ? <UpadetUser /> : <Navigate to="/" />} />
                <Route path="/Services" element={isAuthenticated() ? <Services /> : <Navigate to="/" />} />
                <Route path="/HelpCenter" element={isAuthenticated() ? <HelpCenter /> : <Navigate to="/" />} />
                <Route path="/Tours/:id" element={isAuthenticated() ? <Tours /> : <Navigate to="/" />} />
                <Route path="/HelpReply" element={isAuthenticated() ? <HelpReply /> : <Navigate to="/" />} />
                <Route path="/HouseRegistration" element={isAuthenticated() ? <HouseRegistration /> : <Navigate to="/" />} />
                <Route path="/LandownerDashbard/" element={isAuthenticated() ? <LandownerDashbard /> : <Navigate to="/" />} />
                <Route path="/LandOwnerNav" element={isAuthenticated() ? <LandOwnerNav /> : <Navigate to="/" />} />
                <Route path="/House/:houseName" element={isAuthenticated() ? <House /> : <Navigate to="/" />} />
                <Route path="/RegisterTenant" element={isAuthenticated() ? <RegisterTenant /> : <Navigate to="/" />} />
                <Route path="/createHouse" element={isAuthenticated() ? <CreateHouse /> : <Navigate to="/" />} />
                <Route path="/addtionalPayments/:houseName" element={isAuthenticated() ? <AdditinalPaymants /> : <Navigate to="/" />} />
                <Route path="/payments/:houseName" element={isAuthenticated() ? <BilWater /> : <Navigate to="/" />} />
                <Route path="/report" element={isAuthenticated() ? <Report /> : <Navigate to="/" />} />
                <Route path="/createUser" element={isAuthenticated() ? <CreateUser /> : <Navigate to="/" />} />
                <Route path="/final-report" element={isAuthenticated() ? <FinalReport /> : <Navigate to="/" />} />
                <Route path="/our-team" element={isAuthenticated() ? <Team /> : <Navigate to="/" />} />
                <Route path="/HouseCategory/:category" element={isAuthenticated() ? <HouseCategory /> : <Navigate to="/" />} />
                <Route path="/waterBill" element={isAuthenticated() ? <WaterBill /> : <Navigate to="/" />} />
                <Route path="/signup-process" element={<SignUpProcess />} />
                <Route path="/requests" element={<AllRequest />} />

                <Route
                    path="/admin/*"
                    element={
                      isAuthenticated && adminAuthenticate() || agentAuthenticate()  ? (
                          <DashLayout />
                      ) : (
                          <Navigate to="/" />
                      )
                    }
                />

                <Route path="/account/*" element={isAuthenticated() ? <ProfileLayout /> : <Navigate to="/" />} />

                <Route path="*" element={<PageNotFound />} />
              </Routes>


            </div>
          </BrowserRouter>
        </div>
    );
  }

  export default App;


