import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
function UpdateDetails() {
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
  console.log(user);
  // const { id } = useParams();
  const id = useLocation().pathname.split("/")[2];
  console.log(id);
  // const [getDetails, setGetDetails] = useState();

  const handelSubmit = async (e) => {
    e.preventDefault();
    if (!user) setError("You must be logged in");
    const formData = new FormData();
    formData.append("description", description);
    formData.append("contact", contact);
    formData.append("location", location);
    formData.append("price", price);
    formData.append("title", title);
    formData.append("image", image);
    formData.append("category", category);

    const response = await axios.patch(
      `http://localhost:4000/Details/${id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    if (response) {
      navigate("/GetAllDetails");
    }
  };

  const fetchAllDEtailsById = async () => {
    const response = await axios.get(`http://localhost:4000/Details/${id}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    setContact(response.data.contact);
    setTitle(response.data.title);
    setPrice(response.data.price);
    setDescription(response.data.description);
    setTitle(response.data.title);
    setLocation(response.data.location);
    setLocation(response.data.category);

    setImage(response.data.image);
  };

  useEffect(() => {
    fetchAllDEtailsById();
  }, []);

  return (
    <>
      <div className="split">

        <div className="container-lg">
          <div className=" row justify-content-center ">
            <div className="col-lg-6">
              <form
                onSubmit={handelSubmit}
                className=" frm"
                enctype="multipart/form-data"
              >
                <h3 className="text-center">Add image and details</h3>
                <label>Image title</label>
                <input
                  className="form-control"
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
                />
                <label className="label-control">Select Category</label>
                <select
                  className="form-control"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {" "}
                  <option selected>please select</option>
                  <option value="maisonette">Maisonette</option>
                  <option value="Bungalow">Bungalow</option>
                  <option value="Apartments">Apartments</option>
                  <option value="Others">Others</option>
                </select>
                <label className="label-control">title</label>
                <input
                  className="form-control"
                  type="text"
                  // placeholder="eg:rental,BnB,House for sale and own compound"
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
                  className="form-control"
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
                <button
                  type="submit"
                  className="btn btn-outline-info "
                  id="button-sub"
                >
                  Submit
                </button>
              </form>
              {error && (
                <div className="alert alert-danger text-center justify-content-center ms-5 ">
                  {error}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdateDetails;
