import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./form.css";
import { useAuthContext } from "../../hooks/useAuthContext";
import { ToastContainer, toast } from "react-toastify";
function DetailsForm() {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [contact, setContact] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState(null);
  let navigate = useNavigate();
  const { user } = useAuthContext();
  const [status, setStatus] = useState(false);
  const { id } = useParams();
  const [cat, setCat] = useState([]);
  console.log(cat);



  // const handelImage = async (e) => {
  //   e.preventDefault();
  //   const formData = new FormData();
  //   for (let i = 0; i < image.length; i++) {
  //     formData.append("image", image[i]);
  //   }


  //   const response = await axios.post(
  //     "http://localhost:4000/images",
  //     formData,
  //     {
  //       headers: {
  //         authorization: ` Bearer ${user?.token}`,
  //         Accept: "application/json",
  //         "Content-Type": "multipart/form-data",
  //       },
  //     }
  //   );
  //   console.log("clicked on image");

  // };

  const handelSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      if (!user) toast.error("You must be logged in");
      const formData = new FormData();
      formData.append("description", description);
      formData.append("contact", contact);
      formData.append("location", location);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("title", title);

      for (let i = 0; i < image.length; i++) {
        formData.append("image", image[i]);
      }

      if (
        (description === "",
        contact === "",
        location === "",
        price === "",
        category === "",
        title === "")
      ) {
        toast.error("All fields must field");
      } else {
        const response = await axios.post(
          "http://localhost:4000/Details",
          formData,
          {
            headers: {
              authorization: ` Bearer ${user?.token}`,
              Accept: "application/json",
              "Content-Type": "multipart/form-data",
            },
          }
        );
          setStatus(false);
          toast.success("Added succesfuly ");
          {
            navigate("/");
          }


        if (!response) {
          setError(error);
        }

        if (response) {
          //here am reseting the form
          setImage("");
          setTitle("");
          setLocation("");
          setDescription("");
          setContact("");
          setPrice("");
          setCategory("");
        }
      }
    } catch (error) {
      if (error.response?.status === 500) {
        return toast.error(" Allowed image format jpeg,jpg,png,webp, ");
      }

      if (error.response?.status === 403) {
        return toast.error(" you are  not authorized to perform this action  ");
      }
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await axios.get("http://localhost:4000/cat/fetch");
      setCat(response.data);
    };
    fetchCategories();
  }, []);

  return (
    <div className="container-lg">
      <div className=" row justify-content-center ">
        <div className="col-lg-6">
          <form
            onSubmit={handelSubmit}
            className=" frm"
          >
            <h3 className="text-center">Add image and details</h3>
            <label>Image title</label>

            <input
              className="form-control"
              name="image"
              multiple
              type="file"
              onChange={(e) => setImage([...e.target.files])}
            />

            <label className="label-control">Select Category</label>
            <select
              className="form-control"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {
                category && category.map((cat, index)=> (
                  <option key={index}>{cat}</option>
                 ))

              }
              {/* <option selected>please select</option>
              <option value="maisonette">Maisonette</option>
              <option value="Bungalow">Bungalow</option>
              <option value="Apartments">Apartments</option>
              <option value="Others">Others</option> */}
            </select>

            <label className="label-control">title</label>
            <input
              className="form-control"
              type="text"
              placeholder=""
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />

            <label className="label-control">Location</label>
            <input
              className="form-control"
              type="text"
              onChange={(e) => setLocation(e.target.value)}
              value={location}
            />
            <label className="label-control">Description</label>
            <textarea
              className="form-control "
              type="text"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
            <label className="label-control">Contact</label>
            <input
              className="form-control"
              type="text"
              onChange={(e) => setContact(e.target.value)}
              value={contact}
            />
            <label className="label-control">Price</label>
            <input
              className="form-control"
              type="text"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
            />
            {status === "sending" ? (
              <button className="btn btn-outline-info" id="button-sub">
                Submiting....
              </button>
            ) : (
              <button
                type="submit"
                className="btn btn-outline-info "
                id="button-sub"
              >
                Submit
              </button>
            )}
            {/* {status === 'sending' && <p>Sending...</p>} */}
          </form>
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

export default DetailsForm;
