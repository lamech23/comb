import "./App.css";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import React, { lazy } from 'react'
import Home from "./componets/Home";
import About from "./componets/About";
import Contacts from "./componets/Contacts";
import Navbar from "./componets/Navbar";
import Footer from "./componets/Footer";
import Login from "./componets/Login";
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

const DashLayout = lazy(() => import('./Dashboard/Layout'))
const ProfileLayout = lazy(() => import('./Profile/Layout'))

function App() {
  // const { user } = useAuthContext();

  const [openModalSignUp, setOpenModalSignUp] = useState(false);
  const user = document.cookie;
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <BrowserRouter>
        <div>
          <Navbar />
          <Routes>
            {/* <Route path='/' element={user ?<Home/> :<Navigate to='/Login'/>}/> */}
            <Route path="/DetailsForm" element={<DetailsForm />} />
            <Route path="/" element={<Home />} />
            <Route path="/About" element={<About />} />
            <Route path="/Contacts" element={<Contacts />} />
            <Route path="/Details" element={<Details />} />
            <Route path="/Maisonette" element={<Maisonette />} />
            <Route path="/MoreDetails/:id" element={<MoreDetails />} />
            <Route path="/BuyHouse" element={<BuyHouse />} />
            <Route path="/BnbHouse" element={<BnbHouse />} />

            <Route path="/Login" element={<Login />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/Cards" element={<Cards />} />
            <Route path="/UpdateDetails/:id" element={<UpdateDetails />} />
            <Route path="/Settings" element={<Settings />} />
            <Route path="/Checkout" element={<CheckOut />} />
            <Route path="/ForgotPassword" element={<ForgotPassword />} />
            <Route path="/Reset/:id" element={<Reset />} />
            <Route path="/Pagination" element={<Pagination />} />
            <Route path="/Profile/:id" element={<Profile />} />
            <Route path="/Search" element={<Search />} />
            <Route path="/Calender" element={<Calendar />} />
            <Route path="/ClientMessageForm" element={<ClientMessageForm />} />
            <Route path="/UpdateUser/:id" element={<UpadetUser />} />
            <Route path="/Services" element={<Services />} />
            <Route path="/HelpCenter" element={<HelpCenter />} />
            <Route path="/Tours/:id" element={<Tours />} />
            <Route path="/HelpReply" element={<HelpReply />} />
            <Route path="/HouseRegistration" element={<HouseRegistration />} />
            <Route path="/LandownerDashbard/" element={<LandownerDashbard />} />
            <Route path="/LandOwnerNav" element={<LandOwnerNav />} />
            <Route path="/House/:houseName" element={<House />} />
            <Route path="/RegisterTenant" element={<RegisterTenant />} />
            <Route path="/createHouse" element={<CreateHouse />} />
            <Route path="/addtionalPayments/:houseName" element={<AdditinalPaymants />} />
            <Route path="/payments/:houseName" element={<BilWater />} />

            <Route path="/admin/*" element={<DashLayout />} />

            <Route path="/account/*" element={<ProfileLayout />} />

            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
