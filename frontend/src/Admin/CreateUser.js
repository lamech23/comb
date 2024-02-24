import axios from "axios";
import React, { useState } from "react";
import "../css/signup.css";
import "../css/error.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CreateUser() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [location, setLocation] = useState("");
  const [userName, setUserName] = useState("");
  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState(false);
  const [signedUp, setSignUp] = useState(false);
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const strongRegExp = /(?=.*?[#?!@$%^&£*-])/;
    const poorPassword = strongRegExp.test(password);


      let emailFormart =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const validEmail =emailFormart.test(email)

    try {
     
      if (email.length === 0 || password.length === 0) {
        return toast.error("Fileds cannot be empty");
      } else if (password.length < 8) {
        return toast.error("password must be  8 or more characters");
      } else if (!poorPassword) {
        return toast.error(" Weak password special Character required ");
      } else if(!validEmail){
        return toast.error("invalid email please check your format");
      }
      else {
       
        const response = await axios.post(
          "http://localhost:4000/users/signup",
          {
            email: email,
            password: password,
            idNumber: idNumber,
            phoneNumber: phoneNumber,
            location: location,
            userName: userName,
          }
        );
        setSignUp(true);
        toast.success("Succesfully Signed up ");

        if (response) {
          setEmail("");
          setPassword("");
          setError(null);

          setTimeout(() => {
            {
              // navigate("");
            }
            setSignUp(false);
          }, 3000);
          setIsLoading(false);
        }

        if (!response) {
          setIsLoading(false);
        }
      }
    } catch (error) {
   

      if (error.response?.status === 400) {
        return toast.error("Email already exists");
      }
    }
  };
  return (
    <>
      <section class= " bg-white  ">
        <div class="lg:grid lg:grid-cols-1">

          <main class="px-8 py-8">
        <p className="text-lg font-serif text-teal-500   "> Create Account  </p>
              <form  onSubmit={handleSubmit} class="mt-8 grid grid-cols- gap-6">
              <div class="sm:col-span-3">
                  <label
                    for="FirstName"
                    class="block text-sm font-medium text-gray-700"
                  >
                    Email 
                  </label>

                  <input
                    type="email"
                    id="FirstName"
                    name="first_name"
                      class="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none sm:text-sm sm:leading-6"
                    value={email} onChange={(e) => setEmail(e.target.value)} 
                  />
                </div>


                <div class="sm:col-span-3">
                  <label
                    for="LastName"
                    class="block text-sm font-medium text-gray-700"
                  >
                    User Name
                  </label>

                  <input
                    type="text"
                    name="last_name"
                      class="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none sm:text-sm sm:leading-6"
                    value={userName} onChange={(e) => setUserName(e.target.value)} 

                  />
                </div>

                <div class="sm:col-span-3">
                  <label
                    for="Email"
                    class="block text-sm font-medium text-gray-700"
                  >
                    {" "}
                    phoneNumber
                  </label>

                  <input
                    type="number"
                    id="Email"
                    name="email"
                      class="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none sm:text-sm sm:leading-6"
                    value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} 


                  />
                </div>

                <div class="sm:col-span-3">
                  <label
                    for="Password"
                    class="block text-sm font-medium text-gray-700"
                  >
                    {" "}
                    location{" "}
                  </label>

                  <input
                    type="text"
                    name="password"
                      class="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none sm:text-sm sm:leading-6"
                    value={location} onChange={(e) => setLocation(e.target.value)} 

                  />
                </div>

                <div class="sm:col-span-3">
                  <label
                    for="Password"
                    class="block text-sm font-medium text-gray-700"
                  >
                    {" "}
                    idNumber{" "}
                  </label>

                  <input
                    type="number"
                    name="password"
                      class="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none sm:text-sm sm:leading-6"
                    value={idNumber} onChange={(e) => setIdNumber(e.target.value)} 

                  />
                </div>



               <div class="sm:col-span-3">
                  <label
                    for="PasswordConfirmation"
                    class="block text-sm font-medium text-gray-700"
                  >
                    password
                  </label>

                  <input
                    type="password"
                    id="PasswordConfirmation"
                    name="password_confirmation"
                    class="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none sm:text-sm sm:leading-6"
                    value={password} onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div class="col-span-6 sm:flex sm:items-center sm:gap-4">
                  <button 
                  type="submit"
                  class="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500">
                    Create an account
                  </button>
                </div>
              </form>
          </main>
        </div>
      </section>
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
    </>
  );
}

export default CreateUser;
