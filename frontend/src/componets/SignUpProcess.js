import React from "react";
import { useLocation } from "react-router-dom";

function SignUpProcess({email}) {

  return (
    <>
      <section className="flex justify-center items-center py-20">
  <div className="bg-white border p-8 shadow-xl rounded-lg">
  <h2 className="text-center text-3xl text-blue-500 font-semibold mb-8">
  Please fill in the form below to send a request to the admin for sign up.
</h2>
    <form className="flex flex-col gap-6">
      <input
        type="text"
        placeholder="Your email"
        value={email}
        className="border-2 border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
      />
      <textarea
        placeholder="Your Message"
        rows={5}
        className="border-2 border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
      ></textarea>
      <button
        type="submit"
        className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-8 py-3"
      >
        Submit
      </button>
    </form>
  </div>
</section>

    </>
  );
}

export default SignUpProcess;
