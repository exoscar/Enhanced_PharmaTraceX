import React, { useState } from "react";
import { useStateContext } from "../context";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
const AddTruck = () => {
  const { connect, address } = useStateContext();

  if (address) {
    console.log("Address", address);
  } else {
    connect();
  }
  const history = useNavigate();
  const [formData, setFormData] = useState({
    RegistrationNumber: "",
    StripID: [],
    From: "",
    To: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "StripID") {
      setFormData({
        ...formData,
        [name]: value.split(",").map((item) => item.trim()), // Split the string into an array and trim whitespace
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios
        .post("http://localhost:5000/sendTruckDetails", {
          RegistrationNumber: formData.RegistrationNumber,
          StripID: formData.StripID,
          From: formData.From,
          To: formData.To,
          address: address,
        })
        .then((res) => {
          if (res.data == "exists") {
            alert("Truck Already Assigned");
          } else if (res.data == "added") {
            alert("Upload Successful");
          }
        })
        .catch((e) => {
          alert("some error", e);
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <main id="main" className="main">
      <div className="pagetitle">
        <h1>Add Truck Details</h1>
      </div>

      <section className="section">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title"></h5>

                <form className="row g-3" method="POST" onSubmit={handleSubmit}>
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="floatingName"
                        placeholder="Registration Number"
                        name="RegistrationNumber"
                        value={formData.RegistrationNumber}
                        onChange={handleInputChange}
                      />
                      <label htmlFor="floatingName">Registration Number</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="floatingDrugCode"
                        placeholder="National Drug Code"
                        name="StripID"
                        value={formData.StripID}
                        onChange={handleInputChange}
                      />
                      <label htmlFor="floatingDrugCode">Strip ID</label>
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="floatingFrom"
                        placeholder="From"
                        name="From"
                        value={formData.From}
                        onChange={handleInputChange}
                      />
                      <label htmlFor="floatingFrom">From</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-floating">
                      <textarea
                        type="text"
                        className="form-control"
                        placeholder="To"
                        id="floatingTo"
                        name="To"
                        value={formData.To}
                        onChange={handleInputChange}
                      ></textarea>
                      <label htmlFor="floatingTo">To</label>
                    </div>
                  </div>

                  <div className="text-center">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      style={{ margin: "20px" }}
                      onClick={handleSubmit}
                    >
                      Submit
                    </button>
                    <button type="reset" className="btn btn-warning">
                      Reset
                    </button>
                  </div>
                </form>
                {/* End floating Labels Form */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AddTruck;
