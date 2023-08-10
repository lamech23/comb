import React from "react";
import "./details.css";

function CheckOut() {
  return (
    <>
      <h1 style={{ textAlign: "center" }}></h1>
      <div className="Fields">
        <div>
          <div className="formContainer">
            <form>
              <div className="Fields">
                <div>
                  <h3>Billing Address</h3>
                  <label className="lables" for="fname">
                    Full Name
                  </label>
                  <input
                    className="inputs"
                    type="text"
                    id="fname"
                    name="firstname"
                  />
                  <label className="lables" for="email">
                    {" "}
                    Email
                  </label>
                  <input
                    className="inputs"
                    type="text"
                    id="email"
                    name="email"
                  />
                  <label className="lables" for="adr">
                    {" "}
                    Address
                  </label>
                  <input
                    className="inputs"
                    type="text"
                    id="adr"
                    name="address"
                  />
                </div>
                <div className="col">
                  <h3>Payment</h3>
                  <label className="lables" for="cname">
                    Name on Card
                  </label>
                  <input
                    className="inputs"
                    type="text"
                    id="cname"
                    name="cardname"
                  />
                  <label className="lables" for="ccnum">
                    Credit card number
                  </label>
                  <input
                    className="inputs"
                    type="text"
                    id="ccnum"
                    name="cardnumber"
                  />
                  <div className="Fields">
                    <div>
                      <label className="lables" for="expyear">
                        Exp Year
                      </label>
                      <input
                        className="inputs"
                        type="text"
                        id="expyear"
                        name="expyear"
                      />
                    </div>
                    <div>
                      <label className="lables" for="cvv">
                        CVV
                      </label>
                      <input
                        className="inputs"
                        type="text"
                        id="cvv"
                        name="cvv"
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* <input
type="submit"
value="Continue to checkout"
className=" inputs checkout  "
/> */}
            </form>
          </div>
        </div>
        <div></div>
      </div>
    </>
  );
}

export default CheckOut;
