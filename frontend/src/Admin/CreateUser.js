import React from "react";

function CreateUser() {
  return (
    <>
      <section class= " bg-white ">
        <div class="lg:grid lg:grid-cols-12">
          <main class="px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-12">
            <div class="max-w-xl lg:max-w-3xl">
              <form action="#" class="mt-8 grid grid-cols- gap-6">
                <div class="col-spa sm:col-span-8">
                  <label
                    for="FirstName"
                    class="block text-sm font-medium text-gray-700"
                  >
                    First Name
                  </label>

                  <input
                    type="text"
                    id="FirstName"
                    name="first_name"
                    class="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                  />
                </div>

                <div class="col-span-6 sm:col-span-8">
                  <label
                    for="LastName"
                    class="block text-sm font-medium text-gray-700"
                  >
                    Last Name
                  </label>

                  <input
                    type="text"
                    id="LastName"
                    name="last_name"
                    class="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                  />
                </div>

                <div class="col-span-8">
                  <label
                    for="Email"
                    class="block text-sm font-medium text-gray-700"
                  >
                    {" "}
                    Email{" "}
                  </label>

                  <input
                    type="email"
                    id="Email"
                    name="email"
                    class="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                  />
                </div>

                <div class="col-span- sm:col-span-8">
                  <label
                    for="Password"
                    class="block text-sm font-medium text-gray-700"
                  >
                    {" "}
                    location{" "}
                  </label>

                  <input
                    type="password"
                    id="Password"
                    name="password"
                    class="mt-1 w-full  rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                  />
                </div>

                <div className="sm:col-span-8">
                  <label
                    for="HeadlineAct"
                    class="block text-sm font-medium text-gray-900"
                  >
                    {" "}
                    Headliner{" "}
                  </label>

                  <select
                    name="HeadlineAct"
                    id="HeadlineAct"
                    class="mt-1.5 w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm"
                  >
                    <option value="">Please select</option>
                    <option value="JM">John Mayer</option>
                    <option value="SRV">Stevie Ray Vaughn</option>
                    <option value="JH">Jimi Hendrix</option>
                    <option value="BBK">B.B King</option>
                    <option value="AK">Albert King</option>
                    <option value="BG">Buddy Guy</option>
                    <option value="EC">Eric Clapton</option>
                  </select>
                </div>

                <div class="col-span-6 sm:col-span-8">
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
                    class="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                  />
                </div>

                <div class="col-span-6 sm:flex sm:items-center sm:gap-4">
                  <button class="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500">
                    Create an account
                  </button>
                </div>
              </form>
            </div>
          </main>
        </div>
      </section>
    </>
  );
}

export default CreateUser;
