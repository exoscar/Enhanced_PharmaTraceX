import React, { useState } from "react";
import { ethers } from "ethers";
import axios from "axios";
import { useStateContext } from "../context";
const AddMedicine = () => {
  const { addMedicine, connect, address } = useStateContext();
  if (address) {
    console.log("Address", address);
  } else {
    connect();
  }
  const [formData, setFormData] = useState({
    MedicineName: "",
    StripID: 0,
    Conditions: "",
    Quantity: "",
    Status: "Ideal/Trustworthy",
    Ingredients: "",
    SideEffects: "",
    ExpiryDate: "",
    ManufactureDate: "",
    BatchNumber: "",
    Price: "",
  });
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    //  Convert ExpiryDate and ManufactureDate to strings
    if (name === "ExpiryDate" || name === "ManufactureDate") {
      setFormData({
        ...formData,
        [name]: value.toString(),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   await addMedicine({
  //     ...formData,
  //   });

  //   console.log(formData);
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await addMedicine({
      ...formData,
    });

    try {
      await axios
        .post("http://localhost:5000/addMedicine", {
          MedicineName: formData.MedicineName,
          StripID: formData.StripID,
          Conditions: formData.Conditions,
          Quantity: formData.Quantity,
          Status: formData.Status,
          Ingredients: formData.Ingredients,
          SideEffects: formData.SideEffects,
          ExpiryDate: formData.ExpiryDate,
          ManufactureDate: formData.ManufactureDate,
          BatchNumber: formData.BatchNumber,
          Price: formData.Price,
          address: address,
        })
        .then((res) => {
          if (res.data == "exists") {
            alert("Medicine Already Exists");
          } else if (res.data == "added") {
            alert("Medicine Added Successfully");
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
        <h1>Add Medicine</h1>
      </div>

      <section className="section">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title"></h5>

                <form className="row g-3" onSubmit={handleSubmit}>
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="floatingName"
                        placeholder="Medicine Name"
                        name="MedicineName"
                        value={formData.MedicineName}
                        onChange={handleInputChange}
                      />
                      <label htmlFor="floatingName">Medicine Name</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="number"
                        className="form-control"
                        id="floatingDrugCode"
                        placeholder="National Drug Code"
                        name="StripID"
                        value={formData.StripID}
                        onChange={handleInputChange}
                      />
                      <label htmlFor="floatingDrugCode">
                        National Drug Code
                      </label>
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="floatingconditions"
                        placeholder="Conditions"
                        name="Conditions"
                        value={formData.Conditions}
                        onChange={handleInputChange}
                      />
                      <label htmlFor="floatingconditions">Conditions</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-floating">
                      <textarea
                        type="text"
                        className="form-control"
                        placeholder="Ingredients"
                        id="floatingIngredients"
                        name="Ingredients"
                        value={formData.Ingredients}
                        onChange={handleInputChange}
                      ></textarea>
                      <label htmlFor="floatingIngredients">Ingredients</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="floatingBatchNumber"
                        placeholder="Batch Number"
                        name="BatchNumber"
                        value={formData.BatchNumber}
                        onChange={handleInputChange}
                      />
                      <label htmlFor="floatingBatchNumber">Batch Number</label>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="col-md-12">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          id="floatingQuantity"
                          placeholder="Quantity"
                          name="Quantity"
                          value={formData.Quantity}
                          onChange={handleInputChange}
                        />
                        <label htmlFor="floatingQuantity">Quantity</label>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-3">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="floatingPrice"
                        placeholder="Price"
                        name="Price"
                        value={formData.Price}
                        onChange={handleInputChange}
                      />
                      <label htmlFor="floatingPrice">Price</label>
                    </div>
                  </div>

                  <div className="col-md-3">
                    <div className="form-floating">
                      <input
                        type="date"
                        className="form-control"
                        id="floatingMdate"
                        placeholder="Manufacturing date"
                        name="ManufactureDate"
                        value={formData.ManufactureDate}
                        onChange={handleInputChange}
                      />
                      <label htmlFor="floatingMdate">Manufacturing date</label>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-floating">
                      <input
                        type="date"
                        className="form-control"
                        id="floatingEdate"
                        placeholder="Expiry date"
                        name="ExpiryDate"
                        value={formData.ExpiryDate}
                        onChange={handleInputChange}
                      />
                      <label htmlFor="floatingEdate">Expiry date</label>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="form-floating">
                      <textarea
                        className="form-control"
                        placeholder="Address"
                        id="floatingSideEffects"
                        name="SideEffects"
                        value={formData.SideEffects}
                        onChange={handleInputChange}
                      ></textarea>
                      <label htmlFor="floatingSideEffects">Side Effects</label>
                    </div>
                  </div>

                  <div className="text-center">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      style={{ margin: "20px" }}
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

export default AddMedicine;
