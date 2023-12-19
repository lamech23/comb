import React from "react";
import UserNav from "./UserNav";
import { useAuthContext } from "../hooks/useAuthContext";

function UserProfile() {
  const { user } = useAuthContext();

  const users = JSON.parse(localStorage.getItem("credentials"));
  let email = user?.email;
  return (
    <>
      <div className=" flex flex-col justify-center p-4 ">
        <div className="card mt-3">
          <div className="card-header fw-bold fs-4">Account Overview</div>

          <div className="row gap-5">
            {/* card-one */}
            <div className="col-8 col-lg-4 col-xl-3 ms-5">
              <div className="card border-3">
                <div className="card-body text-center py-4">
                  <h2 className="card-header">Account Details</h2>
                  <h4 className="card-title mt-3">Email: {email}</h4>
                  <h4 className="card-title mt-3"> Role: {user?.role}</h4>
                </div>
              </div>
            </div>

            {/* card-two */}
          </div>
        </div>
      </div>
    </>
  );
}

export default UserProfile;
