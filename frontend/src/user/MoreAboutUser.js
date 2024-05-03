import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import { api } from "../utils/Api";
import { ToastContainer, toast } from "react-toastify";

function MoreAboutUser() {
  const [image, setImage] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState();
  const [bio, setBio] = useState("");
  const [gender, setGender] = useState("");

  const [photo, setPhoto] = useState({})

  const [isCameraOn, setIsCameraOn] = useState(false);

  const startCamera = () => {
    setIsCameraOn(true);
    console.log(Webcam);
  };

  const webcamRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);

  const captureImage = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImageSrc(imageSrc);
  };

  //creating an account

  const createAcc = async (e) => {
    e.preventDefault();
    try {

    const formData = new FormData();
    formData.append("image", image);
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("phoneNumber", phoneNumber);
    formData.append("bio", bio);
    formData.append("gender", gender);
    // console.log(formData);

    // return;

    const userData = await api("/Acc/update-account", "POST", {}, formData);

    if (userData) {
      setFirstName("");
      setLastName("");
      setBio("");
      setPhoneNumber("");
      setGender("");
      toast.success("account verified  successfully!");
    }
    
      } catch (error) {
        console.log(error);
    
      }
  };

  // getting image 



  return (
    <>
      <section className="bg-gray-100">
        <div>
          {!isCameraOn && <button onClick={startCamera}>Start Camera</button>}
          {isCameraOn && (
            <div>
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={640}
                height={480}
              />
              <button onClick={captureImage}>Capture</button>
              {imageSrc && <img src={imageSrc} alt="Captured" />}
            </div>
          )}
        </div>
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
            <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
              <form onSubmit={createAcc} className="space-y-4">
                <div class="col-span-full">
                  <label
                    for="cover-photo"
                    class="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Cover photo
                  </label>
                  <div class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                    <div class="text-center">
                      <svg
                        class="mx-auto h-12 w-12 text-gray-300"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      <div class="mt-4 flex text-sm leading-6 text-gray-600">
                        <label
                          for="file-upload"
                          class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                        >
                          <span>Upload a file</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            class="sr-only"
                            onChange={(e) => setImage(e.target.files[0])}
                          />
                        </label>
                        <p class="pl-1">or drag and drop</p>
                      </div>
                      <p class="text-xs leading-5 text-gray-600">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="sr-only" for="name">
                    first-Name
                  </label>
                  <input
                    className="block w-full cursor-pointer rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-black has-[:checked]:border-black has-[:checked]:bg-black has-[:checked]:text-white"
                    placeholder="first-name"
                    value={firstName}
                    type="text"
                    id="name"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="sr-only" for="email">
                      Email
                    </label>
                    <input
                      className="block w-full cursor-pointer rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-black has-[:checked]:border-black has-[:checked]:bg-black has-[:checked]:text-white"
                      placeholder="Last-name"
                      type="text"
                      value={lastName}
                      id="email"
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="sr-only" for="phone">
                      Phone
                    </label>
                    <input
                      className="block w-full cursor-pointer rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-black has-[:checked]:border-black has-[:checked]:bg-black has-[:checked]:text-white"
                      placeholder="Phone Number Format: 073-456-7890"
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-3">
                  <div>
                    <label
                      for="Option1"
                      className={`block w-full cursor-pointer rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-black ${gender === "male" ? "bg-black text-white": "bg-white"}`}
                      tabindex="0"
                    >
                      male
                    </label>

                    <input
                      className="sr-only"
                      id="Option1"
                      type="radio"
                      checked={gender === "male"}
                      tabindex="-1"
                      name="male"
                      value="male"
                      onChange={(e) => setGender(e.target.value)}
                    />
                  </div>

                  <div>
                    <label
                      for="Option2"
                      className={`block w-full cursor-pointer rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-black ${gender === "female" ? "bg-black text-white": "bg-white"}`}
                      tabindex="0"
                    >
                      female
                    </label>

                    <input
                      className="sr-only"
                      id="Option2"
                      type="radio"
                      checked={gender === "female"}
                      tabindex="-1"
                      name="female"
                      value="female"
                      onChange={(e) => setGender(e.target.value)}
                    />
                  </div>

                  <div>
                    <label
                      for="Option3"
                      className={`block w-full cursor-pointer rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-black ${gender === "others" ? "bg-black text-white": "bg-white"}`}
                      tabindex="0"
                    >
                      others
                    </label>

                    <input
                      className="sr-only"
                      id="Option3"
                      type="radio"
                      checked={gender === "others"}
                      tabindex="-1"
                      name="others"
                      value="others"
                      onChange={(e) => setGender(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="sr-only" for="message">
                    Message
                  </label>

                  <textarea
                    className=" border w-full rounded-lg border-gray-200 p-3 text-sm"
                    placeholder="Bio"
                    rows="8"
                    id="message"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                  ></textarea>
                </div>

                <div className="mt-4">
                  <button
                    type="submit "
                    class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                  >
                    Create
                  </button>{" "}
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
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default MoreAboutUser;
