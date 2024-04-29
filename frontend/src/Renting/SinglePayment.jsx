import React, { useEffect, useState } from "react";
import { api } from "../utils/Api";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";


function SinglePayment() {
  let id = useLocation().pathname.split("/")[3];

  const [payments, setpayments] = useState({});
  const fetchOpenpayments = async () => {
    const response = await api(`/payment/single-payments/${id}`, "GET", {}, {});

    setpayments(response?.payment);
  };

  useEffect(() => {
    fetchOpenpayments();
  }, []);

  const updateStatus = async (id, status) => {
    const response = await api(
      `/payment/confirm-payment/${id}?status=` + status,
      "PATCH",
      {},
      {}
    );
    if (response) {
      toast.success("Payment confirmed Successfully!");
    }
  };

  const confirmPayment = (id) => {
    let status = "confirmed";
    updateStatus(id, status);
  };

  const rejectPayment = (id) => {
    let status = "reject";
    updateStatus(id, status);
  };

  return (
    <div>
      <div class="w-1/2 mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <img src={payments.image} alt="Image" class="w-full h-auto" />

        <div class="p-4">
          <h2 class="text-xl font-semibold mb-2">Image Details</h2>

          <p class="text-gray-600 mb-2">House : {payments?.house?.houseName}</p>
          <p class="text-gray-600 mb-4">Tenant: {payments?.tenant?.email}</p>
          <p class="text-gray-600 mb-4">
            house Name: {payments?.tenant?.houseNumber}
          </p>

          <div class="flex justify-between">
            <button
              type="submit"
              class="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-md mr-2"
              onClick={() => confirmPayment(id)}
            >
              confirm
            </button>
            <button
              type="submit"
              class="bg-gray-500 hover:bg-gray-600 text-white font-semibold px-4 py-2 rounded-md"
              onClick={() => rejectPayment(id)}
            >
              Reject
            </button>
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
    </div>
  );
}

export default SinglePayment;
