import React, { useState } from "react";
import buy from "../componets/images/buy.jpg";
import mansh from "../componets/images/mansh.jpg";
import bnb from "../componets/images/bnb.jpg";
import { Link } from "react-router-dom";
import Details from "./details/Details";
import { useAuthContext } from "../hooks/useAuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Cards() {
  const { user } = useAuthContext();

  return (
    <div>
      <section className="container-lg bg-light mt-5">
        <div className="container-lg">
          <div className="text-center">
            <h2>Available Properties</h2>
            <p className="lead text-muted">
              {" "}
              Choose a house that best suits you right
            </p>
          </div>
          {/* card-1 */}

          <div className="row my-5 align-items-center justify-content-center  g-0">
            <div className="col-8 col-lg-4 col-xl-3">
              <div className="card border-0">
                <div className="card-body text-center py-4">
                  <img className="img-fluid rounded" src={buy} alt="" />
                  <h4 className="card-title">Bungalow</h4>
                  <p className="lead card-subtitle">
                    At kausi Housing Agency We sell houses as per your
                    specification
                  </p>
                  <p className="cardtext mx-5 text-muted d-none d-lg-block">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Sit, quas.
                  </p>

                  <Link
                    to="/BuyHouse"
                    className="btn btn-outline-secondary btn-lg mt-3"
                  >
                    {" "}
                    Buy Now
                  </Link>
                </div>
              </div>
            </div>
            {/* card-2 */}

            <div className="col-8 col-lg-4">
              <div className="card border-2 border-warning">
                <div className="card header text-center text-warning">
                  Most Popular Service
                </div>
                <img className="img-fluid rounded mt-2" src={mansh} alt="" />

                <div className="card-body text-center py-4">
                  <h4 className="card-title">Maisonette</h4>
                  <p className="lead card-subtitle">
                    {" "}
                    Being the Most Recurrent service At kausi Housing Agency
                    Customer Satisfaction is key
                  </p>
                  <p className="cardtext mx-5 text-muted d-none d-lg-block">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Sit, quas.
                  </p>
                  <Link to="/Maisonette">
                    {" "}
                    <button className="btn btn-outline-secondary btn-lg mt-3">
                      Buy Now
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            {/* card-3  */}

            <div className="col-8 col-lg-4 col-xl-3">
              <div className="card border-0">
                <div className="card-body text-center py-4">
                  <img className="img-fluid rounded" src={bnb} alt="" />

                  <h4 className="card-title">Apartments </h4>

                  <p className="lead card-subtitle">
                    For those Who like everything catered for kausi got you
                    coverd{" "}
                  </p>
                  <p className="cardtext mx-5 text-muted d-none d-lg-block">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Sit, quas.
                  </p>
                  <Link to="/BnbHouse">
                    {" "}
                    <button className="btn btn-outline-secondary btn-lg mt-3">
                      Buy Now
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Details />
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
  );
}

export default Cards;
