import React from "react";

function Category() {
  return (
    <>
      <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-12">
        <div class="sm:col-span-4">
          <label
            for="username"
            class="block text-sm font-medium leading-6 text-gray-900"
          >
            category{" "}
          </label>
          <div class="mt-2">
            <div class="flex gap-3 rounded-md shadow-sm ring-1 ring-inset ring-white focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
              <span class="flex select-none items-center pl-6 text-white sm:text-sm">
                Add category
              </span>
              <input
                type="text"
                name="username"
                id="username"
                autocomplete="username"
                class="block flex-1 border-0 bg-teal-400 py-1.5 pl-5 text-white placeholder:text-white focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="mansionet"
              />
            </div>
          </div>
        </div>
        <div class="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            class="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
}

export default Category;
