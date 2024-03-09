import axios from "axios";
import React, { useState } from "react";
import "../css/signup.css";
import "../css/error.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
        return toast.error("invalid email please check your format");      }
      else {
       
        const response = await axios.post(
          "http://localhost:4000/users/signup",
          {
            email: email,
            password: password,
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
              navigate("/Login");
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
      <div className="bodys row">
        {/* {signedUp && <div className='text-center alert alert-danger'>Succesfully Signed up </div>} */}


        <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
          <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">Sign in to your account</h2>
          </div>

          <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
           <form onSubmit={handleSubmit} class="space-y-6">
              <div>
                <label for="email" class="block text-sm font-medium leading-6 text-white">Email address</label>
                <div class="mt-2">
                  <input   value={email} onChange={(e) => setEmail(e.target.value)} type="email"  class="block w-full rounded-md border-0 px-3 py-1.5 text-black  bg-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none sm:text-sm sm:leading-6"/>
                </div>
              </div>

              <div>
                <div class="flex items-center justify-between">
                  <label for="password" class="block text-sm font-medium leading-6 text-white">Password</label>
                </div>
                <div class="mt-2">
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}  class="block w-full rounded-md border-0 px-3 py-1.5 text-black  bg-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none sm:text-sm sm:leading-6"/>
                </div>
              </div>

              <div>
                <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
              </div>
              {error && (
                <div className=" alert alert-danger mt-5 text-center">
                  {error}
                </div>
              )}
              
            </form>

          </div>
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
    </>
  );
}

export default SignUp;
