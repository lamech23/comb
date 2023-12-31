import React from "react";
import "../css/services.css";

function Services() {
  return (
    <>
      <div className=" container-fluid card mb-20" >
        <h2 className=" uppercase mt-5 text-center hover:text-teal-500 display-6 fw-bold mb-20" id="heading">
          Our Services
        </h2>
        <div className="flex flex-row flex-wrap  justify-center align-center gap-60   ">
          <div
            className="card p-6  mb-3 shadow-lg  w-full h-1/2"
            style={{ maxWidth: "48rem" ,height: "28rem " }}
            // id="cardOne"
          >
            <div className="display-2 text-center text-info">
              <i class="bi bi-list-task"></i>
            </div>
            <div className="display-6 fw-bold text-center">
              Property Listing
            </div>
            <div className="card-body text-center">
              {/* <h5 className="card-title">Primary card title</h5> */}
              <p className="card-text">
                At kausi houses a listed for every one can be able select on
                desires since taste and prefrence is a personal choice
              </p>
            </div>
          </div>


          <div
            className="card p-6   mb-3 shadow-lg  w-full"
            style={{ maxWidth: "48rem" ,height: "28rem " }}
            // id="cardOne"
          >
            <div className="display-2 text-center text-info">
              <i class="bi bi-send"></i>
            </div>
            <div className="display-6 fw-bold text-center ">
              Selling Properties
            </div>

            <div className="card-body text-center">
              {/* <h5 className="card-title">Primary card title</h5> */}
              <p className="card-text">
                Selling being core purpose of kausi house are always available
                what matters is the need ,desier and agencey of the client{" "}
              </p>
            </div>
          </div>

          <div
            className="card p-6  mb-3 shadow-lg w-full"
            style={{ maxWidth: "48rem" ,height: "28rem " }}
            // id="cardOne"
          >
            <div className="display-2 text-center text-info">
              <i class="bi bi-search"></i>
            </div>
            <div className="display-6 fw-bold text-center">Search Property</div>

            <div className="card-body text-center">
              <p className="card-text">
                {" "}
                Deu to many houses available for buying and selling it becams a
                bit hectic to scroll down just for a house that catches your eye
                insted with the help of the search functionality one can search
                based on price ,title etc..
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Services;
