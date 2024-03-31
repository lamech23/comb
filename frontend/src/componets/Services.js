import React from "react";
import "../css/services.css";

function Services() {
  return (
    <>
<div className="container mx-auto card mb-20">
  <h2 className="uppercase mt-5 text-center hover:text-teal-500 text-4xl font-bold mb-20" id="heading">
    Our Services
  </h2>
  <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-8">
    <div className="card p-6 mb-3 shadow-lg bg-white rounded-lg">
      <div className="text-center text-5xl text-info">
        <i className="bi bi-list-task"></i>
      </div>
      <div className="text-center text-xl font-bold mt-4">Property Listing</div>
      <div className="card-body text-center">
        <p className="card-text">
          At kausi houses a listed for everyone can be able to select on desires since taste and preference is a personal choice
        </p>
      </div>
    </div>

    <div className="card p-6 mb-3 shadow-lg bg-white rounded-lg">
      <div className="text-center text-5xl text-info">
        <i className="bi bi-send"></i>
      </div>
      <div className="text-center text-xl font-bold mt-4">Selling Properties</div>
      <div className="card-body text-center">
        <p className="card-text">
          Selling being the core purpose of kausi house is always available what matters is the need, desire, and urgency of the client
        </p>
      </div>
    </div>

    <div className="card p-6 mb-3 shadow-lg bg-white rounded-lg">
      <div className="text-center text-5xl text-info">
        <i className="bi bi-search"></i>
      </div>
      <div className="text-center text-xl font-bold mt-4">Search Property</div>
      <div className="card-body text-center">
        <p className="card-text">
          Due to many houses available for buying and selling, it becomes a bit hectic to scroll down just for a house that catches your eye. Instead, with the help of the search functionality one can search based on price, title, etc.
        </p>
      </div>
    </div>
  </div>
</div>



    </>
  );
}

export default Services;
